import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../AuthSliceIniteState/AuthSliceIniteState";
import { postsReducer } from "../PostsSlice";



export const store = configureStore({
   reducer:{
     auth : authReducer,
     posts : postsReducer, 
   }
})