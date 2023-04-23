import axios from "axios";

const USERS_API = "http://localhost:4000";

const api = axios.create({
  withCredentials: true,
});

export const userFollowsUser = async (followedId) => {
  const followObj = { "followed" : {"_id" : followedId}};
  const response = await api.post(
    `${USERS_API}/follow`, followObj
  );
  return response.data;
};

export const userUnfollowsUser = async (followedId) => {
  const followObj = { "followed" : {"_id" : followedId}};
  const response = await api.post(
    `${USERS_API}/unfollow`, followObj
  );
  return response.data;
};

export const findFollowsByFollowedId = async (followed) => {
  const response = await api.get(`${USERS_API}/users/${followed}/followers`);
  return response.data;
};

export const findFollowsByFollowerId = async (follower) => {
  const response = await api.get(`${USERS_API}/users/${follower}/following`);
  return response.data;
};