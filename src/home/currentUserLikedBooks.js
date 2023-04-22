import {useDispatch} from "react-redux";
import {findBooksLikedByUser} from "../services/likes-service";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function CurrentUserLikedBooks(currentUser) {
    const dispatch = useDispatch();
    const [likedBooks, setLikedBooks] = useState([]);

    useEffect(() => {
        const fetchBooksLikedByUser = async () => {
            const result = await dispatch(findBooksLikedByUser(currentUser._id));
            setLikedBooks(result.payload || []);
        };
        fetchBooksLikedByUser();
    }, []);

    return (
        <div className="mt-5 pt-5">
            <h5 className="text-center">Books you liked</h5>
            <ul className="list-group list-group-flush">
                {likedBooks && likedBooks.map((book) =>
                    // todo: link to detail page
                    <Link to={`/BookSearcher/book/${book._id}`}>
                        <li className="list-group-item"
                            key={book._id}>
                            {book.name}
                        </li>
                    </Link>
                )}
                {likedBooks.length == 0 &&
                    <li className="list-group-item text-center">No books liked</li>}
            </ul>
        </div>
    )
}

export default CurrentUserLikedBooks;