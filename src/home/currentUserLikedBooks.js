import {useEffect, useState} from "react";
import {findBooksLikedByUser} from "../services/likes-service";
import {searchBookById} from "../services/book-service";
import {Link} from "react-router-dom";

const CurrentUserLikedBooks = ({ currentUser }) => {
    const [likes, setLikes] = useState([]);
    //c
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await findBooksLikedByUser(currentUser._id);
                const books = await Promise.all(response.map(async (like) => {
                    const book = await searchBookById(like.book_id);
                    return book;
                }));

                setLikes(books);
            } catch (error) {
                console.error("Error fetching liked books:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="mt-5 pt-5">
            <h5 className="text-center">Books you liked</h5>
            <ul className="list-group list-group-flush">
                {likes.map((book) =>
                    // todo: link to detail page
                    <Link to={`/book/${book._id}`}>
                        <li className="list-group-item"
                            key={book._id}>
                            {book.name}
                        </li>
                    </Link>
                )}
                {likes.length === 0 &&
                    <li className="list-group-item text-center">No books liked</li>}
            </ul>
        </div>
    )
};

export default CurrentUserLikedBooks;



//
// function CurrentUserLikedBooks(currentUser) {
//     const dispatch = useDispatch();
//     const [likedBooks, setLikedBooks] = useState([]);
//
//     useEffect(() => {
//         const fetchBooksLikedByUser = async () => {
//             const result = await dispatch(findBooksLikedByUser(currentUser._id));
//             setLikedBooks(result.payload || []);
//         };
//         fetchBooksLikedByUser();
//     }, []);
//
//     return (
//         <div className="mt-5 pt-5">
//             <h5 className="text-center">Books you liked</h5>
//             <ul className="list-group list-group-flush">
//                 {likedBooks && likedBooks.map((book) =>
//
//                     <Link to={`/BookSearcher/book/${book._id}`}>
//                         <li className="list-group-item"
//                             key={book._id}>
//                             {book.name}
//                         </li>
//                     </Link>
//                 )}
//                 {likedBooks.length == 0 &&
//                     <li className="list-group-item text-center">No books liked</li>}
//             </ul>
//         </div>
//     )
// }
//
// export default CurrentUserLikedBooks;