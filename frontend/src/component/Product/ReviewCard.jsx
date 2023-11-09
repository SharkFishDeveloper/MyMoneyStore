import React from 'react'
import ReactStars from "react-rating-stars-component";
import "./ReviewCard.css";


const ReviewCard = ({review}) => {
    const options={
        edit:false,
        color:"rgba(20,20,20)",
        activeColor:"tomato",
        size:window.innerWidth<600?17:20,
        value:review.rating,
        isHalf:true
    }
    return (
        <div className="reviewCard">
          <img src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg" alt="User"  className="circleAvatar"/>
          <p>{review.name}</p>
          <ReactStars {...options} />
          <span className="reviewCardComment">{review.comment}</span>
        </div>
      );
}

export default ReviewCard;