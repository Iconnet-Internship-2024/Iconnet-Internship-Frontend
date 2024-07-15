import { instance } from "../../axios/index.js";

async function getProfile() {
  try {
    const response = await instance.get("/profile");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getCreatorProfile() {
  try {
    const response = await instance.get("/profile/creator");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getCreatorProfileParams(account_id) {
  try {
    let url = "/profile/creator-user-pov";
    if (account_id) {
      url += `/${account_id}`;
    }
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export { getProfile, getCreatorProfile, getCreatorProfileParams };
