// File path: src/main/java/com/railway/railway_reservation_backend/controller/TrainController.java
package com.railway.railway_reservation_backend.controller;


import com.railway.railway_reservation_backend.entity.Train;
import com.railway.railway_reservation_backend.repository.TrainRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/trains")
@CrossOrigin(origins = "http://localhost:5173",allowCredentials ="true")
public class TrainController {
    
    @Autowired
    private com.railway.railway_reservation_backend.repository.TrainRepository trainRepository;
    
    @GetMapping
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getTrainById(@PathVariable String id) {
        Optional<Train> train = trainRepository.findById(id);
        return train.map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/search")
    public ResponseEntity<?> searchTrains(@RequestBody Map<String, String> request) {
        String source = request.get("source");
        String destination = request.get("destination");
        
        List<Train> trains = trainRepository.findBySourceAndDestination(source, destination);
        
        if (trains.isEmpty()) {
            return ResponseEntity.status(404)
                .body(Map.of("message", "No trains found for this route"));
        }
        
        return ResponseEntity.ok(trains);
    }
    
    // Admin endpoints
    @PostMapping("/admin/add")
    public ResponseEntity<?> addTrain(@RequestBody Train train, HttpSession session) {
        // Check if admin
        String role = (String) session.getAttribute("userRole");
        if (role == null || !role.equals("ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }
        
        Train savedTrain = trainRepository.save(train);
        return ResponseEntity.status(201).body(savedTrain);
    }
    
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteTrain(@PathVariable String id, HttpSession session) {
        String role = (String) session.getAttribute("userRole");
        if (role == null || !role.equals("ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }
        
        trainRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Train deleted"));
    }
}
