import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, fetchAllProducts } from '../../actions/productActions';
import Loader from '../Loader/Loader.jsx';
import Product from '../Home/Product';
import { toast } from 'react-toastify';
import "./allproductsScreen.css";
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "../util/paginationBox.css"
import Slider  from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MetaData from '../visible/MetaData';
import { useNavigate } from 'react-router-dom';

const Products = () => {

  const categories = [
    "Laptop",
    "Books",
    "Tablets",
    "Electronics",
    "Furniture",
    "Tv",
    "Computer",
    "Phones",
    "Ac",
    "Hardware",
    "Toys"
  ];

  const dispatch = useDispatch();
  const {loading,products,error,totalProducts,resultPerPage,filteredProductsCount} = useSelector((state)=>state.products);

  const { keywords } = useParams();
  const [currentpage,setCurrentpage]=useState(1);
  const [price,setPrice] = useState([0,50000]);
  const [localPrice, setLocalPrice] = useState(price);
  const [category,setCategory] = useState("");

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
  dispatch(fetchAllProducts({
    keywords: keywords||"",
    page: currentpage,
    price,
    category
  }));

  },[currentpage,price,keywords,dispatch,category,error]);


  const handlePageClick = (e) => {
    console.log("Page clicked:", e.selected);
   setCurrentpage(e.selected+1);
};


const priceHandler = (event,newPrice)=>{
  setLocalPrice(newPrice);
};
const handleSliderRelease = () => {
  setPrice(localPrice); 
};

  let count = filteredProductsCount;



  return (
   <>
    {loading ? <Loader/> :<>
    <MetaData title="All products"/>
    <h2 className='productsHeading'>All products</h2>
    <div className='allproductsContainer'>
      {products && products.map((product)=>(
        <Product  key={product._id} product={product}/>
      ))}
    </div>
    <div className="filterSlider">
      <Typography>Filter price</Typography>
        <Slider 
         value={localPrice}
         onChange={priceHandler}
         onBlur={handleSliderRelease}
         onMouseUp={handleSliderRelease}
         aria-labelledby="range-slider"
         min={0}
         max={50000}
         valueLabelDisplay='auto'
        />
    </div>
    <div className="categories">
      <Typography>Categories</Typography>
      <ul className='listOfCategories'>
        {categories.map((category)=>(
          <li className='category-drop' key={category} 
          onClick={()=>{
            setCategory(category);
          }}>
            {category}
          </li>
        ))}
      
      </ul>
    </div>
    {resultPerPage<count && <div className="paginationBox">
    <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={Math.ceil(count/resultPerPage)}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
      />
    </div>}
    <span>{`currentpage is ${currentpage}`}</span>
    </> }
   </>
  )
}
//!fix the pagination 
export default Products