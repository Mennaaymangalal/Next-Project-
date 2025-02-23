import { PostsSliceInitStat } from "@/Interfaces/PostsSliceInitState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



export const getAllPosts = createAsyncThunk("Posts/getAllPosts", async ()=>{
    const { data } = await axios.get("https://linked-posts.routemisr.com/posts?page=75", {
        headers:{
            token: Cookies.get("token")
        }
    })
    return data.posts.reverse()
})

export const getSinglePost = createAsyncThunk("Posts/getSinglePost", async (postId : string)=>{
  const { data } = await axios.get("https://linked-posts.routemisr.com/posts/" + postId , {
      headers:{
          token: Cookies.get("token")
      }
  })
  return data.post
})

const initialState : PostsSliceInitStat = {
  posts: [],  
  postsIsLoading: true ,
  post: null,
  postIsLoading : true
};

  const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
     builder.addCase(getAllPosts.fulfilled ,(state , action)=>{
        state.posts = action.payload ;
        state.postsIsLoading = false
     })
     builder.addCase(getAllPosts.pending ,(state , action)=>{
      state.postsIsLoading = true
   })
   builder.addCase(getAllPosts.rejected ,(state , action)=>{
    state.postsIsLoading = false
 })


 builder.addCase(getSinglePost.fulfilled ,(state , action)=>{
  state.post = action.payload ;
  state.postIsLoading = false
})
builder.addCase(getSinglePost.pending ,(state , action)=>{
    // state.postIsLoading = true
    if(state.post?._id != action.meta.arg){
      state.postIsLoading = true
    }
})
builder.addCase(getSinglePost.rejected ,(state , action)=>{
state.postIsLoading = false
})


  },
});

export const postsReducer = postsSlice.reducer
