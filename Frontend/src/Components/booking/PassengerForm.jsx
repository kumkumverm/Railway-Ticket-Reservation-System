// src/Components/booking/PassengerForm.jsx
import React from "react";
import './booking.css';
import { genders, berthPreferences } from "../../data/mockTrains";

const PassengerForm = ({ passenger, index, onChange, onRemove, showRemove }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(index, { ...passenger, [name]: value });
    };
    return (
        <div className="passenger-form">
            <div className="passenger-header">
                <h4>Passenger {index + 1} </h4>
                {showRemove && (
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="remove-passenger-btn"
                    >
                        Remove</button>
                )}
            </div>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor={`name-${index}`}> Full Name*</label>
                    <input type="text"
                        id={`name-${index}`}
                        name="name"
                        value={passenger.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`age-${index}`}>Age*</label>
                    <input
                        type="text"
                        id={`age-${index}`}
                        name="age"
                        value={passenger.age}
                        onChange={handleChange}
                        min="1"
                        max="120"
                        placeholder="Age"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`gender-${index}`}>Gender</label>
                    <select 
                        name="gender"
                        id={`gender-${index}`}
                        value={passenger.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        {genders.map(gender => (
                            <option key={gender} value={gender}>{gender}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor={`berth-${index}`}>Berth Preference</label>
                    <select name="berthPreferences" id={`berth-${index}`}
                        value={passenger.berthPreferences}
                        onChange={handleChange}
                    >
                        <option value="">Select Preference</option>
                        {berthPreferences.map(berth => (
                            <option key={berth} value={berth}>{berth}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
export default PassengerForm;