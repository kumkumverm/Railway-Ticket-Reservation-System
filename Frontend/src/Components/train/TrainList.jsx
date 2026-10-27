// D:\kUMKUM\Railway Reservation System\Frontend\src\Components\train\TrainList.jsx

import React, { useState, useEffect } from 'react';
import { trainApi } from '../../services/railwayApi';

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrains, setFilteredTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  useEffect(() => {
    // Filter trains based on search term
    if (searchTerm === '') {
      setFilteredTrains(trains);
    } else {
      const filtered = trains.filter(train => 
        train.trainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        train.trainNumber.includes(searchTerm) ||
        train.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        train.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTrains(filtered);
    }
  }, [searchTerm, trains]);

  const fetchTrains = async () => {
    try {
      setLoading(true);
      const data = await trainApi.getAllTrains();
      setTrains(data);
      setFilteredTrains(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch trains. Please make sure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading trains...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
        <p>{error}</p>
        <button 
          onClick={fetchTrains}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Trains</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by train name, number, source, or destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Train Count */}
      <p className="text-gray-600 mb-4">Found {filteredTrains.length} trains</p>

      {/* Train List */}
      {filteredTrains.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No trains found matching your search.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrains.map((train) => (
            <div key={train.id} className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600">{train.trainName}</h3>
                    <p className="text-gray-500 text-sm">Train No: {train.trainNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">₹{train.fare}</p>
                    <p className="text-xs text-gray-500">per seat</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center my-3">
                  <div>
                    <p className="font-medium">{train.source}</p>
                    <p className="text-xs text-gray-500">Departure</p>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div>
                    <p className="font-medium">{train.destination}</p>
                    <p className="text-xs text-gray-500">Arrival</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                  <div>
                    <p className="text-sm text-gray-600">
                      Available: <span className="font-semibold">{train.availableSeats}</span> / {train.totalSeats}
                    </p>
                  </div>
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => window.location.href = `/book/${train.id}`}
                    disabled={train.availableSeats === 0}
                  >
                    {train.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainList;