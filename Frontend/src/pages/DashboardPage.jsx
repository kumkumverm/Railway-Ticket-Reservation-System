// src/pages/DashboardPage.jsx
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../Components/dashboard/BookingCard';

import './DashboardPage.css';
const DashboardPage=()=>{
    const navigate=useNavigate();
    const [bookings,setBookings]=useState([]);
    useEffect(()=>{
        const savedBooings=JSON.parse(localStorage.getItem('bookings')||'[]');
        setBookings(savedBooings);
    },[])
    return(
        <div className="dashboard-container">
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>My Dashboard</h1>
                <button onClick={()=>navigate('/')} className="new-booking-btn">
                    Book New Ticket
                </button>
            </div>
            <div className="stats-card">
                <div className="stat-card">
                    <h3>{bookings.length}</h3>
                    <p>Total Bookings</p>
                </div>
                <div className="stat-card">
                    <h3>₹{bookings.reduce((sum,b)=>sum+b.totalFare,0)}</h3>
                    <p>Total Spent</p>
                </div>
            </div>
            <div className="bookings-section">
                <h2>My Bookings</h2>
                {bookings.length>0?(
                    <div className="bookings-list">
                        {bookings.map((booking,index)=>(
                            <BookingCard key={index} booking={booking}/> 
                        ))}
                    </div>
                ):(
                    <div className="empty-state"
                    >
                        <p>No Bookings yet</p>
                        <button onClick={()=>navigate('/')} className='boot-btn'>Book Your First Ticket</button>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};
export default DashboardPage;