import React from "react";
import {Link, useLocation} from "react-router-dom";
import CurrentUserLikedBooks from "../home/currentUserLikedBooks";
import {useSelector} from "react-redux";

function NavigationSidebar() {
    const currentUser = useSelector((state) => state.users.currentUser);
    const {pathname} = useLocation();
    const paths = pathname.split('/');
    // console.log(paths);
    return (
        <>
            <div className="list-group mt-3">
                <h2 className="list-group-item fw-bold">Book Searcher</h2>
                <Link to="/BookSearcher/home" className={`list-group-item `}>
                    <i className="bi bi-house-door-fill text-dark pe-1 "></i>
                    Home
                </Link>
                {!currentUser &&
                    <Link to="/BookSearcher/register" className={`list-group-item`}>
                        <i className="bi bi-person-plus-fill text-dark pe-1"></i>
                        Register
                    </Link>
                }
                {!currentUser &&
                    <Link to="/BookSearcher/login" className={`list-group-item`}>
                        <i className="bi bi-box-arrow-in-right text-dark pe-1"></i>
                        Login
                    </Link>
                }
                <Link to="/BookSearcher/search" className={`list-group-item`}>
                    <i className="bi bi-hash text-dark pe-1"></i>
                    Search
                </Link>
                {currentUser &&
                    <Link to="/BookSearcher/profile" className={`list-group-item`}>
                        <i className="bi bi-person-fill text-dark pe-1"></i>
                        Profile
                    </Link>
                }
                {currentUser &&
                    <Link to="/BookSearcher/logout" className={`list-group-item`}>
                        <i className="bi bi-box-arrow-right text-dark pe-1"></i>
                        Logout
                    </Link>
                }
            </div>
            {currentUser && paths[2] === "home" &&
                <CurrentUserLikedBooks/>}
        </>
    );
}

export default NavigationSidebar;
