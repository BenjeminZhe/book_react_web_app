import axios from "axios";
const BOOK_API = "https://hapi-books.p.rapidapi.com/";
const BOOK_KEY = process.env.REACT_APP_NAPSTER_KEY;

const api = axios.create({
    withCredentials: true,
});


// export const fullTextSearch = async (query) => {
//     const response = await api.get(
//         `${BOOK_API}/search/verbose?query=${query}&apikey=${BOOK_KEY}`
//     );
//     return response.data.search.data;
// };

export const getBook = async (book_id) => {
    const options = {
        method: 'GET',
        url: `${BOOK_API}book/${book_id}`,
        headers: {
            'X-RapidAPI-Key': BOOK_KEY,
            'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
        }
    };
    const response = await api.request(options)
    return response.data;
};
