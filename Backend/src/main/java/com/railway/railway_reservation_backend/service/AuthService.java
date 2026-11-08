package com.railway.railway_reservation_backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.railway.railway_reservation_backend.dto.request.LoginRequest;
import com.railway.railway_reservation_backend.dto.request.SignupRequest;
import com.railway.railway_reservation_backend.dto.response.UserResponse;
import com.railway.railway_reservation_backend.entity.User;
import com.railway.railway_reservation_backend.repository.UserRepository;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        user.setActive(true);
        User savedUser = userRepository.save(user);
        return new UserResponse(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getRole());
    }

    public UserResponse login(LoginRequest request, HttpSession session) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        if (!user.isActive()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Account is inactive");
        }
        session.setAttribute("userId", user.getId());
        session.setAttribute("userRole", user.getRole());

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole());
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }

    // Get currently logged-in user
    public UserResponse getCurrentUser(HttpSession session) {

        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Not logged in");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"));

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole());
    }
}
