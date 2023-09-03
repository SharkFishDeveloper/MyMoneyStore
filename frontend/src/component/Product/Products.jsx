import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../actions/productActions';
import Loader from '../Loader/Loader.jsx';
import Product from '../Home/Product';
import { toast } from 'react-toastify';
import "./allproductsScreen.css";
import { useParams } from 'react-router-dom';

const Products = ({match}) => {

  const dispatch = useDispatch();
  const {loading,products,error,totalProducts,resultPerPage} = useSelector((state)=>state.products);
  const { keywords } = useParams();




  useEffect(()=>{
  dispatch(fetchAllProducts(keywords));
  if(error){
    toast.error(error);
  }
  },[dispatch,keywords]);

  return (
   <>
    {loading ? <Loader/> :<>
    
    <h2 className='productsHeading'>All products</h2>
    <div className='allproductsContainer'>
      {products && products.map((product)=>(
        <Product  key={product._id} product={product}/>
      ))}
    </div>
    </> }
   </>
  )
}

export default Products