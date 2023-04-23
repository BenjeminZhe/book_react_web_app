import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import {useParams } from "react-router-dom";
import {userLikesBook, userUnLikesBook, findBooksLikedByUser} from "./likes-service";


function LikeBook() {
  const [isLiked, setIsLiked] = useState(false);
  
  var { id } = useParams();
  const fetchBookLikedByUser= async () => {
    const response = await findBooksLikedByUser('unknown')
    for (const res of response) {
      if (id == res.book_id){
        setIsLiked(true)
      }
    }
}

useEffect(() => {
  fetchBookLikedByUser()
}, []);

  const handleLikeClick = () => {
    if (!isLiked) {
      userLikesBook(id)
    } else {
      userUnLikesBook(id)
    }
    setIsLiked(!isLiked);
  };

  return (
    <div class="ms-2">  
      <button onClick={handleLikeClick} className="btn btn-primary">{isLiked ? 'Unlike' : 'Like'}</button>
      <p class="mt-2">{isLiked ? 'You liked this book!' : 'You have not liked this book.'}</p>
    </div>
  );
}

export default LikeBook;