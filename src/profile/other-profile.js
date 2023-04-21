import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
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

function OtherProfileScreen() {
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.users.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const [likes, setLikes] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follows, setFollows] = useState([]);
  const [followCur, setFollowCur] = useState(false);
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
    const user = await findUserById(userId);
    setProfile(user);
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
    if (currentUser === null) {
      navigate('/login');
    }
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

  if (typeof userId !== undefined) {
    navigate('/profile');
  }

  if (currentUser._id === profile._id) {
    navigate('/profile');
  }

  useEffect(() => {
    loadScreen();
  });

  return (
    <div>
      <div className="row align-items-center justify-content-start">
        <div className="col-auto">
          <button className="border-0 bg-transparent" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
        <div className="col-10">
          <div className="fw-bold fs-5 text-black">My Profile</div>
        </div>
      </div>
      <img src={`/images/${profile.backgroundImage}`} className="w-100 pb-2" height={200} alt="banner" />
      <img src={`/images/${profile.avatarIcon}`} className="rounded-circle img-thumbnail img-fluid position-relative border-0 profile-pic" width={120} alt="banner" />
      {currentUser && currentUser.role === 'ADMIN' && (<Link to="/tuiter/edit-profile" title="edit"><button className="rounded-pill float-end fw-bold border border-gray bg-transparent px-3 py-1">Edit Profile</button></Link>)}
      <h1>
        {!followCur && (<button onClick={followUser} className="btn btn-primary float-end">
          Follow
        </button>)}
        {typeof userId !== undefined && followCur && (<button onClick={unFollowUser} className="btn btn-primary float-end">
          UnFollow
        </button>)}
      </h1>

      {profile && (
        <div className="form-group">
          <h2>Profile</h2>
          <div className="ms-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item w-75"><div className="fw-bold text-secondary">User Name:<span className="text-dark ps-2">{profile.username}</span></div></li>
              <li className="list-group-item w-75"><div className="fw-bold text-secondary">Email:<span className="text-dark ps-2">{profile.email}</span></div></li>
              <li className="list-group-item w-75"><div className="fw-bold text-secondary">Last Name:<span className="text-dark ps-2">{profile.lastName}</span></div></li>
              <li className="list-group-item w-75"><div className="fw-bold text-secondary">First Name:<span className="text-dark ps-2">{profile.firstName}</span></div></li>
              <li className="list-group-item w-75"><div className="fw-bold text-secondary">Birthday:<span className="text-dark ps-2">{profile.dateOfBirth}</span></div></li>
              <li className="list-group-item w-75"><div className="fw-bold text-secondary">Join Date:<span className="text-dark ps-2">{profile.joinDate}</span></div></li>
              <li className="list-group-item w-75"><div className="fw-bold text-secondary">Role:<span className="text-dark ps-2">{currentUser.role}</span></div></li>
              <li className="list-group-item w-75"><div className="fw-bold text-secondary">Bio:<span className="text-dark ps-2">{currentUser.bio}</span></div></li>
            </ul>
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
              </Link>
              <img
                src={like.bookImage}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OtherProfileScreen;