import React from 'react'
import { faShippingFast, faClipboardCheck, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Step, Stepper } from 'react-form-stepper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CheckOutStepper = ({activeStep}) => {
    const steps = [
        {
         label:'Shipping details',
         icon:faShippingFast
        },
        {
            label: 'Confirm Order',
            icon: faClipboardCheck
        },
        {
            label: 'Payment',
            icon: faCreditCard
        }
    ];

    const stepperStyle = {
 
        borderRadius: '20px',       // Rounded edges
        padding: '20px',           // Padding on all sides
        
    };

  return (
    <>
    <Stepper activeStep={activeStep} style={stepperStyle}>
        {steps.map((item,index)=>(
            <Step key={index} title={item.label} >
               <FontAwesomeIcon icon={item.icon} size='lg' label={item.label}/>
           </Step>
        ))}
    </Stepper>
    </>
  )
}

export default CheckOutStepper;