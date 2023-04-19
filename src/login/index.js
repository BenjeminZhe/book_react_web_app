import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginThunk} from "../thunks/users-thunk";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function LoginScreen(){
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const navigate = useNavigate();
    const login = () => {
        dispatch(loginThunk({username, password}));
        navigate('/BookSearcher/home');
    }
    return(
        <div>
            <h1>Login</h1>
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
                    }
                    }
                />
        </div>
        <button className="mt-3 btn btn-primary"
                onClick={login}>Login</button>
        </div>
    );

}

export default LoginScreen;