// File path: src/main/java/com/railway/railway_reservation_backend/controller/BookingController.java
package com.railway.railway_reservation_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.railway.railway_reservation_backend.entity.Booking;
import com.railway.railway_reservation_backend.entity.Train;
import com.railway.railway_reservation_backend.repository.BookingRepository;
import com.railway.railway_reservation_backend.repository.TrainRepository;
import com.railway.railway_reservation_backend.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins="http://localhost:5173",allowCredentials = "true")
public class BookingController {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private TrainRepository trainRepository;
    
    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> request, HttpSession session) {
        // Get logged-in user
        String userId = (String) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Please login first"));
        }
        
        try {
            String trainId = (String) request.get("trainId");
            String journeyDate = (String) request.get("journeyDate");
            List<Map<String, Object>> passengers = (List<Map<String, Object>>) request.get("passengers");
            
            // Get train
            Optional<Train> trainOpt = trainRepository.findById(trainId);
            if (trainOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "Train not found"));
            }
            
            Train train = trainOpt.get();
            
            // Check availability
            if (train.getAvailableSeats() < passengers.size()) {
                return ResponseEntity.status(400)
                    .body(Map.of("error", "Not enough seats. Available: " + train.getAvailableSeats()));
            }
            
            // Create booking
            Booking booking = new Booking();
            booking.setBookingNumber("BKG" + System.currentTimeMillis());
            booking.setUserId(userId);
            booking.setTrainId(trainId);
            booking.setBookingDate(LocalDateTime.now());
            booking.setJourneyDate(LocalDateTime.parse(journeyDate + "T00:00:00"));
            booking.setNumberOfSeats(passengers.size());
            booking.setTotalAmount(train.getFare() * passengers.size());
            booking.setStatus("CONFIRMED");
            
            // Add passengers
            List<Booking.Passenger> bookingPassengers = new ArrayList<>();
            for (int i = 0; i < passengers.size(); i++) {
                Map<String, Object> p = passengers.get(i);
                Booking.Passenger passenger = new Booking.Passenger();
                passenger.setName((String) p.get("name"));
                passenger.setAge((Integer) p.get("age"));
                passenger.setGender((String) p.get("gender"));
                passenger.setSeatNumber("S" + (train.getTotalSeats() - train.getAvailableSeats() + i + 1));
                bookingPassengers.add(passenger);
            }
            booking.setPassengers(bookingPassengers);
            
            // Save booking
            Booking savedBooking = bookingRepository.save(booking);
            
            // Update train seats
            train.setAvailableSeats(train.getAvailableSeats() - passengers.size());
            trainRepository.save(train);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBooking);
            
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/my-bookings")
    public ResponseEntity<?> getMyBookings(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Please login first"));
        }
        
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return ResponseEntity.ok(bookings);
    }
    
    @PutMapping("/cancel/{bookingNumber}")
    public ResponseEntity<?> cancelBooking(@PathVariable String bookingNumber, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Please login first"));
        }
        
        Optional<Booking> bookingOpt = bookingRepository.findByBookingNumber(bookingNumber);
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Booking not found"));
        }
        
        Booking booking = bookingOpt.get();
        
        // Check if booking belongs to user
        if (!booking.getUserId().equals(userId)) {
            return ResponseEntity.status(403).body(Map.of("error", "Not your booking"));
        }
        
        if (booking.getStatus().equals("CANCELLED")) {
            return ResponseEntity.status(400).body(Map.of("error", "Already cancelled"));
        }
        
        // Cancel booking
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
        
        // Restore seats
        Optional<Train> trainOpt = trainRepository.findById(booking.getTrainId());
        if (trainOpt.isPresent()) {
            Train train = trainOpt.get();
            train.setAvailableSeats(train.getAvailableSeats() + booking.getNumberOfSeats());
            trainRepository.save(train);
        }
        
        return ResponseEntity.ok(Map.of("message", "Booking cancelled successfully"));
    }
}
