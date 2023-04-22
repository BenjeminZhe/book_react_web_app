import React, { useState } from 'react';
import {useSelector} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

function LikeBook() {
  const [isLiked, setIsLiked] = useState(false);
  
  const {currentUser} = useSelector((state) => state.users);
  const id = 1234;

  const handleLikeClick = () => {
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