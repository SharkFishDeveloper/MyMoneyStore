import React, { useState } from 'react'
import "./Search.css";
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const Search = ({}) => {
    const [keyword,searchKeyword] = useState("");
    const navigate = useNavigate();
    const searchProducts = (e)=>{
        e.preventDefault();
        
        if(keyword.trim()){
            
             //history.push(`/products/${keyword}`);
             navigate(`/products/${keyword}`);
            // const  navigate  = useNavigation(); 
            // navigate(`/products/${keyword}`);
        }else{
            navigate(`/products`);
            //navigate(`/products`);
        }
        //! in searchProducts why not use "to -> /products/${search}" instead of history
    }
  return (
    <div className="box">
        <div>
        <form className="searchBox" onSubmit={searchProducts}>
            <input type="text" 
            placeholder='Search product...' 
            id="inputBox"  
            onChange={(event)=>searchKeyword(event.target.value)}/>
            <input type="submit" value="Search" />
        </form>
    </div>
    </div>
  )
}

export default Search;