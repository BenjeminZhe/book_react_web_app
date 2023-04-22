
import axios from "axios";

const BOOK_API = "https://hapi-books.p.rapidapi.com";

export const searchBookByName = async (term) => {
    const response = await axios.get(`${BOOK_API}/search/${term}`, {
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    });
    return response.data;
}

export const getTop15Books = async () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const response = await axios.get(`${BOOK_API}/month/${year}/${month}`, {
        headers: {
             'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    });
    return response.data;
}

export const getAwardedBooks = async () => {
    const year = new Date().getFullYear() - 1;
    console.log(year);
    const response = await axios.get(`${BOOK_API}/top/${year}`, {
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    });
    return response.data;
}

export const getPopularAuthors = async () => {
    const response = await axios.get(`${BOOK_API}/top_authors`, {
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    });
    return response.data;
}


//
// import SearchListItem from "./search-list-item.js";
// import bookArray from "./books.json";

// const SearchList = () => {
//     return (
//         <div className="container">
//             <div className="">
//                 {console.log(bookArray)}
//                 {bookArray.map((book) => (
//                 <SearchListItem
//                     key={book.book_id}
//                     book={book}
//                 />
//                 ))}
//             </div>
//         </div>
//     )
// }
//
// export default SearchList;