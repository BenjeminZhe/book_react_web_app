import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {searchBookByName} from "../services/book-service.js";
import SearchListItem from "./search-list-item.js";

function SearchBooks() {
    const {searchTerm: defaultSearchTerm} = useParams();
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm || '');
    const [results, setResults] = useState({});
    const navigate = useNavigate();
    // const fetchBooks = async () => {
    //     const response = await searchBookByName(searchTerm);
    //     setResults(response);
    //     //console.log(response);
    // };
    useEffect(() => {
        if(defaultSearchTerm) {
            setSearchTerm(defaultSearchTerm);
        }
    }, [defaultSearchTerm]);

    const handleSearch = async (e) => {
        const response = await searchBookByName(searchTerm);
        setResults(response);
        navigate(`/BookSearcher/search/${searchTerm}`);
    }


    return (
        <div className="container mt-3">
            <button
                onClick={handleSearch}
                className="float-end btn btn-primary"
            >Search
            </button>
            <input
                className="form-control w-75"
                placeholder="Search Books"
                type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
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