import * as likesService from '../services/likes-service.js';
import {createAsyncThunk} from "@reduxjs/toolkit";

export const UserLikesBookThunk = createAsyncThunk(
    "likes/userLikesBook",
    async ( bid) => {
    const status = await likesService.userLikesBook(bid);
    return status;
});

export const UserUnlikesBookThunk = createAsyncThunk(
    "likes/userUnlikesBook",
    async (bid) => {
    const status = await likesService.userUnlikesBook(bid);
    return status;
    }
);

export const findAllLikesThunk = createAsyncThunk(
    "likes/findAllLikes",
    async () => {
    const likes = await likesService.findAllLikes();
    return likes;
});

export const findBooksLikedByUserThunk = createAsyncThunk(
    "likes/findBooksLikedByUser",
    async (uid) => {
    const books = await likesService.findBooksLikedByUser(uid);
    return books;
});

export const findUsersWhoLikedBookThunk = createAsyncThunk(
    "likes/findUsersWhoLikedBook",
    async (bid) => {
    const users = await likesService.findUsersWhoLikedBook(bid);
    return users;
});