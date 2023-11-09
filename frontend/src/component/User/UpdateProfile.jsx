import React, { useEffect, useRef,useState } from 'react';
import "./Updateprofile.css";
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { clearErrors } from '../../actions/productActions';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const {userToUpdate} = useSelector((state)=>state.user);
    const {error,isLoading,isUpdated} = useSelector(state=>state.profile);
    
    const [oldName, setName] = useState("");
    const [oldEmail, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const updateProfileSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', oldName);
      formData.append('email', oldEmail);
      formData.append('avatar', avatar);
      dispatch(updateProfile(formData));
    };

    const registerDataChange =(e)=>{
      if(e.target.name==='avatar'){
        const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
      }
    }

    useEffect(()=>{
      if(error){
        console.log("Current error:", error);
        toast.error(error);
        dispatch(clearErrors());
      }
      if(isUpdated===true){
        toast.success("Updated profile successfully");
        dispatch(loadUser());
        navigate("/myaccount");
      }
    },[toast,dispatch,error,userToUpdate,isUpdated]);


  return (
    <>{isLoading ? <Loader/> :
    <div className="update-profile-container">
      <h1 className='heading'>Update your profile</h1>
        <form onSubmit={updateProfileSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={oldName} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter Name" 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={oldEmail} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter Email" 
              required
            />
          </div>

          <div className="fileAndUpload">
            <label htmlFor="avatar" className="custom-file-upload">
              Upload image
            </label>
            <input 
              type="file" 
              id="avatar" 
              name="avatar" 
              accept="image/*"
              onChange={registerDataChange}
              style={{ display: 'none' }}
            />
            {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />}
          

          <button type="submit" className="btn-update">Update Profile</button>
          </div>
        </form>
      </div>
    }</>
  )
}

export default UpdateProfile;