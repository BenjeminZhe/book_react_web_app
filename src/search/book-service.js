
import axios from "axios";

const BOOK_API = "https://hapi-books.p.rapidapi.com";

export const searchBookByName = async (term) => {
    const response = await axios.get(`${BOOK_API}/search/${term}`, {
        headers: {
            // 'X-RapidAPI-Key': 'ENTER YOUR KEY HERE',
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