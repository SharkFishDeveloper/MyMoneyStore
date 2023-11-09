import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Country,State} from 'country-state-city';
import "./Shiping.css";
import MetaData from '../visible/MetaData';
import CheckOutStepper from "./CheckOutStepper.jsx";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../actions/cartActions';


const Shipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {shippingInfo} = useSelector((state)=>state.cart);

    const [address,setAddress] = useState(shippingInfo.address);
    const [city,setCity] = useState(shippingInfo.city);
    const [state,setState] = useState(shippingInfo.state);
    const [country,setCountry] = useState(shippingInfo.country);
    const [pincode,setPincode] = useState(shippingInfo.pincode);
    const [phone,setPhone] = useState(shippingInfo.phone);

    const countries = Country.getAllCountries();

    const submitShippingInfo = (e)=>{
        e.preventDefault();
        if(phone.length > 10 || phone.length < 10){
            toast.error("Phone number should be of appropriate length");
            return ;
        }
        dispatch(saveShippingInfo({address,city,state,phone,country,pincode}));
        navigate("/order/confirm");
    }

  return (
    <>
    <MetaData title="Shipping details"/>
    <CheckOutStepper activeStep = {0}/>
    <div className='shippingPage'>
        <div className="shippingContainer">
            <h2 className="shippingHeading">Shipping Details</h2>

            <form className='shippingForm' onSubmit={submitShippingInfo}>
                <div>
                <input type="text" placeholder='Address' required
                value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>

                <div>
                <input type="text" placeholder='City' required
                value={city} onChange={(e)=>setCity(e.target.value)}/>
                </div>

                <div>
                <input type="number" placeholder='Pin-code' required
                value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                </div>

                <div>
                <input type="number" placeholder='Phone-number' required
                value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </div>

                <div>
                <select required value={country} onChange={(e)=>setCountry(e.target.value)}>
                    <option value="">Country</option>
                    {countries.map((country)=>(
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                        </option>  
                    ))}
                </select>
                </div>

                {country && (
                    <div>
                        <select required value={state} onChange={(e)=>setState(e.target.value)}> 
                        <option value="">State</option>
                        {State.getStatesOfCountry(country).map((state)=>
                            (<option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                            </option>)
                        )}                      
                        </select>
                    </div>
                )}
                
                {state && <button type='submit'>Next</button>}

            </form>
        </div>
    </div>
    </>
  )
}

export default Shipping;