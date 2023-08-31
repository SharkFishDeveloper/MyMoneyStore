import axios from "axios";
import productReducer from "../reducers/productReducer.js";
import { got_all_products_failed, got_all_products_success,all_products_request,
    clear_errors } from '../reducers/productReducer.js';
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllProducts = createAsyncThunk("fetchAllProducts",async(_,thunkAPI)=>{
    try {
    thunkAPI.dispatch(all_products_request());
    const response = await axios.get("http://localhost:4000/ecom/v1/products");
    thunkAPI.dispatch(got_all_products_success(response.data));
    } catch (error) {
        thunkAPI.dispatch( got_all_products_failed(error.response.data.message));
    }
    
});

export const clearErrors = createAsyncThunk(
    "clearErrors",async(_,thunkAPI)=>{
        thunkAPI.dispatch(clear_errors());
    }
);