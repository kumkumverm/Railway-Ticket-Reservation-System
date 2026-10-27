// src/data/mockTrains.js
export const mockTrains=[
    {
        id:1,
        trainNumber:"12951",
        trainName:"MUMBAI RAJDHANI",
        source:"MUMBAI",
        destinataion:"DELHI",
        departureTime:"16:05",
        duration:"16h 30m",
        seatAvailable:120,
        fare:1850,
          classes: [
      { name: "1A", fare: 3500, available: 15 },
      { name: "2A", fare: 2500, available: 35 },
      { name: "3A", fare: 1850, available: 70 }
    ]
    },
    {
    id: 2,
    trainNumber: "12283",
    trainName: "DURONTO EXPRESS",
    source: "MUMBAI",
    destination: "DELHI",
    departureTime: "23:00",
    arrivalTime: "16:00",
    duration: "17h 00m",
    seatsAvailable: 85,
    fare: 1450,
       classes: [
      { name: "1A", fare: 3500, available: 15 },
      { name: "2A", fare: 2500, available: 35 },
      { name: "3A", fare: 1850, available: 70 }
    ]
  },
  {
    id: 3,
    trainNumber: "12137",
    trainName: "PUNJAB MAIL",
    source: "MUMBAI",
    destination: "DELHI",
    departureTime: "14:55",
    arrivalTime: "10:25",
    duration: "19h 30m",
    seatsAvailable: 210,
    fare: 850,
       classes: [
      { name: "1A", fare: 3500, available: 15 },
      { name: "2A", fare: 2500, available: 35 },
      { name: "3A", fare: 1850, available: 70 }
    ]
  },
  {
    id: 4,
    trainNumber: "12651",
    trainName: "KARNATAKA EXP",
    source: "DELHI",
    destination: "BANGALORE",
    departureTime: "19:15",
    arrivalTime: "06:30",
    duration: "35h 15m",
    seatsAvailable: 45,
    fare: 1250,
       classes: [
      { name: "1A", fare: 3500, available: 15 },
      { name: "2A", fare: 2500, available: 35 },
      { name: "3A", fare: 1850, available: 70 }
    ]
  },
  {
    id: 5,
    trainNumber: "12009",
    trainName: "SHATABDI EXP",
    source: "DELHI",
    destination: "CHANDIGARH",
    departureTime: "07:40",
    arrivalTime: "11:45",
    duration: "4h 05m",
    seatsAvailable: 180,
    fare: 650,
       classes: [
      { name: "1A", fare: 3500, available: 15 },
      { name: "2A", fare: 2500, available: 35 },
      { name: "3A", fare: 1850, available: 70 }
    ]
  }
];
export const stations=[
    "MUMBAI", "DELHI", "CHENNAI", "KOLKATA", "BANGALORE", 
  "HYDERABAD", "AHMEDABAD", "PUNE", "JAIPUR", "LUCKNOW",
  "CHANDIGARH", "PATNA", "KOCHI", "BHUBANESWAR", "GUWAHATI"
];
export const genders = ["Male", "Female", "Other"];
export const berthPreferences = ["Lower", "Middle", "Upper", "Side Lower", "Side Upper", "No Preference"];