import axios from "axios";

const LIKES_API = "http://localhost:4000/users/likes";
const UN_LIKES_API = "http://localhost:4000/users/unlikes";
const USERS_API = "http://localhost:4000/users"

const api = axios.create({
    withCredentials: true,
});

export const userLikesBook = async (book_id) => {
    const response = await api.post(
        `${LIKES_API}/${book_id}`
    );
    return response.data;
};

export const userUnLikesBook = async (book_id) => {
    const response = await api.delete(
        `${UN_LIKES_API}/${book_id}`
    );
    return response.data;
};

export const findBooksLikedByUser = async (userId) => {
    const response = await api.get(`${USERS_API}/${userId}/likes`);
    return response.data;
};
