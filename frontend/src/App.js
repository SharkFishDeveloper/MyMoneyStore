// import './App.css';
import React, { useState } from 'react';
import Header from "./component/visible/Header/Header.jsx";
import Footer from "./component/visible/Footer/Footer.jsx";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from 'react';
import Home from "./component/Home/Home.jsx";
import Products from "./component/Product/Products.jsx";
import ProductDetails from "./component/Product/ProductDetails.jsx"
import Search from "./component/Product/Search.jsx"
import RegisterLogin from './component/User/RegisterLogin.jsx';
import Profile from './component/User/Profile.jsx';
import store from './store.js';
import { loadUser } from './actions/userActions.js';
import { useSelector } from 'react-redux';
import UserAccount from "./component/visible/Header/UserAccount.jsx";
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import ForgotPassword from "./component/User/ForgotPassword.jsx";
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import ConfirmOrderTemp from "./component/Cart/ConfirmOrderTemp.jsx";
import OrderPlaced from "./component/Cart/OrderPlaced.jsx";
import axios from 'axios';
import Payment from "./component/Cart/Payment.jsx";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyOrders from "./component/Order/MyOrders.jsx";

function App() {

  const {isAuthenticated,user} = useSelector(state=>state.user);
  const [stripeApiKey,setStripeApiKey] = useState("");
  const [stripeKey, setStripeKey] = useState(null);  
  
  async function getStripeApiKey() {
    try {
        const { data } = await axios.get("http://localhost:4000/ecom/v1/stripeApiKey", { withCredentials: true });
        //setStripeApiKey(data.stripeApiKeyReveal);
        console.log(data.stripeApiKeyReveal);
        console.log(stripeApiKey);
        //const stripeInstance = loadStripe(data.stripeApiKey);
        //setStripe(stripeInstance);
        setStripeApiKey(data.stripeApiKeyReveal);
        setStripeKey(loadStripe(data.stripeApiKeyReveal));
        console.log(setStripeKey);
    } catch (error) {
        console.error("Error fetching Stripe API key:", error.response);
    }
}

  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  return (
    
  <Router>
   <Header isAuthenticated={isAuthenticated} />
   {isAuthenticated && <UserAccount user={user}/>}
   <Routes>
   <Route exact path='/' element={<Home />}/>
   <Route exact path='/product/:id' element={<ProductDetails/>}/>
   <Route exact path='/products' element={<Products/>}/>
   <Route exact path='/search' element={<Search/>}/>
   <Route  path='/products/:keywords' element={<Products/>}/>
   <Route exact path='/register' element={<RegisterLogin/>}/>
   <Route exact path='/myaccount' element={<Profile/>}/>
   <Route exact path='/user/update' element={<UpdateProfile/>}/>
   <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
   <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
   <Route exact path='/cart' element={<Cart/>}/>
   <Route exact path='/shipping' element={<Shipping/>}/>
   <Route exact path='/order/confirm' element={<ConfirmOrder/>}/>
   
   {setStripeApiKey && <Route exact path='/process/payment' element={<ConfirmOrderTemp stripeApiPromise={stripeKey} stripeApiKey={stripeApiKey}/> } />}

   <Route exact path='/orderPlaced' element={<OrderPlaced/>}/>

   <Route exact path='/orders' element={<MyOrders/>}/>

   </Routes>
   <Footer/>
   </Router>
   
  );
}

export default App;
