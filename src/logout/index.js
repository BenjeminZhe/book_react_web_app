import {useDispatch} from "react-redux";
import {logoutThunk} from "../thunks/users-thunk";
import {useNavigate} from "react-router-dom";

function LogOutScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function logout() {
    const action = dispatch(logoutThunk());
  };
  return (
    <>
      <h2>Are you sure to log out?</h2>
      <div>
        <button onClick={() => {logout(); navigate('/BookSearcher/home');}} className="btn btn-danger mt-3 me-2">
          Confirm
        </button>
        <button onClick={() => navigate('/BookSearcher/home')} className="btn btn-primary mt-3">
          Cancel
        </button>
      </div>
    </>
  );
}

export default LogOutScreen;