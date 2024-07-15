import React, { useEffect, useState } from "react";
import { createPost } from "../modules/fetch/post";
import { getTierByAcc } from "../modules/fetch/accountTier";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = (profile) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [allTiers, setAllTiers] = useState([]);
  const [preview, setPreview] = useState([]);
  const [postType, setPostType] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    media: "",
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
      setAllTiers(tiersData);
    } catch (error) {
      console.error("Error fetching tiers:", error);
    }
  };

  const handleInputChange = (e, name) => {
    if (e && e.target) {
      // Handle regular input
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      // Handle ReactQuill input
      setFormData({
        ...formData,
        [name]: e, // `e` is the value from ReactQuill
      });
    }
  };

  const handleTagNameChange = (e) => {
    if (e.target.name === "tagName") {
      const selectedValues = e.target.value
        .split(",")
        .map((value) => value.trim());
      setFormData({
        ...formData,
        [e.target.name]: selectedValues,
      });
    }
  };

  const handleCategoryNameChange = (e) => {
    if (e.target.name === "categoryName") {
      const selectedValues = e.target.value
        .split(",")
        .map((value) => value.trim());
      setFormData({
        ...formData,
        [e.target.name]: selectedValues,
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const selectedPreviews = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setPreview((prevPreview) => [...prevPreview, ...selectedPreviews]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.content || formData.content.trim() === "") {
      notify("Content is required", "error");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("tierName", formData.tierName);
      formDataToSend.append("tagName", formData.tagName);
      formDataToSend.append("categoryName", formData.categoryName);

      if (files) {
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append("media", files[i]);
        }
      }

      const createdPost = await createPost(formDataToSend);

      setFormData({
        title: "",
        content: "",
        media: "",
        tierName: "",
        tagName: [],
        categoryName: [],
      });

      if (createdPost.length !== 0) {
        console.log("Post created successfully");
        notify("Post created successfully", "success");
        setIsModalOpen(false);

        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
      notify("Error creating post", "error");
    }
  };

  const notify = (message, type) => {
    if (type === "success") {
      alert(message);
    } else if (type === "error") {
      alert(`Error: ${message}`);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPostType(null);
  };

  const handlePostTypeSelect = (type) => {
    setPostType(type);
    setIsModalOpen(true);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  if (!postType) {
    return (
      <div className="mt-10">
        <button
          className="fixed bottom-10 right-10 z-50 flex items-center justify-center transition-all duration-300 hover:scale-110"
          onClick={openModal}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80.849 9.3604C80.5922 9.07817 80.2808 8.85095 79.9336 8.69246C79.5865 8.53398 79.2108 8.44752 78.8293 8.43832C78.4478 8.42912 78.0684 8.49736 77.714 8.63893C77.3596 8.7805 77.0376 8.99244 76.7674 9.26197L74.593 11.4258C74.3295 11.6895 74.1814 12.0471 74.1814 12.4199C74.1814 12.7927 74.3295 13.1502 74.593 13.4139L76.5863 15.4038C76.717 15.535 76.8723 15.6392 77.0434 15.7103C77.2144 15.7814 77.3978 15.818 77.583 15.818C77.7682 15.818 77.9516 15.7814 78.1227 15.7103C78.2937 15.6392 78.449 15.535 78.5797 15.4038L80.6996 13.2944C81.7719 12.2239 81.8721 10.4801 80.849 9.3604ZM70.1967 15.8204L38.4647 47.4962C38.2723 47.6878 38.1324 47.9257 38.0586 48.187L36.5908 52.5586C36.5557 52.6773 36.5532 52.8032 36.5836 52.9231C36.6141 53.043 36.6763 53.1525 36.7638 53.24C36.8513 53.3275 36.9608 53.3897 37.0807 53.4202C37.2006 53.4506 37.3265 53.4481 37.4451 53.4129L41.8133 51.9452C42.0746 51.8713 42.3125 51.7315 42.5041 51.5391L74.1799 19.8036C74.473 19.5074 74.6373 19.1075 74.6373 18.6909C74.6373 18.2742 74.473 17.8744 74.1799 17.5782L72.4309 15.8204C72.1343 15.5246 71.7326 15.3586 71.3138 15.3586C70.895 15.3586 70.4933 15.5246 70.1967 15.8204Z"
              fill="black"
            />
            <path
              d="M67.9113 34.0418L46.4854 55.51C45.6572 56.3401 44.6395 56.9561 43.5199 57.3047L38.9672 58.8287C37.8867 59.1338 36.7444 59.1453 35.658 58.862C34.5716 58.5788 33.5804 58.0109 32.7865 57.217C31.9926 56.4231 31.4248 55.4319 31.1415 54.3455C30.8582 53.2591 30.8697 52.1168 31.1748 51.0363L32.6988 46.4836C33.0464 45.3644 33.6612 44.3466 34.49 43.5182L55.9582 22.0887C56.155 21.8921 56.2891 21.6416 56.3435 21.3688C56.3979 21.0961 56.3702 20.8133 56.2639 20.5563C56.1576 20.2992 55.9774 20.0795 55.7462 19.9249C55.515 19.7702 55.2432 19.6876 54.965 19.6875H18.2812C15.6705 19.6875 13.1667 20.7246 11.3207 22.5707C9.47461 24.4167 8.4375 26.9205 8.4375 29.5312V71.7188C8.4375 74.3295 9.47461 76.8333 11.3207 78.6793C13.1667 80.5254 15.6705 81.5625 18.2812 81.5625H60.4688C63.0795 81.5625 65.5833 80.5254 67.4293 78.6793C69.2754 76.8333 70.3125 74.3295 70.3125 71.7188V35.035C70.3124 34.7568 70.2298 34.485 70.0751 34.2538C69.9205 34.0226 69.7008 33.8424 69.4437 33.7361C69.1867 33.6298 68.9039 33.6021 68.6312 33.6565C68.3584 33.7109 68.1079 33.845 67.9113 34.0418Z"
              fill="black"
            />
          </svg>
        </button>

        {isModalOpen && (
          <div>
            <div
              className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-10"
              onClick={closeModal}
            >
              <div
                className="bg-white w-full max-w-[400px] sm:max-w-lg rounded-[20px] shadow-md lg:max-w-3xl overflow-y-auto max-h-[550px]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center border-transparent bg-gray-800 rounded-[20px] rounded-bl-none rounded-br-none relative h-[70px]">
                  <h1 className="font-semibold text-xl text-white mx-auto pl-14">
                    Select a type
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

                <div className="flex p-10 justify-between">
                  <button
                    className="m-5"
                    type="button"
                    onClick={() => handlePostTypeSelect("text")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="M85.43 53.45a6 6 0 0 0-10.86 0l-64 136a6 6 0 1 0 10.86 5.11L38.63 158h82.74l17.2 36.55a6 6 0 1 0 10.86-5.11ZM44.28 146L80 70.09L115.72 146ZM200 98c-12.21 0-21.71 3.28-28.23 9.74a6 6 0 0 0 8.46 8.52c4.18-4.15 10.84-6.26 19.77-6.26c14.34 0 26 9.87 26 22v7.24a40.36 40.36 0 0 0-26-9.24c-20.95 0-38 15.25-38 34s17.05 34 38 34a40.36 40.36 0 0 0 26-9.24V192a6 6 0 0 0 12 0v-60c0-18.75-17-34-38-34m0 88c-14.34 0-26-9.87-26-22s11.66-22 26-22s26 9.87 26 22s-11.66 22-26 22"
                      />
                    </svg>
                    <p className=" text-black text-center font-semibold text-md">
                      Text
                    </p>
                  </button>
                  <button
                    className="m-5"
                    type="button"
                    onClick={() => handlePostTypeSelect("image")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="M216 42H40a14 14 0 0 0-14 14v144a14 14 0 0 0 14 14h176a14 14 0 0 0 14-14V56a14 14 0 0 0-14-14M40 54h176a2 2 0 0 1 2 2v107.57l-29.47-29.47a14 14 0 0 0-19.8 0l-21.42 21.42l-45.41-45.42a14 14 0 0 0-19.8 0L38 154.2V56a2 2 0 0 1 2-2m-2 146v-28.83l52.58-52.58a2 2 0 0 1 2.84 0L176.83 202H40a2 2 0 0 1-2-2m178 2h-22.2l-38-38l21.41-21.42a2 2 0 0 1 2.83 0l38 38V200a2 2 0 0 1-2.04 2m-70-102a10 10 0 1 1 10 10a10 10 0 0 1-10-10"
                      />
                    </svg>
                    <p className=" text-black text-center font-semibold text-md">
                      Image
                    </p>
                  </button>
                  <button
                    className="m-5"
                    type="button"
                    onClick={() => handlePostTypeSelect("video")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="m163.33 107l-48-32a6 6 0 0 0-9.33 5v64a6 6 0 0 0 9.33 5l48-32a6 6 0 0 0 0-10M118 132.79V91.21L149.18 112ZM216 42H40a14 14 0 0 0-14 14v112a14 14 0 0 0 14 14h176a14 14 0 0 0 14-14V56a14 14 0 0 0-14-14m2 126a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2V56a2 2 0 0 1 2-2h176a2 2 0 0 1 2 2Zm12 40a6 6 0 0 1-6 6H32a6 6 0 0 1 0-12h192a6 6 0 0 1 6 6"
                      />
                    </svg>
                    <p className=" text-black text-center font-semibold text-md">
                      Video
                    </p>
                  </button>
                  <button
                    className="m-5"
                    type="button"
                    onClick={() => handlePostTypeSelect("audio")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M10 13a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3m0-1a2 2 0 0 1-2-2V5a2 2 0 1 1 4 0v5a2 2 0 0 1-2 2M5 9.5a.5.5 0 0 1 .5.5a4.5 4.5 0 1 0 9 0a.5.5 0 0 1 1 0a5.5 5.5 0 0 1-5 5.478V17.5a.5.5 0 0 1-1 0v-2.022A5.5 5.5 0 0 1 4.5 10a.5.5 0 0 1 .5-.5"
                      />
                    </svg>
                    <p className=" text-black text-center font-semibold text-md">
                      Audio
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <button
        className="fixed bottom-10 right-10 z-50 flex items-center justify-center transition-all duration-300 hover:scale-110"
        onClick={openModal}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 90 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80.849 9.3604C80.5922 9.07817 80.2808 8.85095 79.9336 8.69246C79.5865 8.53398 79.2108 8.44752 78.8293 8.43832C78.4478 8.42912 78.0684 8.49736 77.714 8.63893C77.3596 8.7805 77.0376 8.99244 76.7674 9.26197L74.593 11.4258C74.3295 11.6895 74.1814 12.0471 74.1814 12.4199C74.1814 12.7927 74.3295 13.1502 74.593 13.4139L76.5863 15.4038C76.717 15.535 76.8723 15.6392 77.0434 15.7103C77.2144 15.7814 77.3978 15.818 77.583 15.818C77.7682 15.818 77.9516 15.7814 78.1227 15.7103C78.2937 15.6392 78.449 15.535 78.5797 15.4038L80.6996 13.2944C81.7719 12.2239 81.8721 10.4801 80.849 9.3604ZM70.1967 15.8204L38.4647 47.4962C38.2723 47.6878 38.1324 47.9257 38.0586 48.187L36.5908 52.5586C36.5557 52.6773 36.5532 52.8032 36.5836 52.9231C36.6141 53.043 36.6763 53.1525 36.7638 53.24C36.8513 53.3275 36.9608 53.3897 37.0807 53.4202C37.2006 53.4506 37.3265 53.4481 37.4451 53.4129L41.8133 51.9452C42.0746 51.8713 42.3125 51.7315 42.5041 51.5391L74.1799 19.8036C74.473 19.5074 74.6373 19.1075 74.6373 18.6909C74.6373 18.2742 74.473 17.8744 74.1799 17.5782L72.4309 15.8204C72.1343 15.5246 71.7326 15.3586 71.3138 15.3586C70.895 15.3586 70.4933 15.5246 70.1967 15.8204Z"
            fill="black"
          />
          <path
            d="M67.9113 34.0418L46.4854 55.51C45.6572 56.3401 44.6395 56.9561 43.5199 57.3047L38.9672 58.8287C37.8867 59.1338 36.7444 59.1453 35.658 58.862C34.5716 58.5788 33.5804 58.0109 32.7865 57.217C31.9926 56.4231 31.4248 55.4319 31.1415 54.3455C30.8582 53.2591 30.8697 52.1168 31.1748 51.0363L32.6988 46.4836C33.0464 45.3644 33.6612 44.3466 34.49 43.5182L55.9582 22.0887C56.155 21.8921 56.2891 21.6416 56.3435 21.3688C56.3979 21.0961 56.3702 20.8133 56.2639 20.5563C56.1576 20.2992 55.9774 20.0795 55.7462 19.9249C55.515 19.7702 55.2432 19.6876 54.965 19.6875H18.2812C15.6705 19.6875 13.1667 20.7246 11.3207 22.5707C9.47461 24.4167 8.4375 26.9205 8.4375 29.5312V71.7188C8.4375 74.3295 9.47461 76.8333 11.3207 78.6793C13.1667 80.5254 15.6705 81.5625 18.2812 81.5625H60.4688C63.0795 81.5625 65.5833 80.5254 67.4293 78.6793C69.2754 76.8333 70.3125 74.3295 70.3125 71.7188V35.035C70.3124 34.7568 70.2298 34.485 70.0751 34.2538C69.9205 34.0226 69.7008 33.8424 69.4437 33.7361C69.1867 33.6298 68.9039 33.6021 68.6312 33.6565C68.3584 33.7109 68.1079 33.845 67.9113 34.0418Z"
            fill="black"
          />
        </svg>
      </button>

      {isModalOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-10"
            onClick={closeModal}
          >
            <div
              className="bg-white w-full max-w-[400px] sm:max-w-lg rounded-[20px] shadow-md lg:max-w-3xl overflow-y-auto max-h-[550px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-transparent bg-gray-800 rounded-[20px] rounded-bl-none rounded-br-none relative h-[70px]">
                <h1 className="font-semibold text-xl text-white mx-auto pl-14">
                  Create Post
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

              <div>
                <form onSubmit={handleFormSubmit}>
                  {postType === "text" && (
                    <div className="px-10 py-2">
                      <h1 className="text-center font-semibold text-black text-md py-2">
                        Post Type Text
                      </h1>
                      <div className="flex my-5">
                        <img
                          className="lg:w-20 lg:h-20 rounded-full"
                          style={{ width: "65px", height: "65px" }}
                          src="https://picsum.photos/500/500?random"
                          alt="Profile"
                        />
                        <div className="mx-3">
                          <p className="text-black text-md font-semibold py-1 px-1">
                            {profile && profile.profile.name}
                          </p>
                          <select
                            class="text-sm border border-black px-2 py-1 rounded-xl focus:outline-none focus:border-gray-600"
                            name="tierName"
                            id="tierName"
                            onChange={handleInputChange}
                            value={formData.tierName}
                            // required
                          >
                            <option value="">No Tier</option>
                            {allTiers.map((tier) => (
                              <option key={tier.id} value={tier.tier.tier_name}>
                                {tier.tier.tier_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <p className="text-black text-md font-semibold">
                          Title
                        </p>
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
                        <p className="text-black text-md font-semibold">
                          Description
                        </p>
                        <ReactQuill
                          className="border border-gray-700 p-2 rounded-[10px] mb-5"
                          id="content"
                          name="content"
                          // modules={modules}
                          // formats={formats}
                          // onChange={handleInputChange}
                          onChange={(value) =>
                            handleInputChange(value, "content")
                          }
                          value={formData.content}
                          placeholder="Add description"
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
                        {/* <p className="text-black text-md font-semibold">
                              Tag
                            </p>
                            <input
                              type="text"
                              className="border border-gray-700 p-2 rounded-[10px] mb-5"
                              placeholder="Add tag"
                              id="tagName"
                              name="tagName"
                              onChange={handleTagNameChange}
                              value={formData.tagName}
                            />
                            <p className="text-black text-md font-semibold">
                              Category
                            </p>
                            <input
                              type="text"
                              className="border border-gray-700 p-2 rounded-[10px] mb-5"
                              placeholder="Add category"
                              id="categoryName"
                              name="categoryName"
                              onChange={handleCategoryNameChange}
                              value={formData.categoryName}
                            /> */}
                      </div>

                      <div className="flex justify-end text-center">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-gray-800 text-white rounded cursor-pointer"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                  {postType === "image" && (
                    <div className="px-10 py-2">
                      <h1 className="text-center font-semibold text-black text-md py-2">
                        Post Type Image
                      </h1>
                      <div className="flex my-5">
                        <img
                          className="lg:w-20 lg:h-20 rounded-full"
                          style={{ width: "65px", height: "65px" }}
                          src="https://picsum.photos/500/500?random"
                          alt="Profile"
                        />
                        <div className="mx-3">
                          <p className="text-black text-md font-semibold py-1 px-1">
                            {profile && profile.profile.name}
                          </p>
                          <select
                            class="text-sm border border-black px-2 py-1 rounded-xl focus:outline-none focus:border-gray-600"
                            name="tierName"
                            id="tierName"
                            onChange={handleInputChange}
                            value={formData.tierName}
                            // required
                          >
                            <option value="">No Tier</option>
                            {allTiers.map((tier) => (
                              <option key={tier.id} value={tier.tier.tier_name}>
                                {tier.tier.tier_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <p className="text-black text-md font-semibold">
                          Title
                        </p>
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
                        <p className="text-black text-md font-semibold">
                          Description
                        </p>
                        <ReactQuill
                          className="border border-gray-700 p-2 rounded-[10px] mb-5"
                          id="content"
                          name="content"
                          onChange={(value) =>
                            handleInputChange(value, "content")
                          }
                          value={formData.content}
                          placeholder="Add description"
                        />
                      </div>
                      <div className="mb-5">
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          // style={{ display: "none" }}
                          name="media"
                          onChange={handleFileChange}
                          // value={formData.media}
                          multiple
                        />

                        <div className="my-5 overflow-y-auto max-h-[500px]">
                          {preview.map((preview, index) => (
                            <div key={index} className="flex row my-2">
                              <img
                                src={preview}
                                alt={`Preview ${index}`}
                                className="max-h-[500px] max-w-[500px]"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end text-center">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-gray-800 text-white rounded cursor-pointer"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                  {postType === "video" && (
                    <div className="px-10 py-2">
                      <h1 className="text-center font-semibold text-black text-md py-2">
                        Post Type Video
                      </h1>
                      <div className="flex my-5">
                        <img
                          className="lg:w-20 lg:h-20 rounded-full"
                          style={{ width: "65px", height: "65px" }}
                          src="https://picsum.photos/500/500?random"
                          alt="Profile"
                        />
                        <div className="mx-3">
                          <p className="text-black text-md font-semibold py-1 px-1">
                            {profile && profile.profile.name}
                          </p>
                          <select
                            class="text-sm border border-black px-2 py-1 rounded-xl focus:outline-none focus:border-gray-600"
                            name="tierName"
                            id="tierName"
                            onChange={handleInputChange}
                            value={formData.tierName}
                            // required
                          >
                            <option value="">No Tier</option>
                            {allTiers.map((tier) => (
                              <option key={tier.id} value={tier.tier.tier_name}>
                                {tier.tier.tier_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <p className="text-black text-md font-semibold">
                          Title
                        </p>
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
                        <p className="text-black text-md font-semibold">
                          Description
                        </p>
                        <ReactQuill
                          className="border border-gray-700 p-2 rounded-[10px] mb-5"
                          id="content"
                          name="content"
                          onChange={(value) =>
                            handleInputChange(value, "content")
                          }
                          value={formData.content}
                          placeholder="Add description"
                        />
                      </div>
                      <div className="mb-5">
                        <input
                          id="video-upload"
                          type="file"
                          accept="video/*"
                          // style={{ display: "none" }}
                          name="media"
                          onChange={handleFileChange}
                          // value={formData.media}
                          multiple
                        />

                        <div className="my-5 overflow-y-auto max-h-[500px]">
                          {preview.map((preview, index) => (
                            <div key={index} className="flex row my-2">
                              <video
                                controls
                                src={preview}
                                alt={`Preview ${index}`}
                                className="max-h-[500px] max-w-[500px]"
                              ></video>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end text-center">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-gray-800 text-white rounded cursor-pointer"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                  {postType === "audio" && (
                    <div className="px-10 py-2">
                      <h1 className="text-center font-semibold text-black text-md py-2">
                        Post Type Audio
                      </h1>
                      <div className="flex my-5">
                        <img
                          className="lg:w-20 lg:h-20 rounded-full"
                          style={{ width: "65px", height: "65px" }}
                          src="https://picsum.photos/500/500?random"
                          alt="Profile"
                        />
                        <div className="mx-3">
                          <p className="text-black text-md font-semibold py-1 px-1">
                            {profile && profile.profile.name}
                          </p>
                          <select
                            class="text-sm border border-black px-2 py-1 rounded-xl focus:outline-none focus:border-gray-600"
                            name="tierName"
                            id="tierName"
                            onChange={handleInputChange}
                            value={formData.tierName}
                            // required
                          >
                            <option value="">No Tier</option>
                            {allTiers.map((tier) => (
                              <option key={tier.id} value={tier.tier.tier_name}>
                                {tier.tier.tier_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <p className="text-black text-md font-semibold">
                          Title
                        </p>
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
                        <p className="text-black text-md font-semibold">
                          Description
                        </p>
                        <ReactQuill
                          className="border border-gray-700 p-2 rounded-[10px] mb-5"
                          id="content"
                          name="content"
                          onChange={(value) =>
                            handleInputChange(value, "content")
                          }
                          value={formData.content}
                          placeholder="Add description"
                        />
                      </div>
                      <div className="mb-5">
                        <input
                          id="audio-upload"
                          type="file"
                          accept="audio/*"
                          // style={{ display: "none" }}
                          name="media"
                          onChange={handleFileChange}
                          // value={formData.media}
                          multiple
                        />

                        <div className="my-5 overflow-y-auto max-h-[500px]">
                          {preview.map((preview, index) => (
                            <div key={index} className="flex row my-2">
                              <audio
                                controls
                                src={preview}
                                alt={`Preview ${index}`}
                                className="ml-5 max-h-[500px] max-w-[500px]"
                              ></audio>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end text-center">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-gray-800 text-white rounded cursor-pointer"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
