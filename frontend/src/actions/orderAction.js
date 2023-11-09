import { createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { clear_order__purchase_errors, create_order_request, create_order_request_fail, create_order_request_success } from "../reducers/orderReducer";
import axios from "axios";


export const createNewUserOrder = createAsyncThunk("newOrder",async(order,thunkAPI)=>{
    try {
        thunkAPI.dispatch(create_order_request());
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials:true
        };

        const {data} = await axios.post("http://localhost:4000/ecom/v1/order/buy",order,config); 
        thunkAPI.dispatch(create_order_request_success(data));
    } catch (error) {
        thunkAPI.dispatch(create_order_request_fail(error.response.data.message));
    }
});

export const clearOrderErrors = createAsyncThunk("clearOrderErrors",async(_,thunkAPI)=>{
    thunkAPI.dispatch(clear_order__purchase_errors);
});