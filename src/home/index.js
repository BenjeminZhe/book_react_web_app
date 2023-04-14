import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";

const Month_TOP_BOOKS_API = "https://hapi-books.p.rapidapi.com/month";

function Home() {
    const [books, setBooks] = useState([]);
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    // // retrieve current user
    // const {currentUser} = useSelector((state) =>state.users);
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get(`${Month_TOP_BOOKS_API}/${year}/${month}`, {
                headers: {
                    // 'X-RapidAPI-Key': '742af23194msh5615cba23ad3829p137f63jsn366613c001ff',
                    'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
                }
            });
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    return (

        <div className="container mt-3">

            {/*<div>*/}
            {/*    <h3>Books you liked</h3>*/}
            {/*    */}
            {/*</div>*/}
            <div className="mt-4">
                <h3>Top 15 Books in This Month</h3>
                <div className="row row-cols-2 row-cols-md-3  row-cols-lg-6 g-4">
                    {books && books.map((book) => (<div className="col" key={book.book_id}>
                        <div className="card h-100">
                            <img src={book.cover} className="card-img-top" height="200" width="100" alt={book.name}/>
                            <div className="card-body p-1 text-center border-0">
                                <p className="card-title">{book.name}</p>
                            </div>
                        </div>
                    </div>))}
                </div>
            </div>
            {/*<div className="table-responsive">*/}
            {/*    <table className="table">*/}
            {/*        <tbody>*/}
            {/*        <tr>*/}
            {/*            {books &&*/}
            {/*                books.map((book) => (*/}
            {/*                    <td key={book.book_id}>*/}
            {/*                        /!*todo: add a link to the book detail page*!/*/}
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