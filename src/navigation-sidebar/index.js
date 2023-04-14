import React from "react";
import {Link, useLocation} from "react-router-dom";

function NavigationSidebar() {
    const {pathname} = useLocation();
    const paths = pathname.split('/');
    // console.log(paths);
    return (
        <div className="list-group mt-3">
            <div className="list-group-item fw-bold">Book Searcher</div>

            <Link to="/BookSearcher/home" className={`list-group-item `}>
                <i className="bi bi-house-door-fill text-dark pe-1 "></i>
                Home
            </Link>
            <Link to="/BookSearcher/signup" className={`list-group-item`}>
                <i className="bi bi-person-plus-fill text-dark pe-1"></i>
                Sign Up
            </Link>
            <Link to="/BookSearcher/login" className={`list-group-item`}>
                <i className="bi bi-box-arrow-in-right text-dark pe-1"></i>
                Login
            </Link>
            <Link to="/BookSearcher/search" className={`list-group-item`}>
                <i className="bi bi-hash text-dark pe-1"></i>
                Search
            </Link>
        </div>
    );
}

export default NavigationSidebar;



// import React from "react";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faUser,
//   faBook,
//   faMagnifyingGlass
// } from '@fortawesome/free-solid-svg-icons';
// import {Link} from "react-router-dom";
// //import {useLocation} from "react-router";
//
// const NavigationSidebar = () => {
//   // const {pathname} = useLocation();
//   // const paths = pathname.split('/');
//   // const active = paths[2];
//   return(
//     <div className="list-group">
//       <Link to="/home" className="list-group-item"><FontAwesomeIcon icon={faBook} className="pe-1"/></Link>
//       {/*<Link to="/home" className={`list-group-item*/}
//       {/*              ${active === 'home'?'active':''}`}>*/}
//
//         <Link to="/home" className={`list-group-item`}>
//
//         <FontAwesomeIcon icon={faHome} className="pe-1"/>
//         <span className={"d-none d-xl-inline"}>Home</span>
//       </Link>
//
//       {/*<Link to="/search" className={`list-group-item*/}
//       {/*              ${active === 'search'?'active':''}`}>*/}
//         <Link to="/search" className={`list-group-item`}>
//
//         <FontAwesomeIcon icon={faMagnifyingGlass} className="pe-1"/>
//         <span className={"d-none d-xl-inline"}>Home</span>
//       </Link>
//       {/*<Link to="/profile" className={`list-group-item*/}
//       {/*              ${active === 'profile'?'active':''}`}>*/}
//         <Link to="/profile" className={`list-group-item`}>
//         <FontAwesomeIcon icon={faUser} className="pe-1"/>
//         <span className={"d-none d-xl-inline"}>Profile</span>
//       </Link>
//       {/*<button width={120} className="btn btn-primary rounded-pill wd-tweet-button mt-2 w-100">Tweet</button>*/}
//     </div>
//   );
// };
// export default NavigationSidebar;