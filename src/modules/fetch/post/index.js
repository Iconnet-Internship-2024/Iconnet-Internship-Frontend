import { instance } from "../../axios/index.js";

async function getAllPost() {
  try {
    const response = await instance.get("/post");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostById(id) {
  try {
    const response = await instance.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostByAccountId(account_id) {
  try {
    let url = "/post/acc";
    if (account_id) {
      url += `/${account_id}`;
    }
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostByTierId(tier_id) {
  try {
    const response = await instance.get(`/post/tier/${tier_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostByAccAndTierId(account_id) {
  try {
    const response = await instance.get(`/post/accTier/${account_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createPost(formData) {
  try {
    const response = await instance.post(`/post`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function editPost(id, formData) {
  try {
    const response = await instance.put(`/post/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deletePost(id) {
  try {
    const response = await instance.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getFilteredPostsWithAccId(filterData) {
  try {
    const response = await instance.get("/post/filteredPostsAccId", {
      params: filterData,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getFilteredPostsWithAccIdPOVUser(filterData) {
  try {
    const response = await instance.get("/post/filteredPostsAccIdPOVUser", {
      params: filterData,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export {
  getAllPost,
  getPostById,
  getPostByAccountId,
  getPostByTierId,
  getPostByAccAndTierId,
  createPost,
  editPost,
  deletePost,
  getFilteredPostsWithAccId,
  getFilteredPostsWithAccIdPOVUser,
};
