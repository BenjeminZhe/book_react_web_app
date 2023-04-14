import {Link, useNavigate, useParams} from "react-router-dom";
import SearchList from "./search-list.js";
import NavigationSidebar from "../navigation-sidebar/index.js";
import {useEffect, useState} from "react";
import {searchBookByName} from "./book-service.js";
import SearchListItem from "./search-list-item.js";

function SearchBooks() {
    const {searchTerm} = useParams();
    const [search, setSearch] = useState(searchTerm);
    const [results, setResults] = useState({});
    const navigate = useNavigate();
    const searchBook = async () => {
        const response = await searchBookByName(search);
        setResults(response);
        navigate(`/BookSearcher/search/${search}`);
        //console.log(response);
    };
    useEffect(() => {
        if(searchTerm) {
            searchBook();
        }
    }, [searchTerm]);


    return (
        <div className="container mt-3">
            <button
                onClick={searchBook}
                className="float-end btn btn-primary"
            >Search
            </button>
            <input
                className="form-control w-75"
                type="text" value={searchTerm} onChange={(e) => setSearch(e.target.value)}/>
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