import { createSlice } from "@reduxjs/toolkit";


export const cartReducer = createSlice({
    name:"Cart reducer methods",
    initialState:{
       cartItems:[],
       shippingInfo:{}
    },
    reducers:{
        add_to_cart_request:(state,action)=>{
            const item = action.payload;
            const itemExists = state.cartItems.find((i)=>i.productid===item.productid);
            console.log('Before modification:', state.cartItems);
            if(itemExists){
                state.cartItems=state.cartItems.map((i)=>i.productid===itemExists.productid 
                ? 
                {...item,
                quantity:(i.quantity+item.quantity <= item.stock) ?i.quantity+item.quantity:item.stock
                }
                :i);
                
            }else{
                state.cartItems=[...state.cartItems,item];
            }
            state.isLoading=true;
            console.log('After modification:', state.cartItems);

           
        },
        remove_from_cart:(state,action)=>{
            const removeItem = action.payload;
            state.cartItems = state.cartItems.filter((i)=>i.productid!==removeItem);
        },
        save_shipping_info:(state,action)=>{
            state.shippingInfo=action.payload;
        }  
    },

});


export const myOrdersReducer = createSlice({
    name:"myOrders",
    initialState:{
        orderHistory:[],
        orderHistoryLoading:false,
        ordersHistoryError:null
    },
    reducers:{
        my_orders_request:(state,action)=>{
            state.orderHistoryLoading=true;
        },
        my_orders_request_success:(state,action)=>{
            state.orderHistoryLoading=false;
            state.orderHistory=action.payload
        },
        my_orders_fail:(state,action)=>{
            state.ordersHistoryError=action.payload;
            state.orderHistoryLoading=false;
        },
        clear_orderHistory_error:(state,action)=>{
            state.ordersHistoryError=null;
            state.orderHistoryLoading=false;
        }
    }
});


export const {add_to_cart_request,remove_from_cart,save_shipping_info} = cartReducer.actions;

export const {my_orders_request,my_orders_fail,my_orders_request_success,clear_orderHistory_error} = myOrdersReducer.actions;