import { createSlice } from "@reduxjs/toolkit";

export const orderReducer = createSlice({
    name:"Order reducer methods",
    initialState:{
        orderLoading:false,
        order:null,
        error:null
    },
    reducers:{
        create_order_request:(state,action)=>{
            state.orderLoading=true;
        },
        create_order_request_success:(state,action)=>{
            state.orderLoading=false;
            state.order=action.payload;
        },
        create_order_request_fail:(state,action)=>{
            state.orderLoading=false;
            state.error=action.payload;
        },
        clear_order_purchase_errors:(state,action)=>{
            state.orderLoading=false;
            state.error=null;
        },

    }
});

export const {create_order_request,clear_order__purchase_errors,create_order_request_fail,create_order_request_success} = orderReducer.actions;