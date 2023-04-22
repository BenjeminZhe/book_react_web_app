import SearchListItem from "./search-list-item.js";

const SearchList = ({results}) => {
    return (
        <div className="container">
            <div className="">
                {console.log(results)}
                {results.map(book => (
                <SearchListItem
                    key={book.book_id}
                    book={book}
                />
                ))}
            </div>
        </div>
    )
}

export default SearchList;