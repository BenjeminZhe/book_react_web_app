import { createAction } from '@reduxjs/toolkit';
import { getAwardedBooks} from '../services/book-service';

export const fetchAwardedBooksRequest = createAction('FETCH_AWARDED_BOOKS_REQUEST');
export const fetchAwardedBooksSuccess = createAction('FETCH_AWARDED_BOOKS_SUCCESS');
export const fetchAwardedBooksFailure = createAction('FETCH_AWARDED_BOOKS_FAILURE');

export const fetchAwardedBooks = () => async (dispatch) => {
    dispatch(fetchAwardedBooksRequest());
    try {
        const data = await getAwardedBooks();
        dispatch(fetchAwardedBooksSuccess(data));
    } catch (error) {
        dispatch(fetchAwardedBooksFailure(error.message));
    }
};