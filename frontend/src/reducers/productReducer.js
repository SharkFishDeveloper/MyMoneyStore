import { createSlice } from "@reduxjs/toolkit";



export const productsReducer = createSlice({
    name:"Products method",
     initialState :{
        loading: false,
        products: [],
        error: null,
        totalProducts: 0,
        resultPerPage:5,
        filteredProductsCount:0
      },
    reducers:{
       all_products_request:(state,action)=>{
        
        state.loading=true;
        state.products=[];    
       },
       got_all_products_success:(state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
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

export const productDetailsReducer = createSlice({
    name:"Products details reducer",
    initialState: {
        product:{},
        loading:false
    },
    reducers:{
       all_products_details_request:(state,action)=>{
        state.loading=true;
        state.product=[];
       },
       got_all_products_details_success:(state,action)=>{
        state.loading=false;
        state.product=action.payload;
       },
       got_all_products_details_failed:(state,action)=>{
        state.loading=false;
        state.error = action.payload;
    },
       clear_details_errors:(state,action)=>{
        state.error=null
       }
    },
});


export const {all_products_details_request,got_all_products_details_success,got_all_products_details_failed,clear_details_errors} = productDetailsReducer.actions;

export const {all_products_request,got_all_products_success,got_all_products_failed,clear_errors} = productsReducer.actions;

 //export default productReducer.reducer;



 // const initialState = {
//     loading: false,
//     products: [],
//     error: null,
//     totalProducts:0
// };
// const productDetailsState = {
//     products:{}
// };
