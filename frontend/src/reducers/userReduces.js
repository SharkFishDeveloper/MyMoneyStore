import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const userReducer = createSlice({
    name:"User reducer method",
    initialState:{
        user: {
            detailsOfuser: {
                name: "User",
                email: "user@gmail.com",
                avatar:{
                    url:"sample"
                }
            }
        },
    isAuthenticated:false,
    isLoading:false
    },  
    reducers:{
        login_request:(state,action)=>{
          state.isLoading=true;  
        },
        login_success:(state,action)=>{
            state.user = action.payload;
            //state.user = action.payload;
            state.isLoading=false;
            state.isAuthenticated=true;
            // Cookies.set('token', action.payload.token, { expires: 7 ,sameSite: 'strict',secure:true});
        },
        login_fail:(state,action)=>{
            // state.user = null;
            state.isLoading=false;
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
              state.isLoading=false;
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
                  state.isLoading=false;
                  state.isAuthenticated=false;
                  state.error=action.payload;
              },
    }
});

export const profileReducer = createSlice(
    {
        name:"User update reducer",
        initialState:{
            isLoading:false,
            isUpdated:false,
            newUserUpdated:null
        },
        reducers:{
            update_profile_request:(state,action)=>{
                state.isLoading=true;
            },
            update_profile_success:(state,action)=>{
                state.isLoading=false;
                state.isUpdated =true;
                state.newUserUpdated=action.payload;
            },
            update_profile_fail:(state,action)=>{
                state.isLoading= false;
                state.error= action.payload;
            },
            update_profile_reset:(state,action)=>{
                state.isLoading= false;
                state.isUpdated=false;
            },
            clear_update_errors:(state,action)=>{
                state.isLoading= false;
                state.error=null;
            }
        }
    }
);

export const forgotPasswordReducer = createSlice(
    {
        name:"Password change",
        initialState:{
            isLoading:false,
            message:null,
            error:null,
            forgotSuccess:false,
            success:false
        },
        reducers:{
            forgot_password_request:(state,action)=>{
                state.isLoading=true;
                state.forgotSuccess=true;
            },
            forgot_password_success:(state,action)=>{
                state.isLoading=false;               
                state.message=action.payload;
            },
            forgot_password_fail:(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            },
            reset_password_request:(state,action)=>{
                state.isLoading=true;
                state.forgotSuccess=true;
            },//* state.message does not work
            reset_password_success:(state,action)=>{
                state.isLoading=false;
                state.message=action.payload;
                state.success=true;
            },
            reset_password_fail:(state,action)=>{
                state.isLoading=false;
                state.error=action.payload;
            },
            clear_forgot_password_error:(state,action)=>{
                state.isLoading=false;
                state.error=null;
            }
        }
    }
);

export const {login_fail,login_request,login_success,clear_errors,signup_fail,signup_request,signup_success,load_user_fail,load_user_request,load_user_success,logout_fail,logout_success} = userReducer.actions; 

export const {update_profile_request,update_profile_success,update_profile_reset,update_profile_fail,clear_update_errors} = profileReducer.actions;

export const {forgot_password_request,forgot_password_fail,forgot_password_success,reset_password_fail,reset_password_request,reset_password_success} = forgotPasswordReducer.actions;