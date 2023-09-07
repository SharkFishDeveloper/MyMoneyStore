import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import "../Product/productCard.css";

const Product = ({product}) => {

  const options={
    edit:false,
    color:"rgba(20,20,20)",
    activeColor:"tomato",
    size:window.innerWidth<600?17:20,
    value:product.ratings,
    isHalf:true
}

  return (
    <Link className='productCard' to={`/product/${product._id}`}>

      <img src={product.images[0].url} alt="" />

       <div className="productBox">
       <p>{product.name}</p>
       <hr className='horizontalRule'/>
        <div className='reviewBox' >
            <ReactStars {...options}/>
            <span>Reviews: {product.numberofReviews}</span>
        </div>
        <h6>{`₹${product.price}`}</h6>
       </div>
    </Link>
  )
}

export default Product