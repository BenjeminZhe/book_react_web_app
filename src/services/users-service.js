import axios from "axios";
const USERS_API_URL = "http://localhost:4000";

const api = axios.create({
    withCredentials: true,
});

export const findAllUsers = async () => {

    const response = await axios.get(`${USERS_API_URL}/users`);

    return response.data;
};

export const findUserById = async (id) => {
    const response = await axios.get(`${USERS_API_URL}/users/${id}`);
    return response.data;
};

export const createUser = (user) => {
    return axios.post(`${USERS_API_URL}/users`, user);

};

export const updateUser = (newUser) => {
    return api.put(`${USERS_API_URL}/users/${newUser._id}`, newUser);
};

export const deleteUser = (id) => {
    return axios.delete(`${USERS_API_URL}/users/${id}`);
};

export const login = (user) => {
    return api.post(`${USERS_API_URL}/login`, user);
};

export const logout = () => {
    return api.post(`${USERS_API_URL}/logout`);
};

export const register = (user) => {
    return api.post(`${USERS_API_URL}/register`, user);
};

export const profile = () => {
    return api.get(`${USERS_API_URL}/profile`);
};