import {combineReducers,applyMiddleware} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import productReducer from "./reducers/productReducer.js";

const store = configureStore({
    reducer:{
        products:productReducer,
    }
});


export default store;

 //const middleware = [thunk];

// const store = configureStore(
//     reducer,
// );