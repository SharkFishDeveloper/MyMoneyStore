import React, { useEffect } from 'react';
import MetaData from '../visible/MetaData';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const {user,isAuthenticated,isLoading} = useSelector(state=>state.user);
    console.log(user);

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/');
        }
    },[isAuthenticated]);
    console.log(user);

  return (
    
    isLoading ? <Loader/>:
    <>
    {/* <MetaData title={user.user.name}/> */}
    <div className="profileHeaderContainer">
        <div className="userBox">
            <h1>My profile</h1>
            {/* <p>{`Email: ${user.user.email}`}</p> */}
            {/* <img src={user.user.avatar.url} alt="Profile image" />
            <p>{`Email: ${user.user.email}`}</p>
            <Link to="/user/update">Update your profile</Link> */}
            {/* <h2>{user.user.avatar.url}</h2> */}
        </div>
        <div className="orders">
            <Link to="/orders"> See your orders</Link>
        </div>
    </div></>
    
    
  )
}

export default Profile;
