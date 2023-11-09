import React from 'react'
import "./OrderPlaced.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faList } from '@fortawesome/free-solid-svg-icons';

const OrderPlaced = () => {
    return (
        <div className="order-placed-container">
          <h2>Thank You For Your Order!</h2>
          <Link to="/products">
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
        Continue shopping</Link>
          <Link to="orders">
            <FontAwesomeIcon icon={faList} className="icon" />View orders </Link>
        </div>
      );
}

export default OrderPlaced