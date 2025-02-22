import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../AuthSliceIniteState/AuthSliceIniteState";
import { postsReducer } from "../PostsSlice";



export const store = configureStore({
   reducer:{
     auth : authReducer,
     posts : postsReducer, 
   }
})

 export type AppDispatch = typeof store.dispatch 

export type RootState = ReturnType <typeof store.getState>