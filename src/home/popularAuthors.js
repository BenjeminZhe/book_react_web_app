import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPopularAuthors} from "../actions/popular-author-actions";


const PopularAuthorsComponent = () => {
    const dispatch = useDispatch();
    const popularAuthors = useSelector((state) => state.popularAuthors.popularAuthors);
    const loading = useSelector((state) => state.popularAuthors.loading);
    const error = useSelector((state) => state.popularAuthors.error);

    useEffect(() => {
        dispatch(fetchPopularAuthors());
    }, [dispatch]);

    return(
        <>
            <h3>Popular Authors</h3>
            <div>
                <div className="row row-cols-1 row-cols-md-2  row-cols-lg-4 g-4">
                    {popularAuthors && popularAuthors.map((author) => (
                        <Link to={`/book/${author.name}`} className="text-decoration-none">
                            <div className="col" key={author.author_id}>
                                <div className="card h-100">
                                    <img src={author.image} className="card-img-top" height="200"
                                         width="200"
                                         alt={author.name}/>
                                    <div className="card-body p-1 text-center border-0">
                                        <p className="card-title">{author.name}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </div>
            </div>
        </>
    )
}
export default PopularAuthorsComponent;