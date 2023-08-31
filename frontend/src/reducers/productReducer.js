import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    products: [],
    error: null,
    totalProducts:0
};

export const productReducer = createSlice({
    name:"Products method",
    initialState: initialState,
    reducers:{
       all_products_request:(state,action)=>{
        
        state.loading=true;
        state.product=[];    
       },
       got_all_products_success:(state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
        state.totalProducts = action.payload.totalProducts;
       },
       got_all_products_failed:(state,action)=>{
        state.loading=false;
        state.error = action.payload;
    },
       clear_errors:(state,action)=>{
        state.error=null
       }
    },
});
export const {all_products_request,got_all_products_success,got_all_products_failed,clear_errors} = productReducer.actions;
export default productReducer.reducer;