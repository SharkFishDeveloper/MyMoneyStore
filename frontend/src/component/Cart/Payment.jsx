import React, { useEffect, useRef } from 'react'
import {
  CardNumberElement, 
  CardCvcElement, 
  CardExpiryElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import MetaData from '../visible/MetaData';
import CheckOutStepper from "./CheckOutStepper.jsx";
import { Elements } from '@stripe/react-stripe-js';
import { faCreditCard, faCalendarAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Payment.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearOrderErrors,createNewUserOrder } from '../../actions/orderAction';


const Payment = ({stripeApiPromise}) => {

   const {user} = useSelector(state=>state.user);
   const orderInfo = JSON.parse(sessionStorage.getItem("OrderInfo"));
   const {shippingInfo} = useSelector(state=>state.cart);
   const {cartItems} = useSelector(state=>state.cart);
   const navigate = useNavigate();
   console.log(user.detailsOfuser.name , user.detailsOfuser.email );
   const buttonRef = useRef(null);
   const stripe = useStripe();
   const elements = useElements();
  const {error} = useSelector((state)=>state. newOrder);
  const dispatch = useDispatch();
  
  const order = {
    shippingInfo,
    orderedItem:cartItems,
    itemsPrice:orderInfo.sum,
    taxPrice:orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.finalPrice,
    userId:user.detailsOfuser._id
  }
    const paymentHadler = async (e)=>{
      e.preventDefault();
      // if (buttonRef.current) {
      //   buttonRef.current.disabled = true;
      // }
      buttonRef.current.disabled = true;
      // console.log("Cart items:" , cartItems);
      // console.log("shippingInfo:" , shippingInfo);
      // console.log("shippingInfo-phone:" , shippingInfo.phone);
      const paymentBody = {
        amount : orderInfo.finalPrice * 100,
      }
      // dispatch(createNewUserOrder(order));
      // navigate("/orderPlaced");
      try {
        const config = {
          headers:{
            "Content-type":"application/json",
          },
          withCredentials: true
        }
        const response = await axios.post("http://localhost:4000/ecom/v1/payment/process", paymentBody, config);
        //navigate("/orderPlaced");
        const paymentData = response.data;  
        console.log("Payment Data:", paymentData.client_secret);
        const client_secret_key =  paymentData.client_secret;

        if(!stripe || !elements) return ;
        const result = await stripe.confirmCardPayment(client_secret_key,{
          payment_method:{
            card:elements.getElement(CardNumberElement),
            billing_details:{
              name: user.detailsOfuser.name,
              email:user.detailsOfuser.email,
              address:{
                line1:shippingInfo.address,
                city:shippingInfo.city,
                state:shippingInfo.state,
                postal_code:shippingInfo.pincode,
                country:shippingInfo.country
              }             
            },
          }
        });
        if(result.error){
          buttonRef.current.disabled=false;
          toast.error(result.error.message);
        }
        else{
          if(result.paymentIntent.status==="succeeded"){
            order.paymentInfo = {
              id:result.paymentIntent.id,
              status:result.paymentIntent.status
            }
            dispatch(createNewUserOrder(order));
            navigate("/orderPlaced");
          }else{
            toast.error("Some issue in processing order");
            console.log(error);
          }
        }
      } catch (error) {
        console.error("Detailed Error:", error);
        buttonRef.current.disabled=false;
        toast.error("Error in payment button ", error.response.data.message);
      }
    }

    useEffect(()=>{
      if(error){
        toast.error(error);
        dispatch(clearOrderErrors());
      }
    },[dispatch,error,toast]);



    const orderInformation = JSON.parse(sessionStorage.getItem("OrderInfo"));;
    console.log(orderInformation.finalPrice);
  return (
    <div>
     
        
       <MetaData title="Payment" /> 
       <CheckOutStepper activeStep={2}/>
       
       <div className="paymentContainer">
       <span className='headingpayment'>Enter card information</span>
        <div className="paymentFormContainer">
            <form className='paymentForm' onSubmit={(e)=>paymentHadler(e)}>
            
            <div className="inputWithIcon">
            <CardExpiryElement className='paymentCard'/>
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
            </div>

            <div className="inputWithIcon">
            <CardCvcElement className='paymentCard'/>
            <FontAwesomeIcon icon={faLock} className="icon" />
            </div>

            <div className="inputWithIcon">
            <CardNumberElement className='paymentCard'/>
            <FontAwesomeIcon icon={faCreditCard} className="icon" />
            </div>

            {orderInformation && <button className='finalPayment' type='submit' ref={buttonRef}>{`Pay -  ₹ ${orderInformation.finalPrice}`}</button>}
            </form>
        </div>
       </div>
      
    </div>

  )
}

export default Payment;
