import { createAction } from '@reduxjs/toolkit';
import { getTop15Books} from '../services/book-service';

export const fetchTop15BooksRequest = createAction('FETCH_TOP15_BOOKS_REQUEST');
export const fetchTop15BooksSuccess = createAction('FETCH_TOP15_BOOKS_SUCCESS');
export const fetchTop15BooksFailure = createAction('FETCH_TOP15_BOOKS_FAILURE');

export const fetchTop15Books = () => async (dispatch) => {
    dispatch(fetchTop15BooksRequest());
    try {
        const data = await getTop15Books();
        dispatch(fetchTop15BooksSuccess(data));
    } catch (error) {
        dispatch(fetchTop15BooksFailure(error.message));
    }
};