// src/pages/BookingPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import BookingForm from '../Components/booking/BookingForm';

const BookingPage=()=>{
    const location =useLocation();
    const train=location.state?.train;

    if(!train){
        return (
            <div className="booking-error">
                <h2>No Train Selected</h2>
                <p>Please go back and select a train to book.</p>
                <button onClick={()=>window.history.back()} className="back-button">
                    Go Back
                </button>
            </div>
        );
    }
    return (
        <div className="booking-page">
            <BookingForm train={train}/>

        </div>
    );
};
export default BookingPage;