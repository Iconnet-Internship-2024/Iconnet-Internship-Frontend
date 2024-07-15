import { instance } from "../../axios/index.js";

async function getAllAccountTiers() {
  try {
    const response = await instance.get("/account-tier");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getTierByAcc() {
  try {
    const response = await instance.get(`/account-tier/acc`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export { getAllAccountTiers, getTierByAcc };
