// retrieve current user
import {useEffect, useState} from "react";
import {findBooksLikedByUser} from "../services/likes-service";
import {UserUnlikesBookThunk, UserLikesBookThunk} from "../thunks/likes-thunk";
import {useDispatch, useSelector} from "react-redux";


const SearchListItemStats = ({book}) => {
    const [liked, setLiked] = useState(false);
    const {currentUser} = useSelector((state) => state.users);
    useEffect(() => {
        const checkIfLiked = async () => {
            const response = await findBooksLikedByUser(currentUser._id);
            const likes = response.filter(likedbook => likedbook.book_id === book.book_id);
            if (likes.length > 0) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        };
        checkIfLiked();
    }, []);

    const dispatch = useDispatch();
    const updateLikesHandler = async () => {
        if (currentUser) {
            if (liked) {
                await dispatch(UserUnlikesBookThunk(book.book_id));
                setLiked(false);
            } else {
                await dispatch(UserLikesBookThunk(book.book_id));
                setLiked(true);
            }
        }else{
            alert("Please login to like the book");
        }

    }

    return (
        <a className="text-decoration-none" href="#">

            <i className={`pe-0 bi bi-heart ${liked ? 'text-danger' : 'text-muted'}`}
               onClick={updateLikesHandler}
            ></i>
        </a>

    )
}

export default SearchListItemStats;