import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePost } from "../modules/fetch/post";
import {
  addLike,
  cancelLike,
  hasLiked,
  getPostFavoritesByAccAndPostId,
} from "../modules/fetch/postFavorites";
import {
  getPostCommentsByPostId,
  addComment,
} from "../modules/fetch/postComment";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetailPostCard({
  post,
  index,
  likes,
  totalComment,
  onUpdateCounts,
  profile,
  profileCreator,
  postState,
  toggleModal,
}) {
  const navigate = useNavigate();
  const [postStates, setPostStates] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fileNumber, setFileNumber] = useState(currentSlide + 1);
  const [countLike, setCountLike] = useState(0);
  const [comments, setComments] = useState([]);
  const [countComment, setCountComment] = useState(0);
  const [formDataComment, setFormDataComment] = useState({
    post_id: "",
    comment: "",
  });
  const [likeStatus, setLikeStatus] = useState(post.likedStatus);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    console.log('test profile creator', profileCreator);
    console.log('test profile', profile);
    setCountLike(likes);
    setCountComment(totalComment);
  }, [likes, totalComment]);

  const handleLike = async (post_id) => {
    await handleLikeButton(post_id);
    onUpdateCounts();
  };

  const hasAlreadyLiked = async (post_id) => {
    const resHasLiked = await hasLiked(post_id);
    if (await resHasLiked.data.status) {
      return true;
    } else {
      return false;
    }
  };

  const handleLikeButton = async (post_id) => {
    const postIdLike = {
      post_id: post_id,
    };

    const likedStatus = await hasAlreadyLiked(post_id);
    if (likedStatus) {
      const responseLikesData = await getPostFavoritesByAccAndPostId(post_id);
      const like_id = await responseLikesData.data[0].id;
      const successCancelLike = await cancelLike(like_id);

      if (successCancelLike) {
        setLikeStatus(!likedStatus);

        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
      }
    } else {
      const successAddLike = await addLike(postIdLike);
      if (successAddLike) {
        console.log("Success add like to the post", successAddLike);

        setLikeStatus(!likedStatus);

        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);

        return false;
      } else {
        return true;
      }
    }
  };

  const handleCommentChange = (e) => {
    setFormDataComment({
      ...formDataComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleCommentButton = async (post_id) => {
    setFormDataComment((prevData) => ({
      ...prevData,
      post_id: post_id,
    }));

    setPostStates((prevState) => ({
      ...prevState,
      [post_id]: {
        ...prevState[post_id],
        showComments: !prevState[post_id]?.showComments,
      },
    }));

    try {
      const responseComment = await getPostCommentsByPostId(post_id);
      const responseCommentData = responseComment.data;

      setComments(responseCommentData);
    } catch (error) {
      console.error("Error fetching post comments:", error);
    }
  };

  const handleCommentFormSubmit = async (e) => {
    e.preventDefault();

    const postId = formDataComment.post_id;
    const commentData = formDataComment.comment;

    if (!commentData.trim()) {
      console.error("Please fill in the comment field.");
      notify("Please fill in the comment field.", "error");
      return;
    }

    try {
      const commentsData = {
        post_id: postId,
        comment: commentData,
      };

      const responseComment = await addComment(commentsData);

      setFormDataComment((prevData) => ({
        ...prevData,
        comment: "",
      }));

      if (responseComment) {
        console.log("Comment created successfully");
        // notify("Comment created successfully", "success");

        const newComment = responseComment.data;
        setComments((prevComments) => [...prevComments, newComment]);

        onUpdateCounts();
      }
    } catch (error) {
      console.error("Error creating comment:", error.message);
      notify("Error creating comment", "error");
    }
  };

  // const url = `${window.location.origin}/postCreator/${post.id}`;
  const url = `${window.location.origin}/postCreator`;

  const confirmNotify = (message, onConfirm, onCancel) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-end justify-end space-y-4">
          <p className="text-black mx-1 text-md">{message}</p>
          <div className="flex space-x-1">
            <button
              onClick={() => {
                closeToast();
              }}
              className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // onCancel();
                onConfirm();
                closeToast();
              }}
              className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      }
    );
  };

  const handleDeletePost = async (id) => {
    const onConfirm = async () => {
      try {
        await deletePostHandler(id);
        if (deletePostHandler) {
          notify("Post deleted successfully", "success");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        // notify("Post deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting post", error.message);
        notify("Error deleting post", "error");
      }
    };

    // const onCancel = () => {
    //   notify("Post deletion canceled", "error");
    // };

    confirmNotify(
      "Are you sure you want to delete this post?",
      onConfirm
      // onCancel
    );
  };

  // const handleDeletePost = async (id) => {
  //   try {
  //     console.log(id);
  //     const confirmed = window.confirm(
  //       "Are you sure you want to delete this post?"
  //     );
  //     if (confirmed) {
  //       await deletePostHandler(id);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting post", error.message);
  //     notify("Error deleting post", "error");
  //   }
  // };

  // const notify = (message, type) => {
  //   if (type === "success") {
  //     alert(message);
  //   } else if (type === "error") {
  //     alert(`Error: ${message}`);
  //   }
  // };

  const notify = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === "error") {
      toast.error(`Error: ${message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deletePostHandler = async (id) => {
    try {
      const successDeletePost = await deletePost(id);
      if (successDeletePost) {
        // notify("Post deleted successfully", "success");
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting post", error.message);
    }
  };

  const handleEditPost = (id) => {
    navigate(`/editPost/${id}`);
  };

  const getMediaType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    if (
      ["jpg", "jpeg", "png", "gif", "svg", "bmp", "webp"].includes(extension)
    ) {
      return "image";
    } else if (
      ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"].includes(extension)
    ) {
      return "video";
    } else if (
      ["mp3", "wav", "ogg", "flac", "aac", "mpeg"].includes(extension)
    ) {
      return "audio";
    } else {
      return null;
    }
  };

  return (
    <div
      key={index}
      className="max-w-sm sm:max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden lg:max-w-3xl m-10"
    >
      <div className="">
        <div className="basis-1/2 relative z-0">
          {post.media && (
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => setFileNumber(swiper.realIndex + 1)}
            >
              {post.media.split(",").map((url, index) => (
                <SwiperSlide key={index}>
                  {getMediaType(url.trim()) === "video" ? (
                    <video
                      controls
                      src={url.trim()}
                      alt="Video"
                      className="w-full object-cover lg:max-h-[450px]"
                    ></video>
                  ) : getMediaType(url.trim()) === "audio" ? (
                    <div className="flex justify-center items-center my-10">
                      <img
                        className="lg:w-20 lg:h-20 rounded-[5px] mr-5"
                        style={{ width: "120px", height: "120px" }}
                        src="https://picsum.photos/500/500?random"
                        alt="Profile"
                      />
                      <audio
                        controls
                        className="ml-5"
                        src={url.trim()}
                        alt="Audio"
                      ></audio>
                    </div>
                  ) : getMediaType(url.trim()) === "image" ? (
                    <img
                      className="w-full object-cover lg:max-h-[450px]"
                      src={url.trim()}
                      alt={`Image ${index + 1}`}
                    />
                  ) : (
                    <p></p>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      <div className="basis-1/2 mt-3 pt-4 pl-8 pr-8 pb-8">
        <div className="text-3xl text-black font-bold ml-3">{post.title}</div>
        <ReactQuill
          value={post.content}
          readOnly={true}
          theme={"bubble"}
          // className="mx-5 text-left"
        />
        <div
          className="mt-3 text-black text-sm ml-3"
          style={{ fontStyle: "italic" }}
        >
          {post.tags.map((tag, index) => (
            <div key={index}>{tag.tag}</div>
          ))}
        </div>
        <div
          className="mt-3 text-black text-sm ml-3"
          style={{ fontStyle: "italic" }}
        >
          {post.categories.map((category, index) => (
            <div key={index}>{category.categories}</div>
          ))}
        </div>
        <p className="mt-2 text-gray-500 ml-3">{post.published_date}</p>

        <div className="flex mt-2 ml-2">
          {/* Button Like */}
          <button
            className={`font-medium transition-transform duration-300 ease-in-out transform ${
              likeStatus ? "scale-110" : "scale-100"
            } hover:scale-110 ${animate ? "animate-ping" : ""}`}
            onClick={() => handleLike(post.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={likeStatus ? "red" : "none"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={likeStatus ? "red" : "currentColor"}
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>

          <p className=" text-black font-semibold mx-1 text-lg">
            {countLike[index]}
          </p>

          {/* Button Comment */}
          <button
            className={`font-medium transition-transform duration-300 ease-in-out transform hover:scale-110`}
            onClick={() => handleCommentButton(post.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={
                postStates[post.id] && postStates[post.id].showComments
                  ? "currentColor"
                  : "none"
              }
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={showComments ? "currentColor" : "currentColor"}
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
          </button>
          <p className=" text-black font-semibold mx-1 text-lg">
            {countComment[index]}
          </p>
          {/* Button Share */}
          <button
            className="font-medium text-black mx-1 transition-transform duration-300 ease-in-out transform hover:scale-110"
            onClick={toggleModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
          </button>

          {/* Button Edit */}
          <button
            className="font-medium text-black mx-1 transition-transform duration-300 ease-in-out transform hover:scale-110"
            onClick={() => handleEditPost(post.id)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.375 2.62523C18.7728 2.2274 19.3124 2.00391 19.875 2.00391C20.4376 2.00391 20.9772 2.2274 21.375 2.62523C21.7728 3.02305 21.9963 3.56262 21.9963 4.12523C21.9963 4.68784 21.7728 5.2274 21.375 5.62523L12 15.0002L8 16.0002L9 12.0002L18.375 2.62523Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          {/* Button Delete */}
          <button
            className="font-medium text-black mx-1 transition-transform duration-300 ease-in-out transform hover:scale-110"
            onClick={() => {
              handleDeletePost(post.id);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2964_902)">
                <path
                  d="M20 5C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7H19L18.997 7.071L18.064 20.142C18.0281 20.6466 17.8023 21.1188 17.4321 21.4636C17.0619 21.8083 16.5749 22 16.069 22H7.93C7.42414 22 6.93707 21.8083 6.56688 21.4636C6.1967 21.1188 5.97092 20.6466 5.935 20.142L5.002 7.072C5.00048 7.04803 4.99982 7.02402 5 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H20ZM16.997 7H7.003L7.931 20H16.069L16.997 7ZM14 2C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3C15 3.26522 14.8946 3.51957 14.7071 3.70711C14.5196 3.89464 14.2652 4 14 4H10C9.73478 4 9.48043 3.89464 9.29289 3.70711C9.10536 3.51957 9 3.26522 9 3C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14Z"
                  fill="black"
                  stroke-width="1.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_2964_902">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    stroke-width="1.5"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>

          {post.tiers.map((tier, tierIndex) => (
            <div key={tierIndex}>
              <div className="text-white font-semibold text-[12px] bg-gray-800 rounded-lg px-4 py-2">
                {tier.tier_name}
              </div>
            </div>
          ))}
        </div>

        {postState && postState.showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <div className="bg-white p-4 rounded-xl">
              <p>Here is the link:</p>
              {/* <p>https://example.com/postingan</p> */}
              <p>{url}</p>
              <div className="flex justify-between mt-4 space-x-4">
                <CopyToClipboard text={url}>
                  <button
                    className="w-full bg-black hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                    onClick={() => alert("Link copied to clipboard")}
                  >
                    Copy Link
                  </button>
                </CopyToClipboard>
                <button
                  className="w-full bg-black hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                  onClick={() => toggleModal(post.id)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {postStates[post.id]?.showComments && (
          <>
            <div className="border border-t-1 border-black w-full my-5"></div>
            <div className="flex my-5">
              <img
                className="lg:w-20 lg:h-20 rounded-full"
                style={{ width: "65px", height: "65px" }}
                src="https://picsum.photos/500/500?random"
                alt="Profile"
              />
              <div className="mx-3 w-full">
                <p className="text-black font-semibold mb-1">{profile.name}</p>
                <form onSubmit={handleCommentFormSubmit}>
                  <div className="flex items-center border border-black rounded-xl px-4 py-2 focus:outline-none focus:border-gray-500 w-full">
                    <input
                      type="text"
                      className="flex-1 focus:outline-none"
                      placeholder="Add comment..."
                      id="comment"
                      name="comment"
                      onChange={handleCommentChange}
                      value={formDataComment.comment}
                    />
                    <button type="submit" className="cursor-pointer">
                      <svg
                        className="cursor-pointer"
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 20V12.0708L7.58088 10L0 7.92923V0L20 10L0 20Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {comments.map((comment, index) => (
              <div key={comment.id} className="flex my-5">
                <img
                  className="lg:w-20 lg:h-20 rounded-full"
                  style={{ width: "65px", height: "65px" }}
                  src="https://picsum.photos/500/500?random"
                  alt="Profile"
                />
                <div className="mx-3 w-full">
                  <p className="text-black font-semibold mb-1">
                    {comment.account?.profile?.name ||
                      (profile && profile.name) ||
                      "unknown"}
                  </p>
                  <p className="text-gray-500 font-semibold break-words max-w-full sm:max-w-xl">
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center">
              <button
                className="text-black font-semibold"
                onClick={() => handleCommentButton(post.id)}
              >
                {postStates[post.id]?.showComments
                  ? "Close Comments"
                  : "Close Comments"}
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
