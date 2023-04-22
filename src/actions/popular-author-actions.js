import { createAction } from '@reduxjs/toolkit';
import {getPopularAuthors} from '../services/book-service';

export const fetchPopularAuthorRequest = createAction('FETCH_POPULAR_AUTHORS_REQUEST');
export const fetchPopularAuthorSuccess = createAction('FETCH_POPULAR_AUTHORS_SUCCESS');
export const fetchPopularAuthorFailure = createAction('FETCH_POPULAR_AUTHORS_FAILURE');

export const fetchPopularAuthors = () => async (dispatch) => {
    dispatch(fetchPopularAuthorRequest());
    try {
        const data = await getPopularAuthors();
        dispatch(fetchPopularAuthorSuccess(data));
    } catch (error) {
        dispatch(fetchPopularAuthorFailure(error.message));
    }
};