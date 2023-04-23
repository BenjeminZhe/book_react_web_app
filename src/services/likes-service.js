import axios from "axios";

const LIKES_API = "http://localhost:4000";
const api = axios.create({
    withCredentials: true,
});
export const userLikesBook = async (bookId) => {
    const response = await api.post(
        `${LIKES_API}/users/likes/${bookId}`
    );
    return response.data;
};

export const userUnlikesBook = async (bookId) => {
    const response = await api.delete(
        `${LIKES_API}/users/unlikes/${bookId}`
    );
    return response.data;
};


export const findAllLikes = async () => {
    const response = await axios.get(LIKES_API + "/likes");
    return response.data;
}

export const findBooksLikedByUser = async (userId) => {
    const response = await api.get(`${LIKES_API}/users/${userId}/likes`);
    return response.data;
};

export const findUsersWhoLikedBook = async (bookId) => {
    const response = await api.get(`${LIKES_API}/books/${bookId}/likes`);
    return response.data;
}

