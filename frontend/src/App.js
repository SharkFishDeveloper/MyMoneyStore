
import React from 'react';
//import './App.css';
import Header from "./component/visible/Header/Header.jsx";
import Footer from "./component/visible/Footer/Footer.jsx";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from 'react';
import Home from "./component/Home/Home.jsx";
import Products from "./component/Product/Products.jsx";
import ProductDetails from "./component/Product/ProductDetails.jsx"
import Search from "./component/Product/Search.jsx"

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  },[]);

  return (
    
    <Router>
   <Header/>
   <Routes>
   <Route exact path='/' element={<Home />}/>
   <Route exact path='/product/:id' element={<ProductDetails/>}/>
   <Route exact path='/products' element={<Products/>}/>
   <Route exact path='/search' element={<Search/>}/>
   <Route  path='/products/:keywords' element={<Products/>}/>
   </Routes>
   <Footer/>
   </Router>
   
  );
}

export default App;
