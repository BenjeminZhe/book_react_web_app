import * as likesService from '../services/likes-service.js';
import {createAsyncThunk} from "@reduxjs/toolkit";

export const UserLikesBookThunk = createAsyncThunk(
    "likes/userLikesBook",
    async (uid, bid) => {
    const status = await likesService.userLikesBook(uid, bid);
    return status;
});

export const UserUnlikesBookThunk = createAsyncThunk(
    "likes/userUnlikesBook",
    async (uid, bid) => {
    const status = await likesService.userUnlikesBook(uid, bid);
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