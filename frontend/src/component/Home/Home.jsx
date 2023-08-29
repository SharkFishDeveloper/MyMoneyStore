import React from 'react'
import "./Home.css";
import Product from "./Product.jsx";
const Home = () => {


  const product = {
    name:"PLay station",
    images:[{url:"https://www.reliancedigital.in/medias/Sony-Playstation5-Gaming-Consoles-491936180-23?context=bWFzdGVyfGltYWdlc3w5NDM4fGltYWdlL2pwZWd8aW1hZ2VzL2hmMC9oNWIvOTQ1NDMwNzgzNTkzNC5qcGd8YmU1NWE0Zjg1MjdkZGQ3MDQ3MzU4MzMwZWZkNzMzMzJkODViYzQ1MGRkODk3YWM4MGYwNWRhYjEyMTljNjhmZQ"}],
    price:"50000",
    _id:"Shahzeb"
  }
  return (
    <>
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
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      
    </div>
    </>
  )
}

export default Home