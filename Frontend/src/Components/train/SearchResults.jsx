// src/Components/train/SearchResults.jsx
import React from 'react';
import './TrainSearch.css'
const SearchResults = ({ trains, onBackToSearch, onSelectTrain }) => {
    // if (!trains || trains.length === 0) {
    //     return (
    //         <div className="search-results-container">
    //             <div className="no-trains">
    //                 <h3>No Trains Found</h3>
    //                 <p>Please try different stations or dates.</p>
    //                 <button onClick={onBackToSearch} className="back-button">Back to Search</button>
    //             </div>
    //         </div>
    //     );
    // }
    return (
        <div className="search-results-container">
            <div className="results-header">
                <h2>Available Trains</h2>
                <p>Found {trains.length} trains for your journey</p>
                <button onClick={onBackToSearch} className="back-button">
                    Back to Search
                </button>
            </div>

            <div className="trains-list">
                {trains.map(train => (
                    <div key={train.id} className="train-card">
                        <div className="train-header">
                            <h3>{train.trainName} </h3>
                            <span className='train-number'>#{train.trainNumber}</span>
                        </div>

                        <div className="train-details">
                            <div className="route-info">
                                <div className="station">
                                    <strong>{train.source}</strong>
                                    <span>{train.departureTime}</span>
                                </div>
                                <div className="duration">
                                    <span>{train.duration}</span>
                                    <div className="journey-line"></div>
                                </div>
                                <div className="station">
                                    <strong>{train.destination}</strong>
                                    <span>{train.arrivalTime}</span>
                                </div>
                            </div>
                            <div className="train-info">
                                <div className="info-item">
                                    <span className="label">Seats Available:</span>
                                    <span className='value'>{train.seatAvailable}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Classes:</span>
                                    <span className="value">₹{train.fare}</span>
                                </div>
                            </div>
                        </div>
                        <div className="train-actions">
                            <button
                                onClick={() => onSelectTrain(train)}
                                className='book-button'
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SearchResults;