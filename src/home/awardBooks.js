import {Link} from "react-router-dom";
import React from "react";


const AwardBooksComponent = () => {
    return(
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
    )
}