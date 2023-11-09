import React, { useEffect } from 'react'
import { useState } from 'react';
import "./ForgotPassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors,forgotPassword, resetPassword } from '../../actions/userActions';
import { useParams } from 'react-router-dom';
import "./ResetPassword.css"

const ResetPassword = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');
    const {error,isLoading,message,success} = useSelector((state)=>state.forgotpassword);
    let { token } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmpassword', confirmpassword);
        dispatch(resetPassword({token:token,formData:formData}));  
        console.log("Reset password process ongoing");
    };

    useEffect(()=>{
        if(success==true){
            toast.success("Password updated successfully");
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors());
            //dispatch(userReducer.actions.clear_errors());

        }
    },[dispatch,message,error,success]);

    return (
        <div className='resetPasswordContainer'>
            <h2 className='resetPasswordheading'>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className='setPasswordContainer'>
                <label>
                    New Password:
                    <input 
                        type="password" 
                        value={password}
                        placeholder='New password' 
                        onChange={e => setPassword(e.target.value)} 
                        required
                    />
                </label>
                </div>
                <div className='setConfirmPasswordContainer'>
                <label>
                    Confirm Password:
                    <input 
                        type="password" 
                        value={confirmpassword}
                        placeholder='Confirm password' 
                        onChange={e => setconfirmPassword(e.target.value)} 
                        required
                    />
                </label>
                </div>
                <button type="submit">Update password</button>
            </form>
        </div>
    );
}

export default ResetPassword;