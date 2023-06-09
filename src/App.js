
import {Routes, Route, Navigate} from "react-router";
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import NavigationSidebar from "./navigation-sidebar/index.js";
import SearchBooks from "./search/index.js";
import {BrowserRouter} from "react-router-dom";
import Home from "./home";
import CurrentUserLikedBooks from "./home/currentUserLikedBooks";
import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./reducers/users-reducer";
import {Provider} from "react-redux";
import LoginScreen from "./login/index.js";
import LogoutScreen from "./logout/index.js";
import {likesReducer} from "./reducers/likes-reducer";
import RegisterPage from "./register/index.js";
import BookDetailsScreen from "./book/book-details"
import ProfileScreen from "./profile/index.js";
import EditProfile from "./profile/edit-profile";
import OtherProfileScreen from "./profile/other-profile";
import AdminScreen from "./profile/admin-page";
import {awardedBooksReducer, popularAuthorReducer, top15BooksReducer} from "./reducers/book-reducer";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, usersReducer)

//import './App.css';
const store = configureStore({
    reducer: {
        users: persistedReducer,
        likes: likesReducer,
        top15Books: top15BooksReducer,
        awardedBooks: awardedBooksReducer,
        popularAuthors: popularAuthorReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
const persistor = persistStore(store);

//
// =======
//   reducer: {
//     users: persistedReducer,
//       likesReducer: likesReducer
//   }
// })
// const persistor = persistStore(store)
// >>>>>>> fb0ef2bcf9b14bb4629a1d82aa735b4b7a1ec3aa
function App() {
    //console.log(store.getState())
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <div className="container">
                <div className="row mt-2">
                    <div className="col-3">
                        <NavigationSidebar/>

                    </div>
                    <div className="col-9">
                        <Routes>
                            <Route path="/" element={<Navigate to="/BookSearcher/home"/>}/>
                            <Route path="/BookSearcher/home" element={<Home/>}/>
                            <Route path="/BookSearcher/search" element={<SearchBooks/>}/>
                            <Route path="/BookSearcher/search/:searchTerm" element={<SearchBooks/>}/>
                            <Route path="/User/register" element={<RegisterPage/>}/>
                            <Route path="/User/login" element={<LoginScreen/>}/>
                            <Route path="/User/logout" element={<LogoutScreen/>}/>
                            <Route path="/User/admin" element={<AdminScreen />} />
                            <Route path="/User/profile" element={<ProfileScreen/>}/>
                            <Route path="/User/profile/:userId" element={<OtherProfileScreen/>}/>
                            <Route path="/User/edit-profile" element={<EditProfile/>}/>
                            <Route path="/User/edit-profile/:userId" element={<EditProfile/>}/>
                            <Route path="/book/:id" element={<BookDetailsScreen/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
        </PersistGate>
        </Provider>
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
