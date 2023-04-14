import "./index.css";
import {Link} from "react-router-dom";


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
            <Link to={`/search/${book.book_id}`} className="text-decoration-none text-dark">
                <div className="row rowSize">
                    <div className="col-md-3">
                        <img className="ms-5 pt-2 pb-2 img-fluid coverSize" src={book.cover} alt={book.name}/>
                    </div>
                    <div className="card-body col-md-9">
                        <h5 className="card-title">{book.name}</h5>
                        <div className="card-text">
                            {getAuthors(book.authors)}
                        </div>
                    </div>

                </div>
            </Link>
            {/*<div className="card-footer">*/}
            {/*    <small className="text-muted">Last updated 3 mins ago</small>*/}
            {/*</div>*/}
        </div>

    )
}


export default SearchListItem;