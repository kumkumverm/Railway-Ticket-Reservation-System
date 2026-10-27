// src/Components/train/TrainSearch.jsx
import React, { useState } from 'react';
import { mockTrains, stations } from '../../data/mockTrains';
import './TrainSearch.css';
export default function TrainSearch ({ onSearchResults }){
    const [searchData, setSearchData] = useState({
        source: '',
        destination: '',
        date: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search Data: ', searchData);
        const filteredTrains = mockTrains.filter(train =>
            train.source === searchData.source &&
            train.destination === searchData.destination
        );
        console.log('Filtered trains:', filteredTrains);
  console.log('Is array?', Array.isArray(filteredTrains));
        if (filteredTrains.length > 0) {
            onSearchResults(filteredTrains);
        }
        else {
            alert('No trains found for the selected route. Please try different stations.');
        }
    };
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };
    return (
        <div className="train-search-container">
            <div className="search-card">
                <h2>Search Trains</h2>
                <p className="search-subtitle">
                    Find and book trains for your journey
                </p>
                <form onSubmit={handleSubmit} className="search-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="source">From Station</label>
                            <select
                                name="source"
                                id="source"
                                value={searchData.source}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Source Station</option>
                                {stations.map(station => (
                                    <option key={station} value={station}>{station}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="destination">To Station</label>
                            <select
                                id='destination'
                                name='destination'
                                value={searchData.destination}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Destination Station</option>
                                {stations.map(station => (
                                    <option key={station} value={station}>{station}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Journey Date</label>
                        <input type="date"
                            id="date"
                            name='date'
                            value={searchData.date}
                            onChange={handleChange}
                            min={getTomorrowDate()}
                            required
                        />
                    </div>
                    <button type='submit' className='search-button'>Search Trains</button>

                </form>
            </div>
        </div>
    )
}