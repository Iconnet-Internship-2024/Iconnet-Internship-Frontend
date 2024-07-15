import React, { useEffect, useState } from "react";
import { getPostByAccountId, getPostByAccAndTierId } from "../modules/fetch/post";
import { countLikes, hasLiked } from "../modules/fetch/postFavorites";
import { countComments } from "../modules/fetch/postComment";
import { getProfile, getCreatorProfileParams } from "../modules/fetch/profile";
import DetailPostCardUser from "./DetailPostCardUser";
import SearchPostUser from "./SearchPostUser";
import { useParams } from "react-router-dom";

const PostCreator = () => {
  const [posts, setPosts] = useState([]);
  const [postStates, setPostStates] = useState([]);
  const [countLike, setCountLike] = useState(0);
  const [countComment, setCountComment] = useState(0);
  const [profile, setProfile] = useState(null);
  const [profileCreator, setProfileCreator] = useState(null);
  const account_id = useParams();

  useEffect(() => {
    fetchProfile();
    fetchCreatorProfile(account_id.id);
    fetchPosts(account_id.id);
  }, []);

  function getTimeDifference(publishedDate) {
    const now = new Date();
    const published = new Date(publishedDate);
    const difference = now - published;

    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)); // Rata-rata hari dalam sebulan
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25)); // Menggunakan tahun kabisat

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 30) {
      return `${days} days ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  }

  const hasAlreadyLiked = async (post_id) => {
    const resHasLiked = await hasLiked(post_id);
    if (await resHasLiked.data.status) {
      return true;
    } else {
      return false;
    }
  };

  const fetchPosts = async (account_id) => {
    try {
      console.log("account_id", account_id);
      // const response = await getPostByAccountId(account_id);
      const response = await getPostByAccAndTierId(account_id);
      const postsData = response.data;
      if (response && response.data && Array.isArray(response.data)) {
        const formattedPosts = await Promise.all(
          postsData.map(async (post) => {
            const likedStatus = await hasAlreadyLiked(post.id);
            return {
              ...post,
              published_date: getTimeDifference(post.published_date),
              likedStatus: likedStatus,
            };
          })
        );

        const initialPostStates = formattedPosts.map(() => ({
          liked: false,
          showComments: false,
          showModal: false,
          report: false,
          successAlert: false,
          isReportModalOpen: false,
        }));
        setPosts(formattedPosts);
        setPostStates(initialPostStates);

        const commentCounts = await Promise.all(
          formattedPosts.map(async (post) => {
            const getCountComments = await countComments(post.id);
            return getCountComments.commentCount;
          })
        );

        setCountComment(commentCounts);

        const likeCounts = await Promise.all(
          formattedPosts.map(async (post) => {
            const getCountLikes = await countLikes(post.id);
            return getCountLikes.likeCount;
          })
        );

        setCountLike(likeCounts);
      } else {
        console.error("Response data is not in the expected format:", response);
      }
    } catch (error) {
      console.log("Error fetching posts", error);
    }
  };

  const updateCounts = async (postId) => {
    try {
      const newCommentCount = await countComments(postId);
      const newLikeCount = await countLikes(postId);

      setCountComment((prevCounts) =>
        prevCounts.map((count, index) =>
          posts[index] && posts[index].id === postId
            ? newCommentCount.commentCount
            : count
        )
      );

      setCountLike((prevCounts) =>
        prevCounts.map((count, index) =>
          posts[index] && posts[index].id === postId
            ? newLikeCount.likeCount
            : count
        )
      );
    } catch (error) {
      console.error("Error updating counts:", error);
    }
  };

  const fetchProfile = async () => {
    const profileData = await getProfile();
    setProfile(profileData);
  };

  const fetchCreatorProfile = async (account_id) => {
    const profileCreatorData = await getCreatorProfileParams(account_id);
    setProfileCreator(profileCreatorData);
  };

  const updatePosts = (filteredPosts) => {
    const updatedPosts = filteredPosts.map((post) => {
      return {
        ...post,
        published_date: getTimeDifference(post.published_date),
      };
    });
    setPosts(updatedPosts);
  };

  const toggleModal = (postId) => {
    setPostStates((prevStates) =>
      prevStates.map((state, index) =>
        posts[index] && posts[index].id === postId
          ? { ...state, showModal: !state.showModal }
          : state
      )
    );
  };

  return (
    <div className="py-3">
      <SearchPostUser updatePosts={updatePosts} account_id={account_id.id} />
      {posts.map((post, index) => (
        <div key={index}>
          <DetailPostCardUser
            post={post}
            index={index}
            likes={countLike}
            totalComment={countComment}
            postId={post.id}
            onUpdateCounts={() => updateCounts(post.id)}
            profile={profile}
            profileCreator={profileCreator}
            postState={postStates[index]}
            toggleModal={() => toggleModal(post.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default PostCreator;
