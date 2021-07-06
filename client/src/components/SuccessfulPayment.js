import React from 'react'
import logo from '../Media/payment-received.jpg'
import { Link } from "react-router-dom";
import '../Style/successfulpayment.css'
function SuccessfulPayment() {
    return (
        <>
        <div className='successfulpayment-container'>
            <img src={logo} alt='logo'/>
            <p>Order is received</p>
            <Link className="linkToMainMenu" to='/'>Go back shopping!</Link>
            
            
            
        </div>
        
        </>
    )
}

export default SuccessfulPayment
