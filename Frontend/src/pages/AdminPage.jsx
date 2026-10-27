// src/pages/AdminPage.jsx
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TrainItem from "../Components/admin/TrainItem";
import './AdminPage.css';
const AdminPage=()=>{
    const navigate=useNavigate();
    const [boookings,setBookings]=useState([]);
    const [trains,setTrains]=useState([]);
    const [activeTab,setActiveTab]=useState('bookings');
    useEffect(()=>{
        loadData();
    },[]);
    const loadData=()=>{
        const savedBookings=JSON.parse(localStorage.getItem('bookings')||'[]');
        const savedTrains=JSON.parse(localStorage.getItem('adminTrains')||'[]');
        setBookings(savedBookings);
        setTrains(savedTrains);
    }
    const handleAddTrain=()=>{
        const newTrain={
            id:Date.now(),
            trainNumber:prompt('Enter train number:'),
            trainName:prompt('Enter train name:'),
            source:prompt('Enter source station:'),
            destination:prompt('Enter destination:'),
            departureTime:'08:00',
            arrivalTime:'20:00',
            seatsAvailable:100,
            fare:1000,
            classes:['2A','3A']
        };
        if(newTrain.trainNumber && newTrain.trainName){
            const updatedTrains=[...trains,newTrain];
            setTrains(updatedTrains);
            localStorage.setItem('adminTrains',JSON.stringify(updatedTrains));
            alert('Train added!');
        }
    };
    const handleDeleteTrain=(id)=>{
        if(window.confirm('Delete this train?')){
            const updatedTrains=trains.fileter(train=>train.id!==id);
            setTrains(updatedTrains);
            localStorage.setItem('adminTrains',JSON.stringify(updatedTrains));
        }
    };
    return (
        <div className="admin-container">
        <div className="admin-page">
            <div className="admin-header">
                <h1>Admin Panel</h1>
                   <button onClick={()=>navigate('/')} className="back-btn">
                    Back to Site
                    </button>
            </div>
            <div className="admin-tabs">
                <button
                className={activeTab==='bookings'?'active':''}
                onClick={()=>setActiveTab('bookings')}
                >Bookings ({boookings.length})</button>
           
            <button
            className={activeTab==='trains'?'active':''}
            onClick={()=>setActiveTab('trains')}
            >Trains ({trains.length})
            </button>
             </div>
             <div className="admin-tabs">
                {activeTab==='bookings'?(
                    <div className="booking-tab">
                        <h2>All Bookings</h2>
                     {boookings.length>0?(
                        <div className="bookings-list">
                         {boookings.map((booking,index)=>(
                            <div key={index} className="booking-item">
                                <div className="booking-info">
                                    <strong>PNR:{booking.bookingId}</strong>
                                    <span>{booking.train.trainName}</span>
                                    <span> from {booking.train.source} to {booking.train.destination}</span>
                                    <span>₹{booking.totalFare}.{booking.passengers.length} passengers</span>
                                </div>
                                <div className="booking-contact">
                                    {booking.contactInfo.email}
                                </div>
                            </div>
                         ))}
                        </div>
                     ):(
                    <p className="no-data">No bookings yet</p>
                )}
                    </div>
                ):(
                    <div className="trains-tab">
                        <div className="trains-header">
                            <h2>Manage Trains</h2>
                            <button onClick={handleAddTrain} className="add-train-btn">
                                Add Train
                                </button>
                        </div>
                                {trains.length > 0 ? (
              <div className="trains-list">
                {trains.map(train => (
                  <TrainItem 
                    key={train.id} 
                    train={train} 
                    onDelete={handleDeleteTrain}
                  />
                ))}
              </div>
            ) : (
              <p className="no-data">No trains added yet</p>
            )}
          </div>
        )}

             </div>
             <div className="admin-footer">
                <p>Total Revenue: ₹{boookings.reduce((sum,b)=>sum+b.totalFare,0)}</p>
             </div>
        </div>
        </div>
    );
};
export default AdminPage;