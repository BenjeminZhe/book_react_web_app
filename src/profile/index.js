import {useSelector} from "react-redux";
import React from "react";
function Profile() {
    const {currentUser} = useSelector((state) => state.users);
    return (
        <div>
            <h1>Profile</h1>
            <h2>{currentUser && currentUser.username}</h2>

        </div>
    );

}

export default Profile;
