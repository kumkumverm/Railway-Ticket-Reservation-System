// src/services/api.js

const API_BASE_URL = '/api';

//Helper function for making requests
const request= async (url,options={})=>{
try{
    const response= await fetch(`${API_BASE_URL}${url}`,{
        ...options,
        headers:{
            'Content-Type':'application/json',
            ...options.headers,
        },
        credentials:'include',//Important for session cookies
    });
    const data= await response.json();
         return data;

}
catch(error){
    console.error('API Errors:',error);
    throw error;
}
};

//Train Apis
export const trainApi={
    //get all trains
    getAllTrains:()=>request('/trains'),

//get train by Id
getTrainById:(id)=>request(`/trains/${id}`),

//Search trains
searchTrains:(source,destination)=>
    request('/trains/search',{
        method:'POST',
        body:JSON.stringify({source,destination})
    }),
    addTrain: (trainData) =>
    request('/trains/admin/add', {
      method: 'POST',
      body: JSON.stringify(trainData),
    }),
  deleteTrain: (id) =>
    request(`/trains/admin/${id}`, { method: 'DELETE' }),
      
};

//Auth APIs
export const authApi={
    //Login
    login:(email,password)=>
        request('/auth/login',{
            method:'POST',
            body:JSON.stringify({email,password})
        }),
        // Signup
  signup: (userData) => 
    request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
  
  // Logout
  logout: () => 
    request('/auth/logout', {
      method: 'POST'
    }),
  
  // Get current user
  getCurrentUser: () => 
    request('/auth/me'),
};

// Booking APIs
export const bookingApi = {
  // Create booking
  createBooking: (bookingData) => 
    request('/bookings/create', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    }),
  
  // Get my bookings
  getMyBookings: () => 
    request('/bookings/my-bookings'),
  
  // Cancel booking
  cancelBooking: (bookingNumber) => 
    request(`/bookings/cancel/${bookingNumber}`, {
      method: 'PUT'
    }),
};

export default {
  train: trainApi,
  auth: authApi,
  booking: bookingApi,
};
