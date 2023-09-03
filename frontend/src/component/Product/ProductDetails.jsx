import React, { useEffect } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from '../../actions/productActions';
import { useParams } from 'react-router-dom' ;
import Loader from '../Loader/Loader';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.jsx";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ProductDetails = ({match}) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {product,loading,error} = useSelector((state)=>state.productDetails);
    useEffect(()=>{
        dispatch(getProductDetails(id));
        if(error){
          toast.error(error);
          dispatch(clearErrors());           
        }             
    },[dispatch,error,id]);

    const options={
        edit:false,
        color:"rgba(20,20,20)",
        activeColor:"tomato",
        size:window.innerWidth<600?17:20,
        value:product.ratings,
        isHalf:true
    }
  return (
    <>
    {loading||error? <Loader/>:
    <>
    <div className="productDetails">
            <div className='carouselContainer'>
              <Carousel className='carousel'>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className='outerBox'>
            <div className="detailsBlock-a">
                <h1>{product.name}</h1>
            
            <div className="detailsBlock-b">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-c">
                <h3>{`₹ ${product.price}`}</h3>
                {product.real==='true' &&
                <div className="detailsBlock-d">
                <div className="detailsBlock-e">
                  <button >-</button>
                  <input readOnly type="number" />
                  <button >+</button>
                </div>
                <button
                  disabled={product.Stock < 1 ? true : false}  
                >
                  Add to Cart
                </button>
              </div> }
                
                <div className="inStock" style={{ color: product.Stock > 0 ? 'green' : 'red' }}>
                  {product.Stock>0? "In Stock":"Not available"}
                </div>

                <div className="detailsBlock-f">
                  <span className='desc'>Description:</span>
                  <span><p>{product.description}</p></span>
                </div>
                <button className="submitReview">
                  Submit your review
                </button>
                </div>
                </div>
                </div>
        </div> 
        <div className="reviewsofUsers"> <span>Product reviews: {product.NumberofReviews}</span>
        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </div>
        </>
        
   }   </>      
  )
}

export default ProductDetails;