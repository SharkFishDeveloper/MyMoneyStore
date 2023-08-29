import React from 'react'
import "../Footer/Footer.css";
const Footer = () => {
  return (
    <footer id='footer'>
      <div className="leftFooter">
        <h4>Purchase from the most influential store</h4>
        <p>Try us cause we are the best</p>
      </div>

      <div className="midFooter">
        <h1>Ecommerse</h1>
        <p>High quality is our topmost priority</p>
        <p>Copyright ©2023 </p>
      </div>

      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="http://youtube.com">Youtube</a>
        <a href="http://google.com">Google</a>
        <a href="http://instagram.com">Instagram</a>
      </div>
    </footer>
  )
}

export default Footer