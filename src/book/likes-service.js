import axios from "axios";

const USERS_API = "http://localhost:4000/api/users";
export const findLikesByUserId = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/likes`);
  return response.data;
};