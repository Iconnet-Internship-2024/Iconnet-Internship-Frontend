import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, editPost } from "../modules/fetch/post";
import { getTierByAcc } from "../modules/fetch/accountTier";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tierData, setTierData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tierName: "",
    tagName: [],
    categoryName: [],
  });

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const response = await getTierByAcc();
      const tiersData = response.data;
      console.log("tiersData: ", tiersData);
      setTierData(tiersData);
      console.log(tierData);
    } catch (error) {
      console.error("Error fetching tiers:", error);
    }
  };

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleInputChange = (e, name) => {
  //   if (e && e.target) {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: e,
  //     });
  //   }
  // };

  const handleInputChange = (e) => {
    try {
      console.log("Event target: ", e.target);
      console.log("Event target name: ", e.target.name);
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.error("Error handling input change: ", error);
    }
  };

  const handleTagNameChange = (e) => {
    if (e.target.name === "tagName") {
      console.log("Handling change:", e.target.name, e.target.value);
      const selectedValues = e.target.value
        .split(",")
        .map((value) => value.trim().toLowerCase());
      setFormData({
        ...formData,
        [e.target.name]: selectedValues,
      });
    }
  };

  const handleCategoryNameChange = (e) => {
    if (e.target.name === "categoryName") {
      console.log("Handling change:", e.target.name, e.target.value);
      const selectedValues = e.target.value
        .split(",")
        .map((value) => value.trim().toLowerCase());
      setFormData({
        ...formData,
        [e.target.name]: selectedValues,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", formData);
      await editPost(id, formData);

      if (editPost.length !== 0) {
        console.log("Post updated");
        notify("Post updated successfully", "success");

        setTimeout(() => {
          navigate(`/post`);
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Error updating Post:", error.message);
      notify("Error updating post", "error");
    }
  };

  const notify = (message, type) => {
    if (type === "success") {
      alert(message);
    } else if (type === "error") {
      alert(`Error: ${message}`);
    }
  };

  const fetchUpdatePost = async () => {
    try {
      const response = await getPostById(id);
      const postsData = response.data;
      console.log("postsData: ", postsData);

      let tierName = "";
      if (postsData.tier_id === null) {
        tierName = "";
      } else {
        tierName =
          postsData.tiers.length > 0 ? postsData.tiers[0].tier_name : "";
      }

      setFormData({
        title: postsData.title,
        content: postsData.content,
        tierName: tierName,
        tagName: postsData.tags.map((tag) => tag.tag),
        categoryName: postsData.categories.map(
          (category) => category.categories
        ),
      });
    } catch (error) {
      console.error("Error fetching post data:", error.message);
    }
  };

  useEffect(() => {
    fetchUpdatePost();
  }, [id]);

  const closeModal = () => {
    navigate(`/post`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="bg-white w-full max-w-[400px] sm:max-w-lg rounded-[20px] shadow-md lg:max-w-3xl overflow-y-auto max-h-[550px]">
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-between items-center border-transparent bg-gray-800 rounded-[20px] rounded-bl-none rounded-br-none relative h-[70px]">
            <h1 className="font-semibold text-xl text-white mx-auto pl-14">
              Edit Post
            </h1>
            <button
              className="text-gray-400 hover:text-gray-600 m-3"
              onClick={closeModal}
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 40.77L30 31.77L39 40.77L40.77 39L31.77 30L40.77 21L39 19.23L30 28.23L21 19.23L19.23 21L28.23 30L19.23 39L21 40.77ZM30.0075 52.5C26.8975 52.5 23.9725 51.91 21.2325 50.73C18.4942 49.5483 16.1117 47.945 14.085 45.92C12.0583 43.8967 10.4542 41.5167 9.2725 38.78C8.09083 36.0433 7.5 33.1192 7.5 30.0075C7.5 26.8975 8.09 23.9725 9.27 21.2325C10.4517 18.4942 12.055 16.1117 14.08 14.085C16.1033 12.0583 18.4833 10.4542 21.22 9.2725C23.9567 8.09083 26.8808 7.5 29.9925 7.5C33.1025 7.5 36.0275 8.09 38.7675 9.27C41.5058 10.4517 43.8883 12.055 45.915 14.08C47.9417 16.1033 49.5458 18.4833 50.7275 21.22C51.9092 23.9567 52.5 26.8808 52.5 29.9925C52.5 33.1025 51.91 36.0275 50.73 38.7675C49.5483 41.5058 47.945 43.8883 45.92 45.915C43.8967 47.9417 41.5167 49.5458 38.78 50.7275C36.0433 51.9092 33.1192 52.5 30.0075 52.5ZM30 50C35.5833 50 40.3125 48.0625 44.1875 44.1875C48.0625 40.3125 50 35.5833 50 30C50 24.4167 48.0625 19.6875 44.1875 15.8125C40.3125 11.9375 35.5833 10 30 10C24.4167 10 19.6875 11.9375 15.8125 15.8125C11.9375 19.6875 10 24.4167 10 30C10 35.5833 11.9375 40.3125 15.8125 44.1875C19.6875 48.0625 24.4167 50 30 50Z"
                  fill="gray"
                />
              </svg>
            </button>
          </div>

          <div className="px-10 py-2">
            <div className="flex my-5">
              <img
                className="lg:w-20 lg:h-20 rounded-full"
                style={{ width: "65px", height: "65px" }}
                src="https://picsum.photos/500/500?random"
                alt="Profile"
              />
              <div className="mx-3">
                <p className="text-black text-md font-semibold py-1">
                  {tierData[0]?.account?.profile?.name}
                </p>
                <select
                  class="text-sm border border-black px-2 py-1 rounded-xl focus:outline-none focus:border-gray-600"
                  name="tierName"
                  id="tierName"
                  onChange={handleInputChange}
                  value={formData.tierName}
                  // required
                >
                  <option value="">Select Tier</option>
                  {tierData.map((tier) => (
                    <option key={tier.id} value={tier.tier.tier_name}>
                      {tier.tier.tier_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-black text-md font-semibold">Title</p>
              <input
                type="text"
                className="border border-gray-700 p-2 rounded-[10px] mb-5"
                placeholder="Add title"
                id="title"
                name="title"
                onChange={handleInputChange}
                value={formData.title}
                required
              />
              <p className="text-black text-md font-semibold">Description</p>
              <ReactQuill
                className="border border-gray-700 p-2 rounded-[10px] mb-5"
                id="content"
                name="content"
                // modules={modules}
                // formats={formats}
                // onChange={handleInputChange}
                // onChange={(value) => handleInputChange(value, "content")}
                onChange={(content) => setFormData({ ...formData, content })}
                value={formData.content}
                placeholder="Add description"
                required
              />
              {/* <textarea
                cols="30"
                rows="10"
                className="border border-gray-700 p-2 rounded-[10px] mb-5"
                placeholder="Add description"
                id="content"
                name="content"
                onChange={handleInputChange}
                value={formData.content}
                required
              ></textarea> */}
              <p className="text-black text-md font-semibold">Tag</p>
              <input
                type="text"
                className="border border-gray-700 p-2 rounded-[10px] mb-5"
                placeholder="Add tag"
                id="tagName"
                name="tagName"
                onChange={handleTagNameChange}
                value={formData.tagName}
              />
              <p className="text-black text-md font-semibold">Category</p>
              <input
                type="text"
                className="border border-gray-700 p-2 rounded-[10px] mb-5"
                placeholder="Add category"
                id="categoryName"
                name="categoryName"
                onChange={handleCategoryNameChange}
                value={formData.categoryName}
              />
            </div>

            <div className="flex justify-end text-center">
              <button
                type="submit"
                className="px-5 py-2 bg-gray-800 text-white rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
