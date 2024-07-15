import { instance } from "../../axios/index.js";

async function getAllPostComment() {
  try {
    const response = await instance.get("/postComment");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostCommentById(id) {
  try {
    const response = await instance.get(`/postComment/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostCommentsByAccountId() {
  try {
    const response = await instance.get(`/postComment/acc`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostCommentsByPostId(post_id) {
    try {
      const response = await instance.get(`/postComment/post/${post_id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
  }

async function addComment(formData) {
  try {
    const response = await instance.post(`/postComment`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function editComment(id, formData) {
  try {
    const response = await instance.patch(`/postComment/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteComment(id) {
  try {
    const response = await instance.delete(`/postComment/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function countComments(post_id) {
    try {
      const response = await instance.get(`/postComment/comments/${post_id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
  }

export { getAllPostComment, getPostCommentById, getPostCommentsByAccountId, getPostCommentsByPostId, addComment, editComment, deleteComment, countComments };
