import React, { useState } from 'react';
import {createReviews, findReviews} from "./review-service";

function ReviewList() {
    // Define state variables to store the book details and reviews
    const [reviews, setReviews] = useState([]);
    // Define a function to handle form submission and add a new review
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newReview = {
            reviewer: formData.get('reviewer'),
            text: formData.get('text'),
        };
        await createReviews(newReview.text)
        setReviews([...reviews, newReview]);
    };

    const fetchReview = async() => {
        const response = await findReviews(id);
        setReviews(response)
    }
    const createReview = async (reviews) => {
        await createReviews(reviews)
    }

    return (
        <div>
            <h5>Reviews</h5>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <p>{review.text}</p>
                        <p> Review by{' '}
                            <a href={`/profile/${review.reviewer}`}>{review.reviewer}</a>
                        </p>
                    </li>
                ))}
            </ul>

            <h2>Write a review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="reviewer">Name:</label>
                    <input type="text" id="reviewer" name="reviewer" />
                </div>
                <div>
                    <label htmlFor="text">Review:</label>
                    <textarea id="text" name="text"></textarea>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default ReviewList;

// const ReviewList = ({results}) => {
//     return (
//         <div className="container">
//             <div className="">
//                 {console.log(results)}
//                 {results.map(book => (
//                     <ReviewListItem
//                         key={book.book_id}
//                         book={book}
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }
//
// export default ReviewList;