// File path: src/main/java/com/railway/railway_reservation_backend/controller/AuthController.java
package com.railway.railway_reservation_backend.controller;

import com.railway.railway_reservation_backend.dto.request.LoginRequest;
import com.railway.railway_reservation_backend.dto.request.SignupRequest;
import com.railway.railway_reservation_backend.dto.response.UserResponse;
import com.railway.railway_reservation_backend.entity.User;
import com.railway.railway_reservation_backend.repository.UserRepository;
import com.railway.railway_reservation_backend.service.AuthService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpSession session) {
        UserResponse user = authService.login(request, session);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "userId", user.getId(),
                "fullName", user.getFullName(),
                "role", user.getRole()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
           UserResponse user = authService.signup(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Registration successful",
                "userId", user.getId()
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
         authService.logout(session);
        return ResponseEntity.ok(Map.of
            ("success", true,
             "message", "Logged out"
            ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        UserResponse user = authService.getCurrentUser(session);
        return ResponseEntity.ok(user);
    }
}
