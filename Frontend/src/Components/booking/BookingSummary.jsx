// src/Components/booking/BookingSummary.jsx
import React from 'react';
import './booking.css';
const BookingSummary=({train,selectedClass,passengers,totalFare})=>{
    const calculateTotal=()=>{
        return passengers.length*totalFare;
    };
    return(
        <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-card">
                <div className="train-summary">
                    <h4>{train.trainName}</h4>
                    <p className="train-number">#{train.trainNumber}</p>
                </div>
                <div className="route-summary">
                    <div className="station">
                        <strong>{train.source}</strong>
                        <span>{train.departureTime}</span>
                    </div>
                    <div className="duration">
                        <span>-{train.duration}-</span>
                    </div>
                    <div className="station">
                        <strong>{train.destination}</strong>
                        <span>{train.arrivalTime}</span>
                    </div>
                </div>
            </div>
            <div className="fare-details">
                <div className="fare-row">
                    <span>Selected Class:</span>
                    <strong>{selectedClass}</strong>
                </div>
                <div className="fare-row">
                    <span>Pessengers:</span>
                    <strong>{passengers.length}</strong>
                </div>
                <div className="fare-row">
                    <span>Fare per passenger:</span>
                    <strong>₹{totalFare}</strong>
                </div>
                <div className="fare-row-total">
                    <span>Total Amount:</span>
                    <strong>₹{calculateTotal()}</strong>
                </div>
            </div>
        </div>
    )
}
export default BookingSummary;