import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import {deleteUserThunk} from "../thunks/users-thunk";

const AdminPageItem = (

  {
    user = { id: '123', userName: 'NASA', handle: 'NASA', avatarIcon: 'nasa-logo.jpeg' }
  }
) => {
  const dispatch = useDispatch();
  const id = user.id;
  const deleteUser = () => {
    dispatch(deleteUserThunk(id));
  };
  return(
    <li className="list-group-item">
      <div className="row">
        <div className="col-2">
          <img className="rounded-circle" height={48} src={`/images/${user.avatarIcon}`} alt={""}/>
        </div>
        <div className="col-8">
          <div className="fw-bold">
            <span className="pe-1">{user.userName}</span>
            <FontAwesomeIcon icon={faCheckCircle} />
            {/*<FontAwesomeIcon icon="fa-solid fa-check-circle"/>*/}
          </div>
          <div>@{user.handle}</div>
        </div>
        <div className="col-2">
          <button className="btn btn-primary rounded-pill float-end" onClick={deleteUser}>Delete user</button>
        </div>
      </div>
    </li>
  );
};
export default AdminPageItem;