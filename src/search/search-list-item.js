import "./index.css";
import {Link} from "react-router-dom";
import SearchListItemStats from "./search-list-item-stats";
import React from "react";


const SearchListItem = ({book}) => {
    {
        console.log(11)
    }

    function getAuthors(authors) {
        if (authors.length > 2)
            return (`${authors[0]}, ${authors[1]} ...`)
        else if (authors.length === 2)
            return (`${authors[0]}, ${authors[1]}`)
        else
            return (`${authors[0]}`)

    }

    return (

        <div className="card col mt-3">
            <div className="row rowSize">
                <div className="ms-5 col-md-2">
                    <img className="pt-2 pb-2 img-fluid coverSize" width="100" height="150" src={book.cover}
                         alt={book.name}/>
                </div>
                <div className="card-body col-sm-3 col-md-7 ms-md-2">
                    {/*todo: link to detail page*/}
                    <Link to={`XXX`} className="text-decoration-none text-dark">
                        <h5 className="card-title">{book.name}</h5>
                        <div className="card-text mt-4">
                            {getAuthors(book.authors)}
                        </div>
                    </Link>
                    <div className="card-text float-end  me-4 mt-3">
                        <SearchListItemStats
                            book_id={book.book_id}
                            book={book}/>
                    </div>
                </div>

                {/*<div className="col-md-2">*/}
                {/*    <search-list-item-stats*/}
                {/*        book_id={book.book_id}*/}
                {/*        book={book} />*/}
                {/*</div>*/}
            </div>

            {/*<div className="card-footer">*/}
            {/*    <small className="text-muted">Last updated 3 mins ago</small>*/}
            {/*</div>*/}
        </div>

    )
}


export default SearchListItem;