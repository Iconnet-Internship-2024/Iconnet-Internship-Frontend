import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ResultCategory() {
  const { category } = useParams();
  const [searchResult, setSearchResult] = useState([]);

  const handleProfileClick = async (creatorId) => {
    try {
      console.log("Klik pada profil. ID Kreator:", creatorId);

      const response = await fetch(
        `http://localhost:3000/profile/creator/${creatorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        console.log("Jumlah tampilan berhasil diperbarui");
      } else {
        console.error(
          "Gagal memperbarui jumlah tampilan. Status:",
          response.status
        );
        const errorData = await response.json();
        console.error("Detail kesalahan:", errorData);
      }
    } catch (error) {
      console.error("Kesalahan saat memperbarui jumlah tampilan:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/search/category/${category}`
        );
        const data = await response.json();
        console.log("API Response:", data);

        const subsResponse = await fetch(`http://localhost:3000/subs/`);
        const subsData = await subsResponse.json();
        console.log("Subs data:", subsData);

        const postsResponse = await fetch(`http://localhost:3000/post/`);
        const postsData = await postsResponse.json();
        console.log("Posts data:", postsData);

        if (!Array.isArray(postsData.data)) {
          throw new Error("postsData.data is not an array");
        }

        const enrichedData = await Promise.all(
          data.map(async (creator) => {
            try {
              const matchedSubs = subsData.filter(
                (sub) => sub.artist_id === creator.account_id
              );
              const matchedPosts = postsData.data.filter(
                (post) => post.account_id === creator.account_id
              );

              const subsCount = matchedSubs.length;
              const postsCount = matchedPosts.length;

              return {
                ...creator,
                subsCount,
                postsCount,
              };
            } catch (error) {
              console.error("Error processing creator data:", error);
              return {
                ...creator,
                subsCount: 0,
                postsCount: 0,
              };
            }
          })
        );

        setSearchResult(enrichedData);
      } catch (error) {
        console.error("Error searching creators by category:", error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="relative h-screen flex flex-col">
      <div className="text-center my-4">
        <h1 className="text-2xl font-bold">Category {category}</h1>
      </div>
      <Link
        to="/"
        className="absolute top-0 left-0 mt-4 ml-4 text-black font-bold text-lg"
      >
        Back
      </Link>
      <div className="flex flex-wrap justify-center gap-4 overflow-auto">
        {searchResult.length === 0 ? (
          <div className="text-center mb-5">
            No creators found in this category
          </div>
        ) : (
          searchResult.map((item) => {
            return (
              <Link key={item.account_id} to={`/post/${item.account_id}`}>
                <div
                  className="mt-8 flex flex-col w-[180px] h-[240px] border border-black rounded-2xl hover:cursor-pointer hover:opacity-75"
                  style={{ marginBottom: "20px" }}
                  onClick={() => handleProfileClick(item.account_id)}
                >
                  <div className="flex justify-center relative">
                    <div className="bg-black h-[60px] w-full rounded-t-2xl"></div>
                    <img
                      className="absolute mt-6 w-14 h-14 rounded-xl"
                      src="https://i.imgur.com/eOx9uGG.jpeg"
                      alt="Profile"
                    />
                  </div>
                  <div className="text-sm mt-6 flex justify-center">
                    <span>{item.name}</span>
                  </div>
                  <div className="flex justify-between mt-2 mx-8">
                    <div className="flex flex-col text-center">
                      <span className="text-sm">Posts</span>
                      <span className="font-bold">{item.postsCount}</span>
                    </div>
                    <div className="flex flex-col text-center">
                      <span className="text-sm">Subs</span>
                      <span className="font-bold">{item.subsCount}</span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-2">
                    <span className="text-xs text-center mt-4 overflow-hidden overflow-ellipsis">
                      {item.description ? item.description : "No description"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
