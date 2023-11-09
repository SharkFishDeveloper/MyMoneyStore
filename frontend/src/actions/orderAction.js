import { createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { clear_order__purchase_errors, create_order_request, create_order_request_fail, create_order_request_success } from "../reducers/orderReducer";
import axios from "axios";
import { my_orders_fail, my_orders_request, my_orders_request_success,clear_orderHistory_error } from "../reducers/cartReducer";

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

export const myOrdersAction = createAsyncThunk("myOrdersActions",async(_,thunkAPI)=>{
    try {
        thunkAPI.dispatch(my_orders_request());
        const config = {
            withCredentials:true
        };
        const {data} = await axios.get("http://localhost:4000/ecom/v1/orders/me",
        config
        );
        thunkAPI.dispatch(my_orders_request_success(data.orders));
    } catch (error) {
        thunkAPI.dispatch(my_orders_fail(error.response.data.message));
    }
});

export const clearHistoryErrors = createAsyncThunk("clearOrderErrors",async(_,thunkAPI)=>{
    thunkAPI.dispatch(clear_orderHistory_error());
});
export const clearOrderErrors = createAsyncThunk("clearOrderErrors",async(_,thunkAPI)=>{
    thunkAPI.dispatch(clear_order__purchase_errors);
});