import { createSlice } from "@reduxjs/toolkit";
import { PostInterface } from "../pages/main/Main";

const initialState: PostInterface[] = [];

export const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        getPostsArray(state, action){
            return action.payload
        }
    }
}) 

export default postsSlice.reducer;
export const { getPostsArray } = postsSlice.actions;