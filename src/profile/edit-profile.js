import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {faXmark, faCamera, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  profileThunk,
  logoutThunk,
  updateUserThunk, findAllUsersThunk, updateUserForSelfThunk,
} from "../thunks/users-thunk";
import {useNavigate, useParams} from "react-router";
import {findUserById} from "../services/users-service";
import {Link} from "react-router-dom";

function EditProfileScreen() {
  const {userId} = useParams();
  const currentUser = useSelector((state) => state.users.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const [editDoB, setEditDoB] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    if (userId) {
      const user = await findUserById(userId);
      setProfile(user);
      return;
    }
    const response = await dispatch(profileThunk());
    setProfile(response.payload);
  };
  const loadScreen = async () => {
    // if (!profile) {
    await fetchProfile();
    // }
  };
  const updateProfile = async () => {
    await dispatch(updateUserThunk(profile));
  };

  const updateProfileForSelf = async () => {
    await dispatch(updateUserForSelfThunk(profile));
  };

  if (currentUser === null) {
    navigate('/Users/login');
  }
  if (currentUser.role !== 'ADMIN' && currentUser._id !== profile._id) {
    navigate(`/Users/profile/${userId}`);
  }

  useEffect(() => {
    dispatch(findAllUsersThunk());
    loadScreen();
  }, [userId]);

  return (
    <div>
      <div className="row align-items-center justify-content-start pb-2">
        <div className="col-1">
          {userId ?
            (<Link className="text-black" to={`/User/profile/${userId}`} title="cancel">
              <FontAwesomeIcon icon={faXmark} className="text-lg"/>
            </Link>) :
            (<Link className="text-black" to="/User/profile" title="cancel">
              <FontAwesomeIcon icon={faXmark} className="text-lg"/>
            </Link>)}
        </div>
        <div className="col-11">
          <span className="fs-5 fw-bold">Edit Profile</span>
          {userId ?
            (<Link to={`/User/profile/${userId}`}>
              <button className="rounded-pill float-end fw-bold bg-black text-white px-3 py-1"
                      onClick={updateProfile}>Update Other's profile
              </button>
            </Link>) :
            (<Link to="/User/profile">
              <button className="rounded-pill float-end fw-bold bg-black text-white px-3 py-1"
                      onClick={updateProfileForSelf}>Update
              </button>
            </Link>)
          }
        </div>
      </div>


      {profile && (
        <>
          <div>
            <img src={`/images/${profile.backgroundImage}`} className="w-100 dark-image" height={200} alt="banner"/>
            {/*<button className="rounded-circle position-relative btn-lg bg-dark bg-opacity-75 text-white icon-camera">
              <FontAwesomeIcon icon={faCamera}/></button>*/}
          </div>
          <div>
            <img src={`/images/${profile.avatarIcon}`}
                 className="rounded-circle img-thumbnail position-relative border-0 avatar" width={120} alt="avatar"/>
            {/*<button className="rounded-circle position-relative btn-lg bg-dark bg-opacity-75 text-white icon-camera-2">
              <FontAwesomeIcon icon={faCamera}/></button>*/}
          </div>
          <div className="form-group">
            <h2>Profile</h2>

            <div className="border ps-2 rounded-1 mb-2">
              <label className="text-secondary">Username</label>
              <input
                type="text"
                className="form-control"
                value={profile.username}
                onChange={(e) => {
                  setProfile({...profile, username: e.target.value});
                }}
              />
            </div>
            <div className="border ps-2 rounded-1 mb-2">
              <label className="text-secondary">Password</label>
              <input
                type="password"
                className="form-control"
                value={profile.password}
                onChange={(e) => {
                  setProfile({...profile, password: e.target.value});
                }}
              />
            </div>
            <div className="border ps-2 rounded-1 mb-2">
              <label className="text-secondary">First Name</label>
              <input
                type="text"
                className="form-control"
                value={profile.firstName}
                onChange={(e) => {
                  setProfile({...profile, firstName: e.target.value});
                }}
              />
            </div>
            <div className="border ps-2 rounded-1 mb-2">
              <label className="text-secondary">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={profile.lastName}
                onChange={(e) => {
                  setProfile({...profile, lastName: e.target.value});
                }}
              />
            </div>
            <div className="border ps-2 rounded-1 mb-2">
              <label className="text-secondary">Bio</label>
              <input
                type="text"
                className="form-control"
                value={profile.bio}
                onChange={(e) => {
                  setProfile({...profile, bio: e.target.value});
                }}
              />
            </div>
            <div>
              <div className="text-secondary">
                Birth date {'\u00B7'}
                {editDoB ?
                  <button className="border-0 bg-transparent" onClick={() => setEditDoB(false)}>Confirm</button> :
                  <button className="border-0 bg-transparent" onClick={() => setEditDoB(true)}>Edit</button>}
              </div>
              <div>
                {editDoB ? <input type="text" className="form-control" value={profile.dateOfBirth}
                                  onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}/> :
                  <div> {profile.dateOfBirth} </div>}
              </div>
            </div>

            {/*<div>
              <h3>{profile.username}</h3>
              <h3>{profile._id}</h3>
            </div>*/}
          </div>
        </>
      )}
    </div>
  );
}

export default EditProfileScreen;