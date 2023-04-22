import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBook } from "./book-service";
import { useSelector } from "react-redux";
import { userLikesBook } from "./likes-service";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import ReviewList from "./review-list";
import LikeBook from "./like";

function BookDetailsScreen() {

    // const { currentUser } = useSelector((state) => state.users);

    var { id } = useParams();
    console.log("id is ", id);
    const {currentUser} = useSelector((state) => state.users);
    const [book, setBook] = useState({
        name: "loading...",
        // authors:"loading..."
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
        <div class="container">
            <div>
                <h2>{book.name}</h2>
                <img src={`${book.cover}`} className="wd-book-cover"/>
                <h5>Author(s): {book.authors}</h5>
                <h5>Rating: {book.rating}</h5>
                <br/>

                <div>
                    {(<LikeBook />)}
                </div>


                <div className="container">
                {/* currentUser && currentUser.role === "USER" &&  */}
                    {(<ReviewList />)}
                </div>

            

                {/*{currentUser && (*/}
                {/*    <div>*/}
                {/*        <button onClick={likeBook} className="btn btn-success">*/}
                {/*            Like*/}
                {/*        </button>*/}
                {/*        <button className="btn btn-danger">Unlike</button>*/}
                {/*    </div>*/}
                {/*)}*/}
                <br/>

                <h5>Pages: {book.pages}</h5>
                <h5>Published Date: {book.published_date}</h5>
                <h5>Synopsis: </h5> <h7 class="wd-text-general">{book.synopsis}</h7>

            </div>
        </div>
    );
}

export default BookDetailsScreen;