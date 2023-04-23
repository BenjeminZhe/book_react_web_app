import axios from "axios";

const LIKES_API = "http://localhost:4000/likes";
const USERS_API = "http://localhost:4000/users";

const api = axios.create({
    withCredentials: true,
});

export const userLikesBook = async (userId, bookId) => {
    const response = await api.post(
        `${USERS_API}/${userId}/likes/books/${bookId}`
    );
    return response.data;
};

export const userUnlikesBook = async (userId, bookId) => {
    const response = await api.delete(
        `${USERS_API}/${userId}/likes/books/${bookId}`
    );
    return response.data;
};


export const findAllLikes = async () => {
    const response = await api.get(LIKES_API);
    return response.data;
}

export const findBooksLikedByUser = async (userId) => {
    const response = await api.get(`${USERS_API}/${userId}/likes`);
    return response.data;
};

export const findUsersWhoLikedBook = async (bookId) => {
    const response = await api.get(`${LIKES_API}/${bookId}/users`);
    return response.data;
}

