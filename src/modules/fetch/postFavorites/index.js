import { instance } from "../../axios/index.js";

async function getAllPostFavorites() {
  try {
    const response = await instance.get("/postFavorites");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostFavoritesById(id) {
  try {
    const response = await instance.get(`/postFavorites/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostFavoritesByAccountId() {
  try {
    const response = await instance.get(`/postFavorites/acc`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostFavoritesByPostId(post_id) {
    try {
      const response = await instance.get(`/postFavorites/post/${post_id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
  }

async function addLike(formData) {
  try {
    const response = await instance.post(`/postFavorites`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function cancelLike(id) {
  try {
    const response = await instance.delete(`/postFavorites/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function countLikes(post_id) {
  try {
    const response = await instance.get(`/postFavorites/likes/${post_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function hasLiked(post_id) {
  try {
    const response = await instance.get(`/postFavorites/has-liked/${post_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostFavoritesByAccAndPostId(post_id) {
  try {
    const response = await instance.get(`/postFavorites/acc-post/${post_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}


export { getAllPostFavorites, getPostFavoritesById, getPostFavoritesByAccountId, getPostFavoritesByPostId, addLike, cancelLike, countLikes, hasLiked, getPostFavoritesByAccAndPostId };
