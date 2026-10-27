// src/Components/dashboard/BookingCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashBoard.css';

const BookingCard =({booking})=>{
     const navigate=useNavigate();
    return(
        <div className="booking-card">
            <div className="booking-card-header">
                <h3>PNR:{booking.bookingId}</h3>
                <span className='train-name'>{booking.train.trainName}</span>
            </div>
            <div className="booking-details">
                <p><strong>Route:</strong>from {booking.train.source} to {booking.train.destination}</p>
                <p><strong>Passengers:</strong>{booking.passengers.length}</p>
                <p><strong>Amount</strong> ₹{booking.totalFare}</p>
                <p><strong>Date:</strong> {new Date(booking.bookingData).toLocaleDateString()}</p>
            </div>
            <div className="booking-actions">
                <button onClick={()=>navigate('/confirmation',{state:{booking}})} className="view-btn">View Ticket</button>
            </div>
        </div>
    );
};
export default BookingCard;