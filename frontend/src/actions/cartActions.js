import { add_to_cart_request, remove_from_cart, save_shipping_info } from "../reducers/cartReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addItemInCart = createAsyncThunk("addtocart",async(cartBody ,thunkAPI)=>{

        const {id,quantity} = cartBody;
        const {data} = await axios.get(`http://localhost:4000/ecom/v1/product/${id}`);

        const itemDetails = { 
            productid:data.product._id,    
            name:data.product.name,
            price:data.product.price,
            stock:data.product.Stock,
            image:data.product.images[0].url,
            quantity
        };

        thunkAPI.dispatch(add_to_cart_request(itemDetails));
        console.log(id);

        const cartItems = thunkAPI.getState().cart.cartItems;

        // let cartItems = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[];

        // const findExistingIndex = cartItems.findIndex(item => 
        //     item.id===itemDetails.id
        // );

        // if(findExistingIndex >=0){
        //     cartItems[findExistingIndex].quantity += itemDetails.quantity;
        // }else{
        //     cartItems.push(itemDetails);
        // }

        localStorage.setItem("cartItems",JSON.stringify(cartItems));
    }
);

export const removeProductFromCart = createAsyncThunk(("removeCartItem"),
async(id,thunkAPI)=>{
    thunkAPI.dispatch(remove_from_cart(id));
    const currentCartItems = thunkAPI.getState().cart.cartItems;
    localStorage.setItem("cartItems",JSON.stringify(currentCartItems));
}
);


export const saveShippingInfo = createAsyncThunk("shippingInfo",
async(shippingData,thunkAPI)=>{
    thunkAPI.dispatch(save_shipping_info(shippingData));

    localStorage.setItem("shippingInfo",JSON.stringify(shippingData));
});
