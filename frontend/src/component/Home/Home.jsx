import React, { useEffect } from 'react'
import "./Home.css";
import Product from "./Product.jsx";
import MetaDate from "../visible/MetaData.jsx";
import { Provider, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../actions/productActions.js';
import { UseSelector,useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const Home = () => {
  const dispatch = useDispatch();
  const {loading,products,error,totalProducts} = useSelector((state)=>state.products);
  useEffect(()=>{
    dispatch(fetchAllProducts());
    if (error) {
      toast.error(error);
    }
  },[dispatch,error]);

  return (
    <>
    {loading? <Loader/>:<>
    <MetaDate title={"Ecommerse"}/>
    <div className="welcomeScreen">
       <div id='leftScreen'>
       <h1> World's finest products at the touch of your fingertips.
       Discover why thousands of customers trust us for their daily shopping needs.
       </h1>
       <p>  At Lazer, we believe in quality, convenience, and a personalized shopping experience. Dive into our diverse range of categories, from fashionable apparel and accessories to cutting-edge tech gadgets, home decor, and more.</p>
       <h2>See amazing products below</h2>
       </div>
       <div id='rightScreen'>
        <img src="https://img.freepik.com/free-photo/front-view-hardback-books-library_23-2148827223.jpg" alt="" />
       </div>
    </div>
    <h2 className="featuredProducts">Featured products</h2>
    <div className='container' id='container'>
      {totalProducts}
      {products && products.map(products=>(<Product product={products}/>))}
    </div></>}
    <ToastContainer position="bottom-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"/>
    </>
  )
}

export default Home