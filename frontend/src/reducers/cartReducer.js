import { createSlice } from "@reduxjs/toolkit";


export const cartReducer = createSlice({
    name:"Cart reducer methods",
    initialState:{
       cartItems:[{}],
       shippingInfo:{}
    },
    reducers:{
        add_to_cart_request:(state,action)=>{
            const item = action.payload;
            const itemExists = state.cartItems.find((i)=>i.id===item.id);
            if(itemExists){
                state.cartItems=state.cartItems.map((i)=>i.id===itemExists.id 
                ? 
                {...item,
                quantity:(i.quantity+item.quantity <= item.stock) ?i.quantity+item.quantity:item.stock
                }
                :i);
                
            }else{
                state.cartItems=[...state.cartItems,item];
            }
            state.isLoading=true;  
        },
        remove_from_cart:(state,action)=>{
            const removeItem = action.payload;
            state.cartItems = state.cartItems.filter((i)=>i.id!==removeItem);
        },
        save_shipping_info:(state,action)=>{
            state.shippingInfo=action.payload;
        }  
    },

});

export const {add_to_cart_request,remove_from_cart,save_shipping_info} = cartReducer.actions;