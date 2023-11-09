import React from 'react'
import { Link } from 'react-router-dom'
const Header = ({isAuthenticated}) => {
  
  return (

    <nav className="navbar navbar-expand bg-body-tertiary" style={{ position: 'relative' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold' }}>Ecommerse</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled">About</Link>
            </li>
          </ul>
           {!isAuthenticated &&  <Link className="nav-link " to="/register" style={{margin:8}}>Register</Link>}
           {/* {isAuthenticated &&  <FontAwesomeIcon icon={faUser} size="1x"  className="me-4" onClick={() => <UserAccount user={user}/>} />}   */}
           <Link to="/cart">Cart</Link>
            <Link to="/search">
            <button className="btn btn-outline-success" type="submit" >
              Search 
            </button></Link>
        </div>
      </div>
    </nav>
  )
}

export default Header