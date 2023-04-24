import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {
  profileThunk,
  logoutThunk,
} from "../thunks/users-thunk";
import { useNavigate} from "react-router";
import { findBooksLikedByUser } from "../services/likes-service";
import {searchBookById} from "../services/book-service";
import {
  findFollowsByFollowerId,
  findFollowsByFollowedId,
} from "../services/follows-service";
import { Link } from "react-router-dom";

function ProfileScreen() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const [likes, setLikes] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follows, setFollows] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchFollowing = async () => {
    const response = await findFollowsByFollowerId(profile._id);
    const following = response.map(fol => fol.followed).filter(follow => follow !== null);
    setFollowing(following);
  };
  const fetchFollowers = async () => {
    const response = await findFollowsByFollowedId(profile._id);
    const followers = response.map(fol => fol.follower).filter(follow => follow !== null);;
    setFollows(followers);
  };
  const fetchLikes = async () => {
    try {
      const response = await findBooksLikedByUser(currentUser._id);
      const books = await Promise.all(response.map(async (like) => {
        const book = await searchBookById(like.book_id);
        return book;
      }));
      setLikes(books);
    } catch (error) {
      console.error("Error fetching liked books:", error);
    }
  };

  const fetchProfile = async () => {
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

  if (currentUser === null) {
    navigate('/User/login');
  }

  useEffect(() => {
    loadScreen();
  }, []);

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

      {profile && (
        <>
          <img src={`/images/${profile.backgroundImage}`} className="w-100 pb-2" height={200} alt="banner" />
          <img src={`/images/${profile.avatarIcon}`} className="rounded-circle img-thumbnail img-fluid position-relative border-0 profile-pic" width={120} alt="banner" />
          <Link to="/User/edit-profile" title="edit"><button className="rounded-pill float-end fw-bold border border-gray bg-transparent px-3 py-1">Edit Profile</button></Link>
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

            {/*<div>
              <h3>{profile.username}</h3>
              <h3>{profile._id}</h3>
            </div>*/}
          </div>
        </>
      )}

      {follows && (
        <div>
          <h2>Followers</h2>
          <ul className="list-group d-flex flex-row">
            {follows.map((follow) => (
              <li className="list-group-item">
                <Link to={`/User/profile/${follow._id}`}>
                  <img className="rounded-circle img-thumbnail img-fluid position-relative border-0" height={48} src={`/images/${follow.avatarIcon}`} alt={"Image not available"}/>
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
                <Link to={`/User/profile/${follow._id}`}>
                  <img className="rounded-circle img-thumbnail img-fluid position-relative border-0" height={48} src={`/images/${follow.avatarIcon}`} alt={"Image not available"}/>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>Likes</h2>
        <ul className="list-group">
          {likes.map((like) => (
            <li className="list-group-item">
              <Link to={`/book/${like._id}`}>
                <h3>{like.name}</h3>
              </Link>
              <img
                src={like.cover} alt={"alter image"}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileScreen;
