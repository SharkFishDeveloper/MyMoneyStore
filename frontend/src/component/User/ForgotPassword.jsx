import React, { useEffect } from 'react'
import { useState } from 'react';
import "./ForgotPassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, forgotPassword } from '../../actions/userActions';
import { userReducer } from '../../reducers/userReduces';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const {error,isLoading,message,forgotSuccess} = useSelector((state)=>state.forgotpassword);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(forgotPassword(email));  //* i filled it in in input box
        console.log("Password reset link sent to:", email);
    };

    useEffect(()=>{
        if(forgotSuccess==true){
            toast.success("Email sent");
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors());
            //dispatch(userReducer.actions.clear_errors());

        }
    },[dispatch,forgotSuccess,message,error]);

    return (
        <div className='forgotPasswordContainer'>
            <h2 className='forgotPasswordheading'>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required
                    />
                </label>
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
}

export default ForgotPassword;