// import {configureStore} from "@reduxjs/toolkit";
// import {Provider} from "react-redux";
import {Routes, Route, Navigate} from "react-router";
import NavigationSidebar from "./navigation-sidebar/index.js";
// import HomeComponent from "./home";
import SearchBooks from "./search/index.js";
import {BrowserRouter} from "react-router-dom";
import Home from "./home";
// import ProfileComponent from "./profile"
// import usersReducer from "./reducers/users-reducer";
// import EditProfile from "./profile/edit-profile";

//import './App.css';
// const store = configureStore({
//   reducer: {
//     users: usersReducer,
//   }
// })

function App() {
    return (
        // <Provider store={store}>
        <BrowserRouter>
            <div className="container">
                <div className="row mt-2">
                    <div className="col-3">
                        <NavigationSidebar/>
                        <div className="mt-5 pt-5">
                            {/*todo: load if current user logged in*/}
                            <h5>Books you liked</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">book 1</li>
                                <li className="list-group-item">book 2</li>
                                <li className="list-group-item">book 3</li>
                                <li className="list-group-item">book 4</li>
                                <li className="list-group-item">book 5</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">
                        <Routes>
                            <Route path="/" element={<Navigate to="/BookSearcher/home"/>}/>
                            <Route path="/BookSearcher/home" element={<Home/>}/>
                            <Route path="/BookSearcher/search" element={<SearchBooks/>}/>
                            <Route path="/BookSearcher/search/:searchTerm" element={<SearchBooks/>}/>
                            {/*todo: To book detail page*/}
                            {/*<Route path="" element={}/>*/}
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
        // <div className="row mt-2">
        //   <div className="col-2 col-md-2 col-lg-1 col-xl-2">
        //     <NavigationSidebar/>
        //   </div>
        //   <div className="col-10 col-md-10 col-lg-11 col-xl-10"
        //        style={{"position": "relative"}}>
        //       <BrowserRouter>
        //     <Routes>
        //       {/*<Route index element={<HomeComponent/>} />*/}
        //       {/*<Route path="home"    element={<HomeComponent/>}/>*/}
        //       <Route path="search" element={<SearchBooks/>}/>
        //       {/*<Route path="profile" element={<ProfileComponent/>}/>*/}
        //       {/*<Route path="edit-profile" element={<EditProfile/>}/>*/}
        //     </Routes>
        //       </BrowserRouter>
        //   </div>
        // </div>
        //</Provider>
    );
}

export default App;
