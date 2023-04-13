import {Link} from "react-router-dom";
import SearchList from "./search-list.js";
import NavigationSidebar from "../navigation-sidebar/index.js";
import {useState} from "react";
import {searchBookByName} from "./book-service.js";
import SearchListItem from "./search-list-item.js";

function SearchBooks() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState({});
    const searchBook = async () => {
        const response = await searchBookByName(search);
        setResults(response);
        //console.log(response);
    }
    return (
        <div className="container">
            <button
                onClick={searchBook}
                className="float-end btn btn-primary"
            >Search
            </button>
            <input
                className="form-control w-75"
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            {
                Array.isArray(results) &&
                results.map(book => (
                    console.log('1'),
                        <SearchListItem
                            key={book.book_id}
                            book={book}
                        />
                ))

            }

        </div>
    )
}

export default SearchBooks;