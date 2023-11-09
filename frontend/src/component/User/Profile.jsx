import React, { useEffect } from 'react';
import MetaData from '../visible/MetaData';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";


const Profile = () => {

    const navigate = useNavigate();
    const {user,isAuthenticated,isLoading=false} = useSelector(state=>state.user);
    console.log('User from Redux:', user);


    useEffect(()=>{
        if(user==null){
            navigate('/products');
        }
    },[user,isAuthenticated]);


  return (
    
    isLoading ? <Loader/>:
    <>
    <MetaData title={user.detailsOfuser.name}/>
    <div className="profileHeaderContainer">
        <div className="userBox">
            <h2>My profile</h2>
            <p>{`Name : ${user.detailsOfuser.name}`}</p>
            <p>{`Email: ${user.detailsOfuser.email}`}</p>
            <img src={user.detailsOfuser.avatar.url} alt="Profile image" />
            
            <p>{`Joined on :${String(user.detailsOfuser.joinedOn).substring(0,10)}`}</p>
        </div>
        <div className="orders">
            <Link to="/orders"> See your orders</Link>
        </div>
        <div className="updateUserContainer">
        <Link to="/user/update">Update your profile</Link>
        </div>
    </div></>
    
    
  )
}

export default Profile;
