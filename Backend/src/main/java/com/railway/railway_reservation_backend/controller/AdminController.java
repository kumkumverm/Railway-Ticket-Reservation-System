// File path: src/main/java/com/railway/railway_reservation_backend/controller/AdminController.java
package com.railway.railway_reservation_backend.controller;

import com.railway.railway_reservation_backend.entity.Train;
import com.railway.railway_reservation_backend.entity.User;
import com.railway.railway_reservation_backend.repository.BookingRepository;
import com.railway.railway_reservation_backend.repository.TrainRepository;
import com.railway.railway_reservation_backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminController {
    
    @Autowired
    private TrainRepository trainRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @PostConstruct
    public void initData() {
        // Create admin user
        if (!userRepository.existsByEmail("admin@railway.com")) {
            User admin = new User();
            admin.setEmail("admin@railway.com");
            admin.setPassword("admin123");
            admin.setFullName("Admin User");
            admin.setPhoneNumber("9999999999");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println(" Admin created: admin@railway.com / admin123");
        }
        
        // Create sample user
        if (!userRepository.existsByEmail("user@example.com")) {
            User user = new User();
            user.setEmail("user@example.com");
            user.setPassword("user123");
            user.setFullName("John Doe");
            user.setPhoneNumber("9876543210");
            user.setRole("USER");
            userRepository.save(user);
            System.out.println("User created: user@example.com / user123");
        }
        
        // Create sample trains
        if (trainRepository.count() == 0) {
            Train train1 = new Train();
            train1.setTrainNumber("12301");
            train1.setTrainName("Rajdhani Express");
            train1.setSource("Delhi");
            train1.setDestination("Mumbai");
            train1.setTotalSeats(120);
            train1.setAvailableSeats(120);
            train1.setFare(2500.0);
            
            Train train2 = new Train();
            train2.setTrainNumber("12627");
            train2.setTrainName("Karnataka Express");
            train2.setSource("Delhi");
            train2.setDestination("Bangalore");
            train2.setTotalSeats(100);
            train2.setAvailableSeats(100);
            train2.setFare(3200.0);
            
            trainRepository.saveAll(List.of(train1, train2));
            System.out.println("Sample trains created");
        }
    }
    
    @GetMapping("/trains")
    public ResponseEntity<?> getAllTrains(HttpSession session) {
        String role = (String) session.getAttribute("userRole");
        if (role == null || !role.equals("ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }
        return ResponseEntity.ok(trainRepository.findAll());
    }
    
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(HttpSession session) {
        String role = (String) session.getAttribute("userRole");
        if (role == null || !role.equals("ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }
        return ResponseEntity.ok(userRepository.findAll());
    }
    
    @GetMapping("/dashboard")
    public ResponseEntity<?> getStats(HttpSession session) {
        String role = (String) session.getAttribute("userRole");
        if (role == null || !role.equals("ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalTrains", trainRepository.count());
        stats.put("totalBookings", bookingRepository.count());
        
        return ResponseEntity.ok(stats);
    }
}
