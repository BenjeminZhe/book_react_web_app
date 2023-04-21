import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginThunk } from "../thunks/users-thunk";
import {Link} from "react-router-dom";

function LoginPage() {
  const { currentUser } = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async () => {
    try {
      await dispatch(loginThunk({ username, password }));
      navigate("/profile");
    } catch (err) {
      setError("Invalid Credentials. Please try again.");
    }
  };
  if(currentUser) {
    navigate("/profile");
  }
  return (
    <div>
      <h1>Login</h1>
      <h2 className="d-flex justify-content-center text-primary fw-bold mt-3 mb-2">Login</h2>
      {
        error &&
        <div className="alert alert-danger">
          {error}
        </div>
      }
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={login} className="btn btn-primary">
        Login
      </button>
      <div>
        Do not have an account? Please <Link to={"/register"}>sign up</Link> here!
      </div>
      <div>
        {currentUser && (
          <div>
            <h2>{currentUser.username}</h2>
            <h2>{currentUser.password}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
