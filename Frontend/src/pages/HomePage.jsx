// src/pages/HomePage.jsx
import React from 'react';
import TrainSearch from '../Components/train/TrainSearch';
import {useNavigate} from 'react-router-dom';
import './HomePage.css'

const HomePage=()=>{
    const navigate=useNavigate();

    const handleSearchResults=(trains)=>{
        navigate('/results',{state:{trains}});
    };
    return(
        <div className="home-page">
            <div className="hero-section">
                <h2>Book Train Tickets Online</h2>
                <p>Easy,fast, and secure railway ticket booking</p>
            </div>
            <TrainSearch onSearchResults={handleSearchResults}/>
        </div>
    );
};
export default HomePage;