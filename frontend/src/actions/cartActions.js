import { add_to_cart_request, remove_from_cart, save_shipping_info } from "../reducers/cartReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addItemInCart = createAsyncThunk("addtocart",async(cartBody ,thunkAPI)=>{

        const {id,quantity} = cartBody;
        try {
            const { data } = await axios.get(`http://localhost:4000/ecom/v1/product/${id}`);
        
            const itemDetails = {
              productid: data.product._id,
              name: data.product.name,
              price: data.product.price,
              stock: data.product.Stock,
              image: data.product.images[0].url,
              quantity,
            };
        
            thunkAPI.dispatch(add_to_cart_request(itemDetails));
             // Retrieve existing cartItems from localStorage
    let existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Ensure existingCartItems is an array
    if (!Array.isArray(existingCartItems)) {
        existingCartItems = [];
    }

    // Add the new item to the existing cartItems
    existingCartItems.push(itemDetails);

    // Save the updated cartItems back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
            // const cartItems = thunkAPI.getState().cart.cartItems;
            // localStorage.setItem("cartItems", JSON.stringify(itemDetails));
          } catch (error) {
            // Handle errors, e.g., display an error message or dispatch an error action.
            console.error("Error adding item to cart:", error);
          }
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
