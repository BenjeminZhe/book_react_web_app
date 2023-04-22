import {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "../thunks/users-thunk.js";
import {useNavigate} from "react-router";

const RegisterPage = () => {
    const {currentUser} = useSelector((state) => state.users);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [adminInvitationCode, setAdminInvitationCode] = useState('');
    const [validatePassword, setValidatePassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = "ADMIN";
    const adminCode = "myBestBook";
    const dateOfBirth = '01/01/1970';
    const avatarIcon = '/images/my-great-books-logo.png';
    const backgroundImage = '/images/work-life-balance.jpeg';
    const bio = 'Please introduce yourself!';

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    const joinDate = mm + '/' + dd + '/' + yyyy;

    const handleRegisterBtn = () => {
        if (username.length === 0 || firstName.length === 0 ||
            lastName.length === 0 || email.length === 0 ||
            password.length === 0 || validatePassword.length === 0) {
            setError('Required field cannot be empty')
            return
        }
        if (!email.includes('@')) {
            setError('Invalid email address!');
            return
        }
        if (password.length < 6) {
            setError('Password needs to be at least 6 characters')
            return
        }
        if (password !== validatePassword) {
            setError('Passwords must match')
            return
        }
        if (role.length === 0) {
            setError("Please select a role")
            return
        }
        if (role === admin) {
            if (adminInvitationCode.length === 0) {
                setError("Admin code cannot be empty")
                return
            }
            if (adminInvitationCode !== adminCode) {
                setError("Your admin code is invalid")
                return
            }
        }
        const newUser = {username, firstName, lastName, email, password, role, dateOfBirth, joinDate, avatarIcon, backgroundImage, bio};
        setError(null);
        dispatch(registerThunk(newUser));
    }
    if(currentUser) {
        navigate("/BookSearcher/home");
    }

    return(
        <>
            <h2 className="d-flex justify-content-center text-primary fw-bold mt-3 mb-2">Register</h2>
            {
                error &&
                <div className="alert alert-danger mb-2">
                    {error}
                </div>
            }
            {
                currentUser &&
                <div className="alert alert-success mb-2">
                    You have been registered as {currentUser.username}
                </div>
            }
            <div className="d-flex justify-content-center text-primary mb-2">Sign up for free</div>
            <label className="ms-2 fs-6 fw-bold">Username *</label>
            <input className="form-control mb-2"
                   value={username}
                   type="text"
                   placeholder="Username"
                   onChange={(e) => setUsername(e.target.value)}/>
            <label className="ms-2 fs-6 fw-bold">Firstname *</label>
            <input className="form-control mb-2"
                   value={firstName}
                   type="text"
                   placeholder="FirstName"
                   onChange={(e) => setFirstName(e.target.value)}/>
            <label className="ms-2 fs-6 fw-bold">Lastname *</label>
            <input className="form-control mb-2"
                   value={lastName}
                   type="text"
                   placeholder="Lastname"
                   onChange={(e) => setLastName(e.target.value)}/>
            <label className="ms-2 fs-6 fw-bold">Email *</label>
            <input className="form-control mb-2"
                   value={email}
                   type="text"
                   placeholder="Email"
                   onChange={(e) => setEmail(e.target.value)}/>
            <label className="ms-2 fs-6 fw-bold">Password *</label>
            <input
                className="form-control mb-2"
                value={password}
                type="text"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}/>
            <label className="ms-2 fs-6 fw-bold">Confirm your password *</label>
            <input
                className="form-control mb-2"
                value={validatePassword}
                type="text"
                placeholder="Validate Password"
                onChange={(e) => setValidatePassword(e.target.value)}/>
            <div className="mb-2">
                <label className="ms-2 fs-6 fw-bold me-2">Choose a role *</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="" selected></option>
                    <option value="AUTHOR" selected>AUTHOR</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <label className="ms-2 fs-6 fw-bold text-muted">Please enter your admin code if you choose ADMIN as role</label>
            <input
                className="form-control mb-2"
                value={adminInvitationCode}
                type="text"
                placeholder="Admin Invitation Code"
                onChange={(e) => setAdminInvitationCode(e.target.value)}/>
            <button onClick={handleRegisterBtn}
                    className="btn btn-primary w-100 mb-2">
                Register
            </button>
            <div className="d-flex justify-content-center text-primary mb-2">
                <label className="mt-1">Have an account?</label>
                <Link className="ms-1 mt-1" to="/BookSearcher/login">Login</Link>
            </div>
            <div className="ms-2 fs-6 fw-bold text-danger">Fields with * are require field</div>
        </>
    )
}

export default RegisterPage;