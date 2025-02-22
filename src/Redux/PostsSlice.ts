import { PostsSliceInitStat } from "@/Interfaces/PostsSliceInitState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



export const getAllPosts = createAsyncThunk("Posts/getAllPosts", async ()=>{
    const { data } = await axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
        headers:{
            token: Cookies.get("token")
        }
    })
    return data.posts
})

const initialState : PostsSliceInitStat = {
  posts: [],
};

  const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
     builder.addCase(getAllPosts.fulfilled ,(state , action)=>{
        state.posts = action.payload ;
     })
  },
});

export const postsReducer = postsSlice.reducer
