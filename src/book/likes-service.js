import axios from "axios";

const LIKES_API = "http://localhost:4000/users/likes";

export const userLikesBook = async (book_id) => {
    const response = await axios.post(
        `${LIKES_API}/{book_id}`
    );
    return response.data;
};

export const findBooksLikesByUserId = async (userId, book_id) => {
    const response = await axios.post(
        `http://localhost:4000/${userId}/likes`,
        userId, book_id
    );
    return response.data;
};
