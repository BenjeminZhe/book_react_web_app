

function CurrentUserLikedBooks(book) {
    return (
        <div className="mt-5 pt-5">
            {/*todo: load if current user logged in*/}
            <h5>Books you liked</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">book 1</li>
                <li className="list-group-item">book 2</li>
                <li className="list-group-item">book 3</li>
                <li className="list-group-item">book 4</li>
                <li className="list-group-item">book 5</li>
            </ul>
        </div>
    )
}

export default CurrentUserLikedBooks;