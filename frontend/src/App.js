
import React from 'react';
import './App.css';
import Header from "./component/visible/Header/Header.jsx";
import Footer from "./component/visible/Footer/Footer.jsx";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from 'react';
import Home from "./component/Home/Home.jsx";


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
   </Routes>
   <Footer/>
   </Router>
   
  );
}

export default App;
