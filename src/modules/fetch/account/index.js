import { instance } from "../../axios/index.js";

async function getCreators() {
  try {
    const response = await instance.get("/account");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export { getCreators };
