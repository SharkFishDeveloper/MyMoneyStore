import React, { useState } from 'react'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import "./UserAccount.css";
import { logout } from '../../../actions/userActions.js';
import { useDispatch } from 'react-redux';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import Loader from "../../Loader/Loader.jsx";
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');
const UserAccount = ({user}) => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();
  return (
    <> <div>Logged in</div>
     <FontAwesomeIcon id='profileImage'
        icon={faUserCircle} 
        alt="Profile image" 
        style={{ cursor: 'pointer',zIndex:1000 }} 
        onClick={() => setModalIsOpen(true)}
      />
    <Modal className="userAccountModal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
            overlay: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            content: {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                right: 'auto',
                bottom: 'auto'
            }
        }}
      >
        <div className="userImageContainer">
        <img src={user.detailsOfuser.avatar.url} alt="Profile img" />
        <p>Welcome {user.detailsOfuser.name}</p>
        </div>
        <hr />
        {user.detailsOfuser.role==="admin" && <button onClick={() => {
          setModalIsOpen(false);
        }}>Dashboard</button>}
        <button onClick={() => {
          setModalIsOpen(false);
        }}>
          View Product Details
        </button>
        <button onClick={() => {
            navigate('/products');
            setModalIsOpen(false);
            
            }}>Close</button>
            <button onClick={() => {
           dispatch(logout());      
          setModalIsOpen(false);
        }}>Log out</button>
        <Link to="/myaccount" className='myaccount'>My account</Link>
        <Link to="/cart" className='myCart'>
        <FontAwesomeIcon icon={faCartArrowDown} className="cartIcon" />
        </Link>
      </Modal>
      </>
    
  )
}

export default UserAccount;