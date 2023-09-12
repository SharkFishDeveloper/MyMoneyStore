import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {login_success,login_fail,login_request,clear_errors, signup_request,signup_fail,signup_success, load_user_request,load_user_fail,load_user_success, logout_success, logout_fail} from "../reducers/userReduces.js";

//import { withCookies } from "react-cookie";
//axios.defaults.withCredentials = true;

export const login = createAsyncThunk("login",async(reqbody ,thunkAPI)=>{

    try {
        const {email,password} = reqbody;
        thunkAPI.dispatch(login_request());
        // const config = {headers:{"Content-Type": "application/json"},
        // withCredentials:true};
        
        
        const {data} = await axios.post("http://localhost:4000/ecom/v1/login",{
            email,
            password,
            
            //config,  
        },
        {withCredentials:true},
        );

        console.log(data);

        thunkAPI.dispatch(login_success(data));
    } catch (error) {
        console.log(error);
        thunkAPI.dispatch(login_fail(error.response.data.message));
    }

});


//* registering user
export const register = createAsyncThunk("register",async(reqbody,thunkAPI)=>{
    try {
        const {email,password,name,avatar} = reqbody;
        thunkAPI.dispatch(signup_request());
        const config = {headers:{"Content-Type": "multipart/form-data"}};
        
        const {data} = await axios.post("http://localhost:4000/ecom/v1/register",{
            email,
            password,
            name,
            avatar,
            config,   
        }
        ,{withCredentials:true});
        console.log(data);
        thunkAPI.dispatch(signup_success(data));
    } catch (error) {
        console.log(error);
        thunkAPI.dispatch(signup_fail(error.response.data.message));
    }
});

//* get user details when opening screen

export const loadUser = createAsyncThunk("loadUser",async(_,thunkAPI)=>{
    try {
        thunkAPI.dispatch(load_user_request());
        
        const data = await axios.get("http://localhost:4000/ecom/v1/user",        {withCredentials:true});
        // console.log(data.data);
        thunkAPI.dispatch(load_user_success(data.data));
    } catch (error) {
        console.log(error);
        thunkAPI.dispatch(load_user_fail(error.response.data.message));
    }
});

//* logout user
export const logout = createAsyncThunk("logout",async(_,thunkAPI)=>{
    try {      
        await axios.get("http://localhost:4000/ecom/v1/logout",   {withCredentials:true}     );
        console.log("Logged out");
        thunkAPI.dispatch(logout_success());
    } catch (error) {
        console.log(error);
        thunkAPI.dispatch(logout_fail(error.response.data.message));
    }
});



export const clearErrors = createAsyncThunk(
    "clearErrors",async(_,thunkAPI)=>{
        
        return thunkAPI.dispatch(clear_errors());
    }
);
