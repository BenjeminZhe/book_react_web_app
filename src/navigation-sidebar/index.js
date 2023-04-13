import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBook,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const NavigationSidebar = () => {
  const {pathname} = useLocation();
  const paths = pathname.split('/');
  const active = paths[2];
  return(
    <div className="list-group">
      <Link to="/home" className="list-group-item"><FontAwesomeIcon icon={faBook} className="pe-1"/></Link>
      <Link to="/home" className={`list-group-item
                    ${active === 'home'?'active':''}`}>
        <FontAwesomeIcon icon={faHome} className="pe-1"/>
        <span className={"d-none d-xl-inline"}>Home</span>
      </Link>
      <Link to="/search" className={`list-group-item
                    ${active === 'search'?'active':''}`}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="pe-1"/>
        <span className={"d-none d-xl-inline"}>Home</span>
      </Link>
      <Link to="/profile" className={`list-group-item
                    ${active === 'profile'?'active':''}`}>
        <FontAwesomeIcon icon={faUser} className="pe-1"/>
        <span className={"d-none d-xl-inline"}>Profile</span>
      </Link>
      <button width={120} className="btn btn-primary rounded-pill wd-tweet-button mt-2 w-100">Tweet</button>
    </div>
  );
};
export default NavigationSidebar;