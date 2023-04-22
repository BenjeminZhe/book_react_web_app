import {
    fetchTop15BooksRequest,
    fetchTop15BooksSuccess,
    fetchTop15BooksFailure,
} from '../actions/top-book-actions';
import {
    fetchAwardedBooksRequest,
    fetchAwardedBooksSuccess,
    fetchAwardedBooksFailure,
} from '../actions/award-book-actions';
import {
    fetchPopularAuthorRequest,
    fetchPopularAuthorSuccess,
    fetchPopularAuthorFailure,
} from '../actions/popular-author-actions';


const initialTop15BooksState = {
    top15Books: [],
    loading: false,
    error: null,
};

const initialAwardedBooksState = {
    awardedBooks: [],
    loading: false,
    error: null,
};

const initialPopularAuthorsState = {
    popularAuthors: [],
    loading: false,
    error: null,
};

export const top15BooksReducer = (state = initialTop15BooksState, action) => {
    switch (action.type) {
        case fetchTop15BooksRequest.type:
            return {...state, loading: true, error: null};
        case fetchTop15BooksSuccess.type:
            return {...state, loading: false, top15Books: action.payload};
        case fetchTop15BooksFailure.type:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export const awardedBooksReducer = (state = initialAwardedBooksState, action) => {
    switch (action.type) {
        case fetchAwardedBooksRequest.type:
            return {...state, loading: true, error: null};
        case fetchAwardedBooksSuccess.type:
            return {...state, loading: false, awardedBooks: action.payload};
        case fetchAwardedBooksFailure.type:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export const popularAuthorReducer = (state = initialPopularAuthorsState, action) => {
    switch (action.type) {
        case fetchPopularAuthorRequest.type:
            return {...state, loading: true, error: null};
        case fetchPopularAuthorSuccess.type:
            return {...state, loading: false, popularAuthors: action.payload};
        case fetchPopularAuthorFailure.type:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};
