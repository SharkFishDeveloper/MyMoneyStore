//import {combineReducers,applyMiddleware} from "redux";

//import thunk from "redux-thunk";
//import {composeWithDevTools} from "redux-devtools-extension";
//import productDetailsReducer from "./reducers/productReducer.js";
//import { productReducer, productDetailsReducer } from './reducers/productReducer.js';
//import productsReducer from "./reducers/productReducer.js";
//import productDetailsReducer from "./reducers/productReducer.js";
//import productsReducer from "./reducers/productReducer.js";
import {configureStore} from "@reduxjs/toolkit";
import { productDetailsReducer, productsReducer } from "./reducers/productReducer.js";

const store = configureStore({
    reducer:{
        products: productsReducer.reducer,
        productDetails: productDetailsReducer.reducer,
    }
});


export default store;

 //const middleware = [thunk];

// const store = configureStore(
//     reducer,
// );