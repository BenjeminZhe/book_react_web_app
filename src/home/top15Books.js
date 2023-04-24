import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTop15Books } from '../actions/top-book-actions';
import {Link} from "react-router-dom";

const Top15BooksComponent = () => {
    const dispatch = useDispatch();
    const top15Books = useSelector((state) => state.top15Books.top15Books);
    const loading = useSelector((state) => state.top15Books.loading);
    const error = useSelector((state) => state.top15Books.error);

    useEffect(() => {
        const storedBooks = localStorage.getItem('top15Books');
        if (storedBooks) {
            dispatch({ type: 'FETCH_TOP15_BOOKS_SUCCESS', payload: JSON.parse(storedBooks) });
        } else {
            dispatch(fetchTop15Books());
        }
    }, [dispatch]);

    useEffect(() => {
        if (top15Books.length > 0) {
            localStorage.setItem('top15Books', JSON.stringify(top15Books));
        }
    }, [top15Books]);

    return(
        <>
            <h3>Top 15 Books in This Month</h3>
            <div>
                <div className="row row-cols-2 row-cols-md-3  row-cols-lg-6 g-4">
                    {top15Books && top15Books.map((book) => (<div className="col" key={book.book_id}>
                        {/*todo: link with detail page*/}
                        <Link to={`/book/${book.name}`} className="text-decoration-none">
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
};

export default Top15BooksComponent;
