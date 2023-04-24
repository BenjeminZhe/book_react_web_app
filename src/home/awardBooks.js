import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTop15Books} from "../actions/top-book-actions";
import {fetchPopularAuthors} from "../actions/popular-author-actions";
import {fetchAwardedBooks} from "../actions/award-book-actions";

const AwardBooksComponent = () => {
    const dispatch = useDispatch();
    const awardBooks = useSelector((state) => state.awardedBooks.awardedBooks);
    const loading = useSelector((state) => state.awardedBooks.loading);
    const error = useSelector((state) => state.awardedBooks.error);

    useEffect(() => {
        const storedBooks = localStorage.getItem('awardBooks');
        if (storedBooks) {
            dispatch({ type: 'FETCH_AWARDED_BOOKS_SUCCESS', payload: JSON.parse(storedBooks) });
        } else {
            dispatch(fetchAwardedBooks());
        }
    }, [dispatch]);

    useEffect(() => {
        if (awardBooks.length > 0) {
            localStorage.setItem('awardBooks', JSON.stringify(awardBooks));
        }
    }, [awardBooks]);

    return(
        <>
            <h3>Awarded Books in Last Year</h3>
            <div>
                <div className="row row-cols-2 row-cols-md-3  row-cols-lg-6 g-4">
                    {awardBooks && awardBooks.map((book) => (<div className="col" key={book.book_id}>
                        <Link to={`/book/${book.book_id}`} className="text-decoration-none text-dark">

                            <div className="card h-100">
                                <img src={book.cover} className="card-img-top" height="200" width="100"
                                     alt={book.name}/>
                                <div className="card-body p-1 text-center border-0">
                                    <p className="card-title">{book.name}</p>
                                </div>
                            </div>
                        </Link>
                    </div>))}
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </div>
            </div>
        </>
    )
}
export default AwardBooksComponent;
