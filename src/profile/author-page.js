import {useSelector} from "react-redux";
import React from "react";
function AuthorScreen() {
  const {currentUser} = useSelector((state) => state.users);
  return (
    <div>
      <h1>Author Screen</h1>
    </div>
  );

}

export default AuthorScreen;