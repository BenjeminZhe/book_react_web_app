import axios from "axios";

const REVIEW_API = "http://localhost:4000/books";

export const findReviews = async (bookid) => {
    const response = await axios.get(`${REVIEW_API}/${bookid}/reviews`);
    return response.data;
};

export const createReviews = async (reviews) => {
    const response = await axios.post(
        `http://localhost:4000/reviews`,
        reviews
    );
    return response.status;
};
