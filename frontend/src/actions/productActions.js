import axios from "axios";
import{ all_products_details_request,got_all_products_details_success,got_all_products_details_failed } from "../reducers/productReducer.js";
import { got_all_products_failed, got_all_products_success,all_products_request,
    clear_errors } from '../reducers/productReducer.js';
import { createAsyncThunk } from "@reduxjs/toolkit";


    export const fetchAllProducts =createAsyncThunk("fetchAllProducts",
    async(myobj ,thunkAPI)=>{
    try {
         // Destructure with default values
         const { keywords = "", page=1,price=[0,50000],category} = myobj;

         // Dispatch request in progress action
         thunkAPI.dispatch(all_products_request());
         let link = `http://localhost:4000/ecom/v1/products`;
         link += `?keyword=${keywords}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
         // Initialize link with a base URL
         if(category){
                link += `&category=${category}`;
         }
         //let link = `http://localhost:4000/ecom/v1/products`;
 
         // Append parameters to the link if they are not null
        //  if (keywords != null || page !== null || price!== null) {
        //      link += `?keyword=${keywords}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category`;
        //  }
         
    // let baseLink = 'http://localhost:4000/ecom/v1/products?';
    // let keywordLink = keywords ? `keyword=${keywords}` : '';
    // let pageLink = page ? `&page=${page}` : '';
    // let link = `${baseLink}${keywordLink}${pageLink}`;
    // const response = await axios.get(link);
    const response = await axios.get(link);
    thunkAPI.dispatch(got_all_products_success(response.data));
    } catch (error) {
        //const errorMessage = error.response?.data?.message || error.message;
        console.log(error.message);
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