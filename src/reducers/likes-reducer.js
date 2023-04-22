import {createSlice} from "@reduxjs/toolkit";
import {
    findBooksLikedByUserThunk,
    findUsersWhoLikedBookThunk,
    UserLikesBookThunk,
    UserUnlikesBookThunk,
    findAllLikesThunk
} from "../thunks/likes-thunk";

const initialState = {
    likes: [],
    loading: false
}

export const likesReducer = createSlice({
    name: "likes",
    initialState,
    extraReducers: {
        [UserLikesBookThunk.fulfilled]: (state, action) => {
            state.likes.push(action.payload)
        },
        [UserLikesBookThunk.pending]: (state, action) => {
            state.loading = true
        },
        [UserLikesBookThunk.rejected]: (state, action) => {
            state.loading = false
        },
        [UserUnlikesBookThunk.fulfilled]: (state, action) => {
            state.likes = state.likes.filter((like) => like.id !== action.payload)
        },
        [UserUnlikesBookThunk.pending]: (state, action) => {
            state.loading = true
        },
        [UserUnlikesBookThunk.rejected]: (state, action) => {
            state.loading = false
        },

        [findBooksLikedByUserThunk.fulfilled]: (state, action) => {
            state.likes = action.payload
        },
        [findBooksLikedByUserThunk.pending]: (state, action) => {
            state.loading = true
        },
        [findBooksLikedByUserThunk.rejected]: (state, action) => {
            state.loading = false
        },
        [findUsersWhoLikedBookThunk.fulfilled]: (state, action) => {
            state.likes = action.payload
        },
        [findUsersWhoLikedBookThunk.pending]: (state, action) => {
            state.loading = true
        },
        [findUsersWhoLikedBookThunk.rejected]: (state, action) => {
            state.loading = false
        },
        [findAllLikesThunk.fulfilled]: (state, action) => {
            state.likes = action.payload
        },
        [findAllLikesThunk.pending]: (state, action) => {
            state.loading = true
        },
        [findAllLikesThunk.rejected]: (state, action) => {
            state.loading = false
        }
    }
})