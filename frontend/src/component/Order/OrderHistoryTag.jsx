import React from 'react'
import { useSelector } from 'react-redux';
import "./OrderHistoryTag.css";

const OrderHistoryTag = ({order}) => {

  return (
    <div className="order-history-tag">
      <div className="order-details">
        <h5>Order Placed: {order.purchasedAt.substring(0,10)}</h5>
      </div>

      <div className="shipping-details">
        <address>
          <p>
            Shipping Address: {order.userOrderInfo.address}, {order.userOrderInfo.city}, {order.userOrderInfo.state}, {order.userOrderInfo.country} - {order.userOrderInfo.pincode}
          </p>
        </address>
        <p>Phone: {order.userOrderInfo.phone}</p>
      </div>

      <div className="ordered-items">
        <p>Ordered Items:</p>
        <div className="item-list">
          {order.orderedItem.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-image">
              <span>{`${index+1} .)`}</span>
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">            
                <p className="item-name">{item.name}</p>
                <p className="item-price">Price: {item.price}</p>
                <p className="item-quantity">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-summary">
        <h6>Order Summary:</h6>
        <div className="summary-details">
          <p>Items Price: {" ₹ "+order.itemsPrice}</p>
          <p>Tax Price: {" ₹ "+order.taxPrice}</p>
          <p>Shipping Price: {" ₹ "+order.shippingPrice}</p>
          <strong>Total Price: {" ₹ "+order.totalPrice}</strong>
        </div>
      </div>

      <div className="order-status">
        <strong>Order Status:</strong> {order.orderStatus}
      </div>
    </div>
  )
}

export default OrderHistoryTag;