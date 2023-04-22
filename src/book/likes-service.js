import axios from "axios";

const LIKES_API = "http://localhost:4000/users/likes";
const UN_LIKES_API = "http://localhost:4000/users/unlikes";

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
    const response = await api.post(
        `${UN_LIKES_API}/${book_id}`
    );
    return response.data;
};

export const findBooksLikesByUserId = async (userId, book_id) => {
    const response = await api.post(
        `http://localhost:4000/${userId}/likes`,
        userId, book_id
    );
    return response.data;
};
