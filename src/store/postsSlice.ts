import { createSlice } from "@reduxjs/toolkit";
import { PostInterface } from "../pages/main/Main";

const initialState: PostInterface[] = [];

export const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        getPosts(state, action){
            return action.payload
        }
    }
}) 

export default postsSlice.reducer;
export const { getPosts } = postsSlice.actions;