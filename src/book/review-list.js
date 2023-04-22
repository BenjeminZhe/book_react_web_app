import React, { useEffect, useState } from 'react';
import {createReviews, findReviews} from "./review-service";
import {useSelector} from "react-redux";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

function ReviewList() {
    // Define state variables to store the book details and reviews
    const [reviews, setReviews] = useState([]);
    const {currentUser} = useSelector((state) => state.users);
    // Define a function to handle form submission and add a new review
    var { id } = useParams();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newReview = {
            // reviewer: formData.get('reviewer'),
            review: formData.get('text'),
            book_id: id
        };
        await createReviews(newReview)
        setReviews([...reviews, newReview]);
    };
    const fetchReview = async() => {
        const response = await findReviews(id);
        setReviews(response)
    }

    useEffect(() => {
        fetchReview();
    }, []);

    return (
        <div>
            <div class="wd-text-review">
                <h5>User Reviews</h5>
                <ul class="wd-text-rl">
                    {reviews.map((review, index) => (
                        <li key={index}>
                            <p>{review.review}</p>
                            <p> Reviewed by {review.author? review.author.username :" unknown"}
                                <a href={`/profile/${review.author? String(review.author.username) :" unknown"}`}>{review.author? String(review.author.username) :" unknown"}</a>
                            </p>
                        </li>
                    ))}
                </ul>

                <h5> Write a review </h5>
                <form onSubmit={handleSubmit}> 
                    <div>
                        <label htmlFor="text" class="wd-text-rl"> Review Below: </label>
                        <p></p>
                        <textarea id="text" name="text" class="ms-3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Submit Review</button>
                </form>

            </div>
            
        </div>
    );
}

export default ReviewList;
