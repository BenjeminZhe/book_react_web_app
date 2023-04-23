import axios from "axios";

const USERS_API = "http://localhost:4000";

export const userFollowsUser = async (followedId) => {
  const followObj = { "followed" : {"_id" : followedId}};
  const response = await axios.post(
    `${USERS_API}/follows`, followObj
  );
  return response.data;
};

export const userUnfollowsUser = async (followerId, followedId) => {
  const response = await axios.delete(
    `${USERS_API}/${followerId}/follows/${followedId}`
  );
  return response.data;
};

export const findFollowsByFollowedId = async (followed) => {
  const response = await axios.get(`${USERS_API}/${followed}/followers`);
  return response.data;
};

export const findFollowsByFollowerId = async (follower) => {
  const response = await axios.get(`${USERS_API}/${follower}/following`);
  return response.data;
};