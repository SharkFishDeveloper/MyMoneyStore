import axios from "axios";
import{ all_products_details_request,got_all_products_details_success,got_all_products_details_failed } from "../reducers/productReducer.js";
import { got_all_products_failed, got_all_products_success,all_products_request,
    clear_errors } from '../reducers/productReducer.js';
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllProducts = createAsyncThunk("fetchAllProducts",async(keywords="",thunkAPI)=>{
    try {
    thunkAPI.dispatch(all_products_request());
    let link = `http://localhost:4000/ecom/v1/products/?keyword=${keywords}`
    const response = await axios.get(link);
    thunkAPI.dispatch(got_all_products_success(response.data));
    } catch (error) {
        thunkAPI.dispatch( got_all_products_failed(error.response.data.message));
    }
    
});

export const getProductDetails = createAsyncThunk("getProductDetails",async(id,thunkAPI)=>{
    try {
    thunkAPI.dispatch(all_products_details_request());
    const response = await axios.get(`http://localhost:4000/ecom/v1/product/${id}`);
    thunkAPI.dispatch(got_all_products_details_success(response.data.product));
    } catch (error) {
        thunkAPI.dispatch(got_all_products_details_failed(error.response.data.message));
    }   
});


export const clearErrors = createAsyncThunk(
    "clearErrors",async(_,thunkAPI)=>{
        
        return thunkAPI.dispatch(clear_errors());
    }
);

// return Promise.resolve(thunkAPI.dispatch(clear_errors()));