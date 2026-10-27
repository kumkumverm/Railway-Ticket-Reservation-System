// src/Components/booking/Ticket.jsx
import React from 'react';
import './Booking.css';

const Ticket = ({ booking }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="ticket-container">
      <div className="ticket">
        <div className="ticket-header">
          <div className="ticket-airline">
            <h2>INDIAN RAILWAYS</h2>
            <span className="ticket-status">CONFIRMED</span>
          </div>
          <div className="ticket-pnr">
            <span className="label">PNR Number:</span>
            <span className="value">{booking.bookingId}</span>
          </div>
        </div>

        <div className="ticket-body">
          <div className="ticket-info">
            <div className="info-section">
              <h4>Train Details</h4>
              <p><strong>{booking.train.trainName}</strong> (#{booking.train.trainNumber})</p>
              <p>Class: {booking.selectedClass}</p>
            </div>

            <div className="info-section">
              <h4>Journey</h4>
              <div className="journey-details">
                <div className="from">
                  <strong>{booking.train.source}</strong>
                  <span>{booking.train.departureTime}</span>
                </div>
                <div className="arrow">→</div>
                <div className="to">
                  <strong>{booking.train.destination}</strong>
                  <span>{booking.train.arrivalTime}</span>
                </div>
              </div>
              <p>Duration: {booking.train.duration}</p>
            </div>

            <div className="info-section">
              <h4>Passenger Details</h4>
              <div className="passengers-list">
                {booking.passengers.map((passenger, index) => (
                  <div key={index} className="passenger-item">
                    <span>{passenger.name}</span>
                    <span>{passenger.age} yrs</span>
                    <span>{passenger.gender}</span>
                    <span>Berth: {passenger.berthPreference || 'Auto'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h4>Fare Details</h4>
              <div className="fare-breakdown">
                <div className="fare-row">
                  <span>Base Fare ({booking.passengers.length} × ₹{booking.totalFare / booking.passengers.length})</span>
                  <span>₹{booking.totalFare}</span>
                </div>
                <div className="fare-row">
                  <span>GST (5%)</span>
                  <span>₹{Math.round(booking.totalFare * 0.05)}</span>
                </div>
                <div className="fare-row total">
                  <span>Total Amount</span>
                  <span>₹{Math.round(booking.totalFare * 1.05)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ticket-sidebar">
            <div className="qr-code">
              <div className="qr-placeholder">
                <span>QR Code</span>
                <small>Scan at station</small>
              </div>
            </div>
            
            <div className="contact-info">
              <h4>Contact Information</h4>
              <p>Email: {booking.contactInfo.email}</p>
              <p>Phone: {booking.contactInfo.phone}</p>
              <p>Booking Date: {formatDate(booking.bookingDate)}</p>
            </div>

            <div className="ticket-actions">
              <button className="print-btn" onClick={() => window.print()}>
                 Print Ticket
              </button>
              <button className="download-btn">
                 Download PDF
              </button>
            </div>
          </div>
        </div>

        <div className="ticket-footer">
          <p className="note">
            <strong>Important:</strong> Please carry a valid ID proof. Arrive at station 30 minutes before departure.
            E-ticket is valid for travel.
          </p>
          <div className="barcode">
            <span>|||| ||| | || || ||| || | || ||| || ||| |</span>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Ticket;