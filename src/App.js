import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {Routes, Route} from "react-router";
import NavigationSidebar from "./navigation-sidebar";
import HomeComponent from "./home";
import SearchComponent from "./search";
import ProfileComponent from "./profile"
import usersReducer from "./reducers/users-reducer";
import EditProfile from "./profile/edit-profile";
import BookDetailsScreen from "./book/book-details"
import { BrowserRouter } from 'react-router-dom';
import './App.css';

const store = configureStore({
  reducer: {
    users: usersReducer,
  }
})

function App() {
  return (
    <Provider store={store}>
      <div className="row mt-2">
        <div className="col-2 col-md-2 col-lg-1 col-xl-2">
          {/*<NavigationSidebar active="home"/>*/}
        </div>
        <div className="col-10 col-md-10 col-lg-11 col-xl-10"
             style={{"position": "relative"}}>
          <BrowserRouter>
          <Routes>
            {/*<Route index element={<HomeComponent/>} />*/}
            {/*<Route path="home"    element={<HomeComponent/>}/>*/}
            {/*<Route path="search" element={<SearchComponent/>}/>*/}
            {/*<Route path="profile" element={<ProfileComponent/>}/>*/}
            {/*<Route path="edit-profile" element={<EditProfile/>}/>*/}
            <Route path="/book/:id" element={<BookDetailsScreen/>}/>

          </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Provider>
  );
}

export default App;
