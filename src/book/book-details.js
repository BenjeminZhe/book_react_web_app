import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBook } from "./book-service";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import ReviewList from "./review-list";
import LikeBook from "./like";

function BookDetailsScreen() {

    var { id } = useParams();
    console.log("id is ", id);
    const {currentUser} = useSelector((state) => state.users);
    const [book, setBook] = useState({
    });
    

    const fetchBook = async () => {
        const response = await getBook(id);
        if (!response.error) {
            setBook(response);
        }
    };

    useEffect(() => {
        fetchBook();
    }, []);

    return (
        <div class="container">
            <div>
                <h2>{book.name}</h2>
                <img src={`${book.cover}`} className="wd-book-cover"/>
                <h5>Author(s): {book.authors}</h5>
                <h5>Rating: {book.rating}</h5>
                <br/>

                {currentUser && currentUser.role === "USER" &&(
                    <div>
                        {(<LikeBook />)}
                    </div>
                )}

                {currentUser && currentUser.role === "USER" &&(
                    <div className="container">
                        {(<ReviewList />)}
                    </div>
                )}

                <br/>
                <h5>Pages: {book.pages}</h5>
                <h5>Published Date: {book.published_date}</h5>
                <h5>Synopsis: </h5> <h7 class="wd-text-general">{book.synopsis}</h7>

            </div>
        </div>
    );
}

export default BookDetailsScreen;