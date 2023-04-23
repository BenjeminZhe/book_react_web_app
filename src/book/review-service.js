import axios from "axios";

const REVIEW_API = "http://localhost:4000/books";

const api = axios.create({
    withCredentials: true,
});
export const findReviews = async (bookid) => {
    const response = await api.get(`${REVIEW_API}/${bookid}/reviews`);
    return response.data;
};

export const createReviews = async (reviews) => {
    const response = await api.post(
        `http://localhost:4000/reviews`,
        reviews
    );
    return response.status;
};
