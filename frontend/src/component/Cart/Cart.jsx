import React from 'react'
import CartItem from "./CartItem.jsx";
import "./Cart.css";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const loggedUser = useSelector((state)=>state.user);
    const {cartItems} = useSelector((state)=>state.cart);
    let cartsum=0;
    // cartItems.forEach((element) => {
    //     cartsum += (element.price*element.quantity);
    // });
    if (typeof cartItems === 'object' && cartItems !== null) {
        console.log('cartItems is an object:', cartItems);
      }
    if (Array.isArray(cartItems)) {
        cartItems.forEach((element) => {
          cartsum += element.price * element.quantity;
        });
      } else {
        console.error('cartItems is not an array:', cartItems);
      }

    const checkOutHandler = ()=>{       
            navigate("/register?redirect=shipping");       
    }

  return (
    <>
    {cartItems.length===0 ? 
    (<><div className="emptyCartContainer">
        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        <p>No items in cart ...</p>
        </div></>):(
        <div className="cartPage">
        <div className="cartHeading">
            <p>Product</p>
            <p>Quantity</p>
            <p>Price</p>
        </div>
    
    <div className="CartProductItem">
        {cartItems && cartItems.map((cartItem,index) => <CartItem item={cartItem} key={cartItem.id} index={index}/>)}
    </div>

    <div className="checkOutContainer">
        <div className="grossTotal">
            <div className="title">Total price</div>
            <div className="grossPrice">           
            ₹ {cartsum}
            </div>
        </div>
        <div className="checkOutButton" onClick={checkOutHandler}>
            Check Out
        </div>
    </div>
    </div>
    )}
    
    </>
  )
}

export default Cart;