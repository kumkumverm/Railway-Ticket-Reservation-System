// File path: src/main/java/com/railway/railway_reservation_backend/controller/AdminController.java
package com.railway.railway_reservation_backend.controller;

import com.railway.railway_reservation_backend.service.AdminService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor 
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminController {
 
    private final AdminService adminService;

    @GetMapping("/trains")
    public ResponseEntity<?> getAllTrains(HttpSession session) {
        return ResponseEntity.ok(adminService.getAllTrains(session));
    }
    
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(HttpSession session) {
        return ResponseEntity.ok(adminService.getAllUsers(session));
    }
    
    @GetMapping("/dashboard")
    public ResponseEntity<?> getStats(HttpSession session) {
        return ResponseEntity.ok(adminService.getDashboardStats(session));
    }
}
