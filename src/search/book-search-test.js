// import {useState} from "react";
// import {searchBookByName} from "./book-service.js";
// import SearchListItem from "./search-list-item.js";
//
// function BookSearch() {
//     const [search, setSearch] = useState("");
//     const [results, setResults] = useState({});
//
//     const searchBook = async () => {
//         const response = await searchBookByName(search);
//         setResults(response);
//         console.log(response);
//     };
//     return(
//         <div>
//             <h1>
//                 Book Search
//             </h1>
//             <button
//                 onClick={searchBook}
//                 className="float-end btn btn-primary"
//             >Search</button>
//             <input
//                 className="form-control w-75"
//                 type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
//
//             <h2>Books</h2>
//
//
//             {/*<div className="table-responsive">*/}
//
//             {/*    <table className="table table-striped table-hover">*/}
//             {/*        <tbody>*/}
//             {/*        <tr>*/}
//             {/*            {typeof (results) === Array &&*/}
//             {/*                results.map(book => (*/}
//             {/*                    <SearchListItem*/}
//             {/*                        key={book.id}*/}
//             {/*                        book={book}*/}
//             {/*                    />*/}
//             {/*                ))*/}
//             {/*            }*/}
//             {/*        </tr>*/}
//             {/*        </tbody>*/}
//             {/*    </table>*/}
//             {/*</div>*/}
//             {/*<pre>*/}
//             {/*    {JSON.stringify(results, null, 2)}*/}
//             {/*</pre>*/}
//         </div>
//     )
// }
// export default BookSearch;