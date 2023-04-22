import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { findAllUsersThunk } from "../thunks/users-thunk";
import AdminPageItem from "./admin-page-item";
import {Link} from "react-router-dom";

function AdminScreen() {
  const { currentUser, users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    navigate('/User/login');
  }
  useEffect(() => {
    dispatch(findAllUsersThunk());
  }, []);
  return (
    <div>
      <h1>Admin</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <h3>All users</h3>
        </li>
        {users &&
          users.map((user) =>
            <Link to={`/User/profile/${user.userName}`}> <AdminPageItem user={user}/> </Link>
          )}
      </ul>
    </div>
  );
}

export default AdminScreen;