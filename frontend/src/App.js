
import React from 'react';
// import './App.css';
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


function App() {

  const {isAuthenticated,user} = useSelector(state=>state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
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
   </Routes>
   <Footer/>
   </Router>
   
  );
}

export default App;
