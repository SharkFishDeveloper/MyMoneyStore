import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const userReducer = createSlice({
    name:"User reducer method",
    initialState:{
    user:{},
    isAuthenticated:false,
    isLoading:false
    },  
    reducers:{
        login_request:(state,action)=>{
          state.isLoading=true;  
        },
        login_success:(state,action)=>{
            state.user = action.payload;
            state.isLoading=false;
            state.isAuthenticated=true;
            // Cookies.set('token', action.payload.token, { expires: 7 ,sameSite: 'strict',secure:true});
        },
        login_fail:(state,action)=>{
            // state.user = null;
            state.isLoading=true;
            state.isAuthenticated=false;
            state.error=action.payload;
        },       
        clear_errors:(state,action)=>{
            // state.user = null;
            // state.isLoading=true;
            // state.isAuthenticated=false;
            state.error=null;
        },




        logout_success:(state,action)=>{
            state.isLoading=false;
            state.user = null;
            state.isAuthenticated=false;
        },
        logout_fail:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        },

        signup_request:(state,action)=>{
        state.isLoading=true;
        },
        signup_success:(state,action)=>{
              state.user = action.payload;
              state.isLoading=false;
              state.isAuthenticated=true;
          },
        signup_fail:(state,action)=>{
              state.user = null;
              state.isLoading=true;
              state.isAuthenticated=false;
              state.error=action.payload;
          },
        load_user_request:(state,action)=>{
            state.isLoading=true;
            },
        load_user_success:(state,action)=>{
                console.log(action.payload);
                  state.user = action.payload;
                  state.isLoading=false;
                  state.isAuthenticated=true;

        },
        load_user_fail:(state,action)=>{
                  state.user = null;
                  state.isLoading=false;
                  state.isAuthenticated=false;
                  state.error=action.payload;
              },
    }
});

export const {login_fail,login_request,login_success,clear_errors,signup_fail,signup_request,signup_success,load_user_fail,load_user_request,load_user_success,logout_fail,logout_success} = userReducer.actions; 