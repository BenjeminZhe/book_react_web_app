import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import NavigationSidebar from "./navigation-sidebar";
import HomeComponent from "./home";
import SearchComponent from "./search";
import ProfileComponent from "./profile"
import EditProfile from "./profile/edit-profile";
import LoginPage from "./login";
import RegisterPage from "./register";
import usersReducer from "./reducers/users-reducer";
import LoginItemHandle from "./login/login-item-handle";
import AdminScreen from "./profile/admin-page";

//import './App.css';
const store = configureStore({
  reducer: {
    users: usersReducer,
  }
})

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="row mt-2">
          <LoginItemHandle class="float-right"/>
          <div className="col-2 col-md-2 col-lg-1 col-xl-2">
            <NavigationSidebar active="home"/>
          </div>
          <div className="col-10 col-md-10 col-lg-11 col-xl-10"
               style={{"position": "relative"}}>
            <Routes>
              <Route index element={<HomeComponent/>} />
              <Route path="/home"    element={<HomeComponent/>}/>
              <Route path="/search" element={<SearchComponent/>}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminScreen />} />
              <Route path="/profile" element={<ProfileComponent/>}/>
              <Route path="/profile/:userId" element={<ProfileComponent/>}/>
              <Route path="/edit-profile" element={<EditProfile/>}/>
              <Route path="/edit-profile/:userId" element={<EditProfile/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
