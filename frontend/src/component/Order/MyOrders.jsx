import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearHistoryErrors, myOrdersAction } from '../../actions/orderAction';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated,isLoading} = useSelector(state=>state.user);
    const {orderHistory,orderHistoryLoading,orderHistoryError} = useSelector(state=>state.myOrders);
    
    if(isAuthenticated===false ){
        navigate("/register");
    }

    useEffect(() => {
        dispatch(myOrdersAction());
    }, [dispatch]);


   useEffect(() => {
        if (orderHistoryError) {
            toast.error(orderHistoryError);
            dispatch(clearHistoryErrors());
            console.log("In order history error");
        }
    }, [orderHistoryError]);


  return (
    <>
    {
        orderHistoryLoading? <Loader/>:
        <>
        <div>
            Order History
        </div>
        </>
    }
    </>
  )
}

export default MyOrders;