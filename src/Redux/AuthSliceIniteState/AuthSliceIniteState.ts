import  cookie  from 'js-cookie';
import { AuthSliceIniteState } from "@/Interfaces/AuthSliceInitState";
import { createSlice } from "@reduxjs/toolkit";

const initialState : AuthSliceIniteState = {
    isLoggedIn: !!cookie.get("token"),
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        SetUserIsLoggedIn :(state , action)=>{
         state.isLoggedIn = action.payload
        }
    }
})

 export const authReducer = authSlice.reducer
  export const { SetUserIsLoggedIn } = authSlice.actions