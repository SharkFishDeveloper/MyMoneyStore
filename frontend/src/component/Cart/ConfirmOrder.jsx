import React from 'react'
import { useSelector } from 'react-redux'
import CheckOutStepper from "./CheckOutStepper.jsx";
import { Link, useNavigate } from 'react-router-dom';
import "./ConfirmOrder.css";

const ConfirmOrder = () => {

    const navigate = useNavigate();
    const {user} = useSelector(state=>state.user);
    const {cartItems,shippingInfo} = useSelector((state)=>state.cart);

    let sum = 0;
    let totalPrice = cartItems.forEach(element => {
        sum += element.quantity * element.price;
    });

    const shippingCharges = sum < 1000 ? 0 : 20;
    const tax = sum*0.18;
    const finalPrice = Math.round(sum + shippingCharges + tax);

    const proceedToPayment = ()=>{
        const confirmProcessData = {
            sum,
            shippingCharges,
            tax,
            finalPrice
        }
        sessionStorage.setItem("OrderInfo", JSON.stringify(confirmProcessData));
        navigate("/process/payment");
    }

  return (
    <>
    <CheckOutStepper activeStep = {1}/>
    <div className='confirmOrderPage'>
        <div className="confirmOrderContainer">
            <div className="">
            {`Name : ${user.detailsOfuser.name}`}
            </div>

            <div>
                Phone : {shippingInfo.phone}
            </div>

            <div>
                Address : {`${shippingInfo.address} ,${shippingInfo.city} ,${shippingInfo.state} ,${shippingInfo.pincode}, ${shippingInfo.country}`}
            </div>

            <div>
                City : {shippingInfo.city}
            </div>

            <div className="cartItemContainer">
                <span>Cart items : </span>
                {cartItems && cartItems.map((product)=>(
                 <div key={product.id}>
                    <img src={product.image}/>
                    <Link to={`/product/${product.id}`} className='linkName'>{product.name}</Link>
                    <span>{product.quantity} X  ₹ {product.price} = {`₹ ${product.quantity*product.price}`}</span>
                 </div>   
                ))}               
            </div>
            

            <div className="orderTotal">
                <p>Total :</p>
                <span>₹ {finalPrice} </span>
            </div>

            <button className='confirmButton' onClick={proceedToPayment}> Proceed </button>

        </div>
    </div>
    </>
  )
}

export default ConfirmOrder;