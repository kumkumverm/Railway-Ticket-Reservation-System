// src/Components/admin/TrainItem.jsx
import React from 'react';
import './TrainItem.css';
const TrainItem=({train,onDelete})=>{
   return(
     <div className="train-item">
        <div className="train-info">
                 <strong>#{train.trainNumber} - {train.trainName}</strong>
                 <span>from {train.source} to {train.destination}</span>
                 <span>Seats: {train.seatAvailable} . Fare: ₹{train.fare}</span>
        </div>
        <button
        onClick={()=>onDelete(train.id)}
          className='delete-train-btn'
        >Delete</button>
    </div>
   );
};
export default TrainItem;