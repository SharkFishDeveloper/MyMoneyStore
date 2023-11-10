import React from 'react'
import { Link } from 'react-router-dom';
import "./CartItem.css";
import { removeProductFromCart } from '../../actions/cartActions';
import { useDispatch } from 'react-redux';

const CartItem = ({item,index}) => {
    const dispatch = useDispatch();
    const removeFromCart = ()=>{
        dispatch(removeProductFromCart(item.productid));
    };

  return (
    <div className='CartProductCard'>

        
        <span className="itemIndex">{`${index + 1}.)`}</span>  
        <div className='imageAndName'>
        <img src={item.image} />
        <Link to={`/product/${item.productid}`}>{item.name}</Link>
        
        </div>

        <span className='itemQuantity'>{item.quantity}</span>
        <span className='itemPrice'>{`₹ ${item.price*item.quantity}`}</span>
        <span className='removeFromCart' onClick={removeFromCart}>Remove</span>
    </div>
  )
}

export default CartItem;