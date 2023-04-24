import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchBookByName } from "../services/book-service.js";
import SearchListItem from "./search-list-item.js";

function SearchBooks() {
    const { searchTerm: defaultSearchTerm } = useParams();
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm || "");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (defaultSearchTerm) {
            setSearchTerm(defaultSearchTerm);
            const cachedResults = localStorage.getItem(defaultSearchTerm);
            if (cachedResults) {
                setResults(JSON.parse(cachedResults));
            } else {
                fetchBooks();
            }
        }
    }, [defaultSearchTerm]);

    const fetchBooks = async () => {
        const response = await searchBookByName(searchTerm);
        setResults(response);
        localStorage.setItem(searchTerm, JSON.stringify(response));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        fetchBooks();
        navigate(`/BookSearcher/search/${searchTerm}`);
    };

    return (
        <div className="container mt-3">
            <form onSubmit={handleSearch}>
                <button className="float-end btn btn-primary">Search</button>
                <input
                    className="form-control w-75"
                    placeholder="Search Books"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            {results &&
                results.map((book) => (
                    <SearchListItem key={book.book_id} book={book} />
                ))}
        </div>
    );
}

export default SearchBooks;
