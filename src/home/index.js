import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Top15BooksComponent from "./top15Books";
import AwardBooksComponent from "./awardBooks";
import PopularAuthorsComponent from "./popularAuthors";

function Home() {
    // Retrieve current user
    const { currentUser} = useSelector((state) => state.users);



    return (

        <div className="container mt-3">
            <div className="mt-4">
                {currentUser &&
                    <h5 className="mb-4">
                        Welcome To {currentUser.role} Home, {currentUser.username}!!
                    </h5>}
                {(!currentUser || currentUser.role === "USER") &&
                    <Top15BooksComponent/>
                }
                {(currentUser && currentUser.role === "ADMIN") &&
                    <AwardBooksComponent/>
                }
                {(currentUser && currentUser.role === "AUTHOR") &&
                    <PopularAuthorsComponent/>
                }
            </div>

            {/*<div className="table-responsive">*/}
            {/*    <table className="table">*/}
            {/*        <tbody>*/}
            {/*        <tr>*/}
            {/*            {books &&*/}
            {/*                books.map((book) => (*/}
            {/*                    <td key={book.book_id}>*/}
            {/*
            {/*                        <img src={book.cover} alt={book.name} width="100" height="150"/>*/}
            {/*                        <p>{book.name}</p>*/}
            {/*                    </td>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </tr>*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
            {/*<pre>{JSON.stringify(books, null, 2)}</pre>*/}
        </div>
    );
}

export default Home;