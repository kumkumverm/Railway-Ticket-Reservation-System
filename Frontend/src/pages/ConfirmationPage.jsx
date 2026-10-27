// src/pages/ConfirmationPage.jsx
import React, {useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Ticket from '../Components/booking/Ticket';
const ConfirmationPage=()=>{
    const location =useLocation();
    const navigate=useNavigate();
    const [booking ,setBooking] =useState(null);
    useEffect(()=>{
       const bookingFromState=location.state?.booking;
       if(bookingFromState){
        setBooking(bookingFromState);
       }
       else{
        const bookings=JSON.parse(localStorage.getItem('bookings')||'[]');
        if(bookings.length>0){
            setBooking(bookings[booking.length-1]);
        }
       }
    },[location]);
    if(!booking){
        return(
            <div className="confirmation-error">
                <h2>No Booking Found</h2>
                <p>Unable to retrieve booking details. Please book a ticket first.</p>
                <button onClick={()=>navigate('/')} className="back-button">
                    Book a Ticket
                </button>
            </div>
        );
    }
    return(
        <div className="confirmation-page">
            <div className="conifrmation-header">
            <h1>Booking confirmed!</h1>
            <p className="subtitle">Your ticket has been booked successfully</p>
            <div className="confirmation-alert">
                <p>Your booking is confirmed. PNR: <strong>{booking.bookingId}</strong></p>
                <p>An email has been sent to {booking.contactInfo.email}</p>
            </div>
            </div>
            <div className="ticket-container-wrapper">
                <Ticket booking ={booking}/>
            </div>
            <div className="confirmation-actions">
                <button  onClick={()=>navigate('/')} className="secondary-btn">Back to Home</button>
                <button onClick={()=>navigate('/dashboard')} className="primary-btn">
                    View All Bookings
                </button>
                <button  onClick={()=>window.print()} className="print-btn">Print Ticket</button>
            </div>
        </div>

    )
}
export default ConfirmationPage;