import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";


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
    <Link className='productCard' to={product._id}>
        <img src={product.images[0].url} alt="" />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/>
            <span>Reviews: {product.numberofReviews}</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default Product