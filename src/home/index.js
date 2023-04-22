import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTop15Books } from "../actions/top-book-actions";
import { fetchAwardedBooks } from "../actions/award-book-actions";
import { fetchPopularAuthors } from "../actions/popular-author-actions";
import { Link } from "react-router-dom";

function Home() {
    // Retrieve current user
    const { currentUser } = useSelector((state) => state.users);

    // Get data from Redux store

    const topBooks = useSelector((state) => state.top15Books.top15Books);
    console.log(topBooks.length);
    const awardBooks = useSelector((state) => state.awardedBooks.awardedBooks);
    const popularAuthors = useSelector((state) => state.popularAuthors.popularAuthors);

    // Use dispatch to fetch data when the component mounts
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTop15Books());
        dispatch(fetchAwardedBooks());
        dispatch(fetchPopularAuthors());
    }, [dispatch]);


    return (

        <div className="container mt-3">
            <div className="mt-4">
                {currentUser &&
                    <h5 className="mb-4">
                        Welcome To {currentUser.role} Home, {currentUser.username}!!
                    </h5>}
                {(!currentUser || currentUser.role === "USER") &&
                    <>
                        <h3 className="mb-3">Top 15 Books in This Month</h3>
                        <div>
                            <div className="row row-cols-2 row-cols-md-3  row-cols-lg-6 g-4">
                                {topBooks && topBooks.map((book) => (<div className="col" key={book.book_id}>
                                    {/*todo: link with detail page*/}
                                    <Link to={`/book/${book.book_id}`} className="text-decoration-none">
                                        <div className="card h-100">
                                            <img src={book.cover} className="card-img-top" height="200" width="100"
                                                 alt={book.name}/>
                                            <div className="card-body p-1 text-center border-0">
                                                <p className="card-title">{book.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>))}
                            </div>
                        </div>
                    </>
                }
                {(currentUser && currentUser.role === "ADMIN") &&
                    <>
                        <h3>Top 15 Awarded Books in Last Year</h3>
                        <div>
                            <div className="row row-cols-2 row-cols-md-3  row-cols-lg-6 g-4">
                                {awardBooks && awardBooks.map((book) => (<div className="col" key={book.book_id}>
                                    <Link to={`/BookSearcher/book/${book.name}`} className="text-decoration-none text-dark">

                                        <div className="card h-100">
                                            <img src={book.cover} className="card-img-top" height="200" width="100"
                                                 alt={book.name}/>
                                            <div className="card-body p-1 text-center border-0">
                                                <p className="card-title">{book.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>))}
                            </div>
                        </div>
                    </>
                }
                {(currentUser && currentUser.role === "AUTHOR") &&
                    <>
                        <h3>Top 15 Popular Authors</h3>
                        <div>
                            <div className="row row-cols-1 row-cols-md-2  row-cols-lg-4 g-4">
                                {popularAuthors && popularAuthors.map((author) => (
                                    <Link to={`/BookSearcher/book/${author.name}`} className="text-decoration-none">
                                        <div className="col" key={author.author_id}>
                                            <div className="card h-100">
                                                <img src={author.image} className="card-img-top" height="200"
                                                     width="200"
                                                     alt={author.name}/>
                                                <div className="card-body p-1 text-center border-0">
                                                    <p className="card-title">{author.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>

            {/*<div className="table-responsive">*/}
            {/*    <table className="table">*/}
            {/*        <tbody>*/}
            {/*        <tr>*/}
            {/*            {books &&*/}
            {/*                books.map((book) => (*/}
            {/*                    <td key={book.book_id}>*/}
            {/*                        /!*todo: add a link to the book detail page*!/*/}
            {/*                        <img src={book.cover} alt={book.name} width="100" height="150"/>*/}
            {/*                        <p>{book.name}</p>*/}
            {/*                    </td>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </tr>*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
            {/*<pre>{JSON.stringify(books, null, 2)}</pre>*/}
        </div>
    );
}

export default Home;