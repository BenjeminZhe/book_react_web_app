import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import {deleteUserThunk} from "../thunks/users-thunk";

const AdminPageItem = (

  {
    user = { _id: '123', username: 'NASA', avatarIcon: 'nasa-logo.jpeg' }
  }
) => {
  const dispatch = useDispatch();
  const id = user._id;
  const deleteUser = () => {
    dispatch(deleteUserThunk(id));
  };
  return(
    <li className="list-group-item">
      <div className="row">
        <div className="col-2 col-lg-1">
          <img src={`/images/${user.avatarIcon}`} className="rounded-circle img-thumbnail img-fluid position-relative border-0" height={48} alt={""}/>
        </div>
        <div className="col-6 col-md-7 col-xl-9">
          <div className="fw-bold">
            <span className="pe-1">{user.username}</span>
            <FontAwesomeIcon icon={faCheckCircle} />
            {/*<FontAwesomeIcon icon="fa-solid fa-check-circle"/>*/}
          </div>
          <div>@{user.username}</div>
        </div>
        <div className="col-4 col-md-3 col-xl-2">
          <button className="btn btn-primary rounded-pill float-end" onClick={deleteUser}>Delete user</button>
        </div>
      </div>
    </li>
  );
};
export default AdminPageItem;