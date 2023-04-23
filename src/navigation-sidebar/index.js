import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import CurrentUserLikedBooks from "../home/currentUserLikedBooks";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../thunks/users-thunk";

function NavigationSidebar() {
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const paths = pathname.split('/');
    const active = paths[2];
    return (
        <>
            <div className="list-group mt-3 text-center">
                <h2 className="list-group-item fw-bold">Book Searcher</h2>
                <Link to="/BookSearcher/home" className={`list-group-item ${active === 'home'?'active':''}`}>
                    <i className="bi bi-house-door-fill text-dark pe-1" ></i>
                    Home
                </Link>
                {!currentUser &&
                    <Link to="/User/register" className={`list-group-item ${active === 'register'?'active':''}`}>
                        <i className="bi bi-person-plus-fill text-dark pe-1"></i>
                        Register
                    </Link>
                }
                {!currentUser &&
                    <Link to="/User/login" className={`list-group-item ${active === 'login'?'active':''}`}>
                        <i className="bi bi-box-arrow-in-right text-dark pe-1"></i>
                        Login
                    </Link>
                }
                <Link to="/BookSearcher/search" className={`list-group-item ${active === 'search'?'active':''}`}>
                    <i className="bi bi-hash text-dark pe-1"></i>
                    Search
                </Link>
                {currentUser &&
                    <Link to="/User/profile" className={`list-group-item ${active === 'profile'?'active':''}`}>
                        <i className="bi bi-person-fill text-dark pe-1"></i>
                        Profile
                    </Link>
                }
                {currentUser && currentUser.role === 'ADMIN'
                  && <Link to="/User/admin" className={`list-group-item ${active === 'admin'?'active':''}`}>
                        <i className="bi bi-person-badge-fill text-dark pe-1"></i>
                        Admin
                     </Link>
                }
                {currentUser && currentUser.role === 'AUTHOR'
                  && <Link to="/User/author" className={`list-group-item ${active === 'author'?'active':''}`}>
                      <i className="bi bi-pencil-fill text-dark pe-1"></i>
                      Author
                  </Link>}
                {currentUser &&
<<<<<<< HEAD
                    <Link to="/User/logout" className={`list-group-item ${active === 'logout'?'active':''}`}>
=======
                    <button
                        onClick={() => {
                            dispatch(logoutThunk());
                            navigate("/BookSearcher/home");
                        }}
                        className={`list-group-item ${active === 'logout'?'active':''}`}>
>>>>>>> yuanmanhong
                        <i className="bi bi-box-arrow-right text-dark pe-1"></i>
                        Logout
                    </button>
                }
            </div>
            {currentUser && paths[2] === "home" &&
                <CurrentUserLikedBooks
                    currentUser={currentUser}
                />}
        </>
    );
}

export default NavigationSidebar;
