import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginThunk} from "../thunks/users-thunk";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.users);
    const navigate = useNavigate();
    const login = async () => {
        const action = await dispatch(loginThunk({username, password}));
        if (action.payload && action.payload.loggedIn) {
            navigate('/BookSearcher/home');
        }else{
            setError("Invalid Credentials. Please try again.");
        }

    };
        return (
            <div>
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
                <button onClick={login} className="btn btn-primary mt-3">
                    Login
                </button>
                <div className="mt-2">
                    Do not have an account? Please
                    <Link to={"/BookSearcher/register"}> sign up</Link> here!
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

            // <div>
            //     <h1>Login</h1>
            //     <div className="form-group">
            //         <label>Username</label>
            //         <input
            //             type="text"
            //             className="form-control"
            //             value={username}
            //             onChange={(e) => {
            //                 setUsername(e.target.value);
            //             }}
            //         />
            //     </div>
            //     <div className="form-group">
            //         <label>Password</label>
            //         <input
            //             type="password"
            //             className="form-control"
            //             value={password}
            //             onChange={(e) => {
            //                 setPassword(e.target.value);
            //             }
            //             }
            //         />
            //     </div>
            //     <button className="mt-3 btn btn-primary"
            //             onClick={login}>Login
            //     </button>
            // </div>
        );

    }

    export default LoginScreen;