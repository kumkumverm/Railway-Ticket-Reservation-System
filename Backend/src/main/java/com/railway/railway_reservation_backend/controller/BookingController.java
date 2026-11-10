// File path: src/main/java/com/railway/railway_reservation_backend/controller/BookingController.java
package com.railway.railway_reservation_backend.controller;

import com.railway.railway_reservation_backend.dto.request.BookingRequest;
import com.railway.railway_reservation_backend.entity.Booking;
import com.railway.railway_reservation_backend.service.BookingService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequest request, HttpSession session) {
        Booking booking = bookingService.createBooking(request, session);
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<?> getMyBookings(HttpSession session) {

        return ResponseEntity.ok(bookingService.getMyBookings(session));
    }

    @PutMapping("/cancel/{bookingNumber}")
    public ResponseEntity<?> cancelBooking(@PathVariable String bookingNumber, HttpSession session) {
        bookingService.cancelBooking(bookingNumber, session);

        return ResponseEntity.ok(Map.of("message", "Booking cancelled successfully"));
    }
}
