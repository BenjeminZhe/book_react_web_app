import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
function LoginItemHandle() {
  const currentUser = useSelector((state) => state.users.currentUser);
  if (currentUser === null) {
    return (
      <div>
        <button><Link to="/login"><span className={"d-none d-xl-inline"}>Log In</span></Link></button>
        <button><Link to="/register"><span className={"d-none d-xl-inline"}>Register</span></Link></button>
      </div>
    );
  } else {
    return (
      <div>
        <button><Link to="/home"><span className={"d-none d-xl-inline"}>Log out</span></Link></button>
        {currentUser.role === 'ADMIN' && <button><Link to="/admin"><span className={"d-none d-xl-inline"}>Log out</span></Link></button>}
      </div>
    )
  }
}

export default LoginItemHandle;