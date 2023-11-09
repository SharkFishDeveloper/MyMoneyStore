
import {configureStore} from "@reduxjs/toolkit";
import { productDetailsReducer, productsReducer } from "./reducers/productReducer.js";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReduces.js";
import { cartReducer, myOrdersReducer } from "./reducers/cartReducer.js";
import { orderReducer } from "./reducers/orderReducer.js";

let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    },
};

const store = configureStore({
    reducer:{
        products: productsReducer.reducer,
        productDetails: productDetailsReducer.reducer,
        user:userReducer.reducer,
        profile:profileReducer.reducer,
        forgotpassword:forgotPasswordReducer.reducer,
        cart:cartReducer.reducer,
        newOrder:orderReducer.reducer,
        myOrders:myOrdersReducer.reducer
    },
    preloadedState:initialState
});


export default store;