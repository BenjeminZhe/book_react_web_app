import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fullTextSearch } from "./book-service";

function BookSearchScreen() {
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState(searchTerm);
    const [results, setResults] = useState({});
    const searchBook = async () => {
        const response = await fullTextSearch(search);
        setResults(response);
        navigate(`/book/search/${search}`);
    };
    useEffect(() => {
        if (searchTerm) {
            searchBook();
        }
    }, [searchTerm]);
}

export default BookSearchScreen;
