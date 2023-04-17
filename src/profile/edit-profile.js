import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faXmark, faCamera, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  profileThunk,
  logoutThunk,
  updateUserThunk,
} from "../thunks/users-thunk";
import { useNavigate, useParams } from "react-router";
import { findLikesByUserId } from "../book/likes-service";
import { findUserById } from "../services/users-service";
import {
  userFollowsUser,
  userUnfollowsUser,
  findFollowsByFollowerId,
  findFollowsByFollowedId,
} from "../services/follows-service";
import { Link } from "react-router-dom";
import {getBook} from "../book/book-service";

function EditProfileScreen() {
  const { userId } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const [profile, setProfile] = useState(currentUser);
  const [likes, setLikes] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followCur, setFollowCur] = useState(false);
  const [bio, setBio] = useState("");
  const [editDoB, setEditDoB] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchFollowing = async () => {
    const following = await findFollowsByFollowerId(profile._id);
    setFollowing(following);
  };
  const fetchFollowers = async () => {
    const follows = await findFollowsByFollowedId(profile._id);
    setFollows(follows);
    if (follows.findIndex(user => user._id === currentUser._id) !== -1) {
      setFollowCur(true);
    }
  };
  const fetchLikes = async () => {
    const likes = await findLikesByUserId(profile._id);
    const newLikes = likes.map(like => {
        const image = fetchBook(like.bookId);
        return {...like, bookImage: image}
    });
    setLikes(newLikes);
  };

  const fetchBook = async (bookId) => {
    const response = await getBook(bookId);
    return response.data.cover;
  };

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
    await fetchLikes();
    await fetchFollowing();
    await fetchFollowers();
  };
  const followUser = async () => {
    await userFollowsUser(currentUser._id, profile._id);
    setFollowCur(true);
    const newFollows = follows.concat(currentUser);
    setFollows(newFollows);
  };
  const unFollowUser = async () => {
    await userUnfollowsUser(currentUser._id, profile._id);
    setFollowCur(false);
    const newFollows = follows.filter(user => user._id != currentUser._id);
    setFollows(newFollows);
  };
  const updateProfile = async () => {
    //await dispatch(updateUserThunk(profile));
  };

  useEffect(() => {
    loadScreen();
  }, [userId]);

  if (currentUser === null) {
    navigate('/login');
  }
  if (currentUser.role !== 'ADMIN' && currentUser._id !== profile._id) {
    navigate('/login');
  }

  return (
    <div>
      <div className="row align-items-center justify-content-start pb-2">
        <div className="col-1">
          <Link className="text-black" to="/tuiter/profile" title="cancel">
            <FontAwesomeIcon icon={faXmark} className="text-lg"/>
          </Link>
        </div>
        <div className="col-11">
          <span className="fs-5 fw-bold">Edit Profile</span>
          <Link to="/tuiter/profile"><button className="rounded-pill float-end fw-bold bg-black text-white px-3 py-1" onClick={updateProfile}>Update</button></Link>
        </div>
      </div>
      <div>
        <img src={`/images/${profile.backgroundImage}`} className="w-100 dark-image" height={200} alt="banner" />
        <button className="rounded-circle position-relative btn-lg bg-dark bg-opacity-75 text-white icon-camera"><FontAwesomeIcon icon={faCamera} /></button>
      </div>
      <div>
        <img src={`/images/${profile.avatarIcon}`} className="rounded-circle img-thumbnail position-relative border-0 avatar" width={120} alt="avatar" />
        <button className="rounded-circle position-relative btn-lg bg-dark bg-opacity-75 text-white icon-camera-2"><FontAwesomeIcon icon={faCamera} /></button>
      </div>
      <h1>
        {typeof userId !== undefined && !followCur && (<button onClick={followUser} className="btn btn-primary float-end">
        Follow
      </button>)}
        {typeof userId !== undefined && followCur && (<button onClick={unFollowUser} className="btn btn-primary float-end">
          UnFollow
        </button>)}
      </h1>

      {profile && (
        <div className="form-group">
          <h2>Profile</h2>

          <div className="border ps-2 rounded-1 mb-2">
            <label className="text-secondary">Username</label>
            <input
              type="text"
              readOnly={true}
              className="form-control"
              value={profile.username}
              onChange={(e) => {
                setProfile({ ...profile, username: e.target.value });
              }}
            />
          </div>
          <div className="border ps-2 rounded-1 mb-2">
            <label className="text-secondary">Password</label>
            <input
              type="password"
              readOnly={typeof userId !== undefined}
              className="form-control"
              value={profile.password}
              onChange={(e) => {
                setProfile({ ...profile, password: e.target.value });
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
                setProfile({ ...profile, firstName: e.target.value });
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
                setProfile({ ...profile, lastName: e.target.value });
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
                setProfile({ ...profile, bio: e.target.value });
              }}
            />
          </div>
          <div>
            <div className="text-secondary">
              Birth date {'\u00B7'}
              {editDoB ? <button className="border-0 bg-transparent" onClick={() => setEditDoB(false)}>Confirm</button> :
                <button className="border-0 bg-transparent" onClick={() => setEditDoB(true)}>Edit</button>}
            </div>
            <div>
              {editDoB ? <input type="text" className="form-control" value={profile.dateOfBirth} onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}/> :
                <div> {profile.dateOfBirth} </div>}
            </div>
          </div>

          <div>
            <h3>{profile.username}</h3>
            <h3>{profile._id}</h3>
          </div>
        </div>
      )}

      {follows && (
        <div>
          <h2>Followers</h2>
          <ul className="list-group d-flex flex-row">
            {follows.map((follow) => (
              <li className="list-group-item">
                <Link to={`/profile/${follow.follower._id}`}>
                  <img className="rounded-circle" height={48} src={follow.follower.avatarIcon} alt={""}/>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {following && (
        <div>
          <h2>Following</h2>
          <ul className="list-group d-flex flex-row">
            {following.map((follow) => (
              <li className="list-group-item">
                <Link to={`/profile/${follow.followed._id}`}>
                  <img className="rounded-circle" height={48} src={follow.followed.avatarIcon} alt={""}/>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        {currentUser && (
          <div>
            <h2>
              Welcome {currentUser.username} {currentUser._id}
            </h2>
          </div>
        )}
      </div>
      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch(logoutThunk());
          navigate("/login");
        }}
      >
        Logout
      </button>
      <div>
        <h2>Likes</h2>
        <ul className="list-group">
          {likes.map((like) => (
            <li className="list-group-item">
              <Link to={`/book/${like.bookId}`}>
                <h3>{like.bookId}</h3>
                <img
                  src={like.bookImage}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EditProfileScreen;