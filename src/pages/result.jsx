import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Result() {
  const { searchTerm } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [newSearchTerm, setNewSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/search/name/${searchTerm}`
        );
        const data = await response.json();
        console.log("Search data:", data);

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

        console.log("Enriched data:", enrichedData);
        setSearchResult(enrichedData);
      } catch (error) {
        console.error("Error searching creator:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleNewSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/search/name/${newSearchTerm}`
      );
      const data = await response.json();
      console.log("New search data:", data);

      const subsResponse = await fetch(`http://localhost:3000/subs/`);
      const subsData = await subsResponse.json();
      console.log("New subs data:", subsData);

      const postsResponse = await fetch(`http://localhost:3000/post/`);
      const postsData = await postsResponse.json();
      console.log("New posts data:", postsData);

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
            console.error("Error processing new creator data:", error);
            return {
              ...creator,
              subsCount: 0,
              postsCount: 0,
            };
          }
        })
      );

      console.log("New enriched data:", enrichedData);
      setSearchResult(enrichedData);
    } catch (error) {
      console.error("Error searching new creator:", error);
    }
  };

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNewSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="w-full max-w-sm mt-9">
        <div className="flex relative">
          <input
            type="text"
            placeholder="Cari kreator lainnya"
            className="w-full bg-[#EFEAEA] rounded-md"
            style={{
              height: "2rem",
              borderColor: "black",
              borderWidth: "2px",
              borderRadius: "20px",
              paddingLeft: "1rem",
            }}
            value={newSearchTerm}
            onChange={(e) => setNewSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center justify-center mr-2"
            onClick={handleNewSearch}
          >
            <FontAwesomeIcon icon={faSearch} className="w-5 h-4 text-black" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 overflow-auto flex-grow max-h-[calc(100vh-6rem)]">
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
