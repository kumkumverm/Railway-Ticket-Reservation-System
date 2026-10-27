// src/Components/booking/BookingForm.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PassengerForm from './PassengerForm';
import BookingSummary from './BookingSummary'
import './booking.css';

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //get selected train from navigation state
    const train = location.state?.train || {
        id: 1,
        trainNumber: "12951",
        trainName: "MUMBAI RAJDHANI",
        source: "MUMBAI",
        destination: "DELHI",
        departureTime: "16:05",
        arrivalTime: "08:35",
        duration: "16h 30m",
        classes: [
            { name: "1A", fare: 3500, available: 15 },
            { name: "2A", fare: 2500, available: 35 },
            { name: "3A", fare: 1850, available: 70 }
        ]
    };
    const initialPassenger = {
        name: '',
        age: '',
        gender: '',
        berthPreferences: ''
    };
    const [passengers, setPassengers] = useState([{ ...initialPassenger }]);
    const [selectedClass, setSelectedClass] = useState(train.classes[2].name || '3A');
    const [contactInfo, setContactInfo] = useState({
        email: '',
        phone: ''
    });
    const selectedClassFare = train.classes.find(c => c.name === selectedClass)?.fare || 0;
    const handlePassengerChange = (index, updatedPassenger) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index] = updatedPassenger;
        setPassengers(updatedPassengers);
    };
    const handleAddPassenger = () => {
        if (passengers.length < 6) {
            setPassengers([...passengers, { ...initialPassenger }]);
        }
        else {
            alert('Maximum 6 passengers allowed per booking');
        }
    };
    const handleRemovePassenger = (index) => {
        if (passengers.length > 1) {
            const updatedPassengers = passengers.filter((_, i) => i !== index);
            setPassengers(updatedPassengers);
        }
    };
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactInfo(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const hasEmptyFields = passengers.some(p => !p.name || !p.age || !p.gender);
        if (hasEmptyFields) {
            alert('Please fill all required fields for all passengers');
            return;
        }
        if (!contactInfo.email || !contactInfo.phone) {
            alert('Please fill contact information');
            return;
        }
        const bookingData = {
            train: train,
            selectedClass,
            passengers,
            contactInfo,
            totalFare: passengers.length * selectedClassFare,
            bookingData: new Date().toISOString(),
            bookingId: `BOOK-${Date.now()}`
        };
        console.log('Booking Data:', bookingData);
        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        existingBookings.push(bookingData);
        localStorage.setItem('bookings', JSON.stringify(existingBookings));
        navigate('/confirmation', { state: { booking: bookingData } });
    };
    return (
        <div className="booking-container">
            <div className="booking-card">
                <div className="booking-header">
                    <h2>Complete Your Booking</h2>
                    <button
                        className='back-button'
                       
                    >
                        Back to Search 
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-section">
                        <h3>Train Information</h3>
                        <div className="train-info-card">
                            <div className="train-header">
                                <h4>{train.trainName}</h4>
                                <span className="train-number">#{train.trainNumber}</span>
                            </div>
                            <div className="route-info">
                                <div className="station">
                                    <strong>{train.source}</strong>
                                    <span>{train.departureTime}</span>
                                </div>
                                <div className="duration">
                                    <span>{train.duration}</span>
                                </div>
                                <div className="station">
                                    <strong>{train.destination}</strong>
                                    <span>{train.arrivalTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Class selection */}
                    <div className="form-section">
                        <h3>Select Travel Class</h3>
                        <div className="class-selection">
                            <label htmlFor="">Select Travel Class:</label>
                            <div className="class-options">
                                {train.classes.map(trainClass => (
                                    <label key={trainClass.name} className='class-option'>
                                        <input type="radio"
                                            name='travelClass'
                                            value={trainClass.name}
                                            checked={selectedClass === trainClass.name}
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                        />
                                        <span className="class-label">
                                            {trainClass.name} Class
                                            <span className="class-fare">
                                                ₹{trainClass.fare}
                                            </span>
                                            <span className='class-availability'>
                                                {trainClass.available} seats
                                            </span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="section-header">
                            <h3>Passenger Details</h3>
                            <button
                                type='button'
                                onClick={handleAddPassenger}
                                className='add-passenger-btn'
                            >
                                +Add Passenger
                            </button>
                        </div>
                        {passengers.map((passenger, index) => (
                            <PassengerForm
                                key={index}
                                passenger={passenger}
                                index={index}
                                onChange={handlePassengerChange}
                                onRemove={handleRemovePassenger}
                                showRemove={passengers.length > 1}
                            />
                        ))}
                    </div>
                    <div className="form-section">
                        <h3>Contact Information</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address*
                                </label>
                                <input type="email"
                                    id='email'
                                    name='email'
                                    value={contactInfo.email}
                                    onChange={handleContactChange}
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="phone">
                                    Phone Number*
                                </label>
                                <input type="tel"
                                    id='phone'
                                    name='phone'
                                    value={contactInfo.phone}
                                    onChange={handleContactChange}
                                    placeholder='Enter 10-digit phone number'
                                    pattern='[0-9]{10}'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-actions">
                        <BookingSummary
                            train={train}
                            selectedClass={selectedClass}
                            passengers={passengers}
                            totalFare={selectedClassFare}
                        />
                        <div className="action-buttons">
                            <button
                                type='button'
                                className='cancel-btn'>
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='proceed-btn'
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default BookingForm;