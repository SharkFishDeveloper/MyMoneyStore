import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import Payment from "./Payment.jsx";

const ConfirmOrderTemp = ({stripeApiPromise,stripeApiKey}) => {
    console.log("Checking api key",stripeApiKey);
  return (
    <>
    { stripeApiKey && (<Elements stripe={stripeApiPromise}>
        <Payment stripeApiPromise={stripeApiPromise} stripeApiKey={stripeApiKey}/>
    </Elements>)}
  )
  </>
  )
}

export default ConfirmOrderTemp;