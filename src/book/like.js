import React, { useState } from 'react';
import {useSelector} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import {useParams } from "react-router-dom";
import {userLikesBook, userUnLikesBook} from "./likes-service";

function LikeBook() {
  const [isLiked, setIsLiked] = useState(false);
  
  var { id } = useParams();

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