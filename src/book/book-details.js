import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBook } from "./book-service";
import { useSelector } from "react-redux";
import { userLikesBook } from "./likes-service";

function BookDetailsScreen() {
    var { id } = useParams();
    id = "56597885"
    const [book, setBook] = useState({
        name: "adsf",
        authors:"asdf"
    });
    // const likeBook = async () => {
    //     const response = await userLikesBook(currentUser._id, id);
    //     console.log(response);
    // };
    const fetchBook = async () => {
        const response = await getBook(id);
        setBook(response);
    };

    useEffect(() => {
        fetchBook();
    }, []);

    return (
        <div>
            <h2>{book.name}</h2>
            <h4>Author(s): {book.authors}</h4>

            {/*{currentUser && (*/}
            {/*    <>*/}
            {/*        <button onClick={likeBook} className="btn btn-success">*/}
            {/*            Like*/}
            {/*        </button>*/}
            {/*        <button className="btn btn-danger">Unlike</button>*/}
            {/*    </>*/}
            {/*)}*/}
            <br />

            <img
                src={`${book.cover}`} class = "wd-book-cover"
            />
            <h4>Rating: {book.rating}</h4>
            <h4>Pages: {book.pages}</h4>
            <h4>Published Date: {book.published_date}</h4>
            <h6>Synopsis: {book.synopsis}</h6>

            <pre>{JSON.stringify(book, null, 2)}</pre>
        </div>
    );
}

export default BookDetailsScreen;