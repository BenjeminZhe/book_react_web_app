import axios from "axios";

const LIKES_API = "http://localhost:4000";
const api = axios.create({
    withCredentials: true,
});
export const userLikesBook = async (bookId) => {
    const response = await api.post(
        `${LIKES_API}/users/likes/${bookId}`
// =======
// const LIKES_API = "http://localhost:4000/likes";
// const USERS_API = "http://localhost:4000/users";
//
// const api = axios.create({
//     withCredentials: true,
// });
//
// export const userLikesBook = async (userId, bookId) => {
//     const response = await api.post(
//         `${USERS_API}/${userId}/likes/books/${bookId}`
// >>>>>>> fb0ef2bcf9b14bb4629a1d82aa735b4b7a1ec3aa
    );
    return response.data;
};


export const userUnlikesBook = async (bookId) => {
    const response = await api.delete(
        `${LIKES_API}/users/unlikes/${bookId}`
// =======
// export const userUnlikesBook = async (userId, bookId) => {
//     const response = await api.delete(
//         `${USERS_API}/${userId}/likes/books/${bookId}`
// >>>>>>> fb0ef2bcf9b14bb4629a1d82aa735b4b7a1ec3aa
    );
    return response.data;
};


export const findAllLikes = async () => {

    const response = await api.get(LIKES_API + "/likes");
// =======
//     const response = await api.get(LIKES_API);
// >>>>>>> fb0ef2bcf9b14bb4629a1d82aa735b4b7a1ec3aa
    return response.data;
}

export const findBooksLikedByUser = async (userId) => {

    const response = await api.get(`${LIKES_API}/users/${userId}/likes`);
// =======
//     const response = await api.get(`${USERS_API}/${userId}/likes`);
// >>>>>>> fb0ef2bcf9b14bb4629a1d82aa735b4b7a1ec3aa
    return response.data;
};

export const findUsersWhoLikedBook = async (bookId) => {

    const response = await api.get(`${LIKES_API}/books/${bookId}/likes`);
// =======
//     const response = await api.get(`${LIKES_API}/${bookId}/users`);
// >>>>>>> fb0ef2bcf9b14bb4629a1d82aa735b4b7a1ec3aa
    return response.data;
}

