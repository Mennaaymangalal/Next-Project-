import  cookie  from 'js-cookie';
import { AuthSliceIniteState } from "@/Interfaces/AuthSliceInitState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import  cookies  from 'js-cookie';


export const getLoggedUserData = createAsyncThunk("auth/getLoggedUserData" , async ()=>{
  const {data }= await axios.get("https://linked-posts.routemisr.com/users/profile-data" , {
    headers:{
        token: cookies.get("token")
    }
  })
  return data.user ;
})

const initialState : AuthSliceIniteState = {
    isLoggedIn: !!cookie.get("token"),
    user: null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        SetUserIsLoggedIn :(state , action)=>{
         state.isLoggedIn = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getLoggedUserData.fulfilled , (state , action)=>{
            state.user = action.payload ;
        })
    }
})

 export const authReducer = authSlice.reducer
  export const { SetUserIsLoggedIn } = authSlice.actions