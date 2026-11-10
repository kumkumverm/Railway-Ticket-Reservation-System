package com.railway.railway_reservation_backend.service;

import com.railway.railway_reservation_backend.repository.BookingRepository;
import com.railway.railway_reservation_backend.repository.UserRepository;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.railway.railway_reservation_backend.dto.response.UserResponse;
import com.railway.railway_reservation_backend.entity.Train;
import com.railway.railway_reservation_backend.entity.User;
import com.railway.railway_reservation_backend.repository.TrainRepository;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TrainRepository trainRepository;
    private final PasswordEncoder passwordEncoder;

    public void checkAdmin(HttpSession session) {
        String role = (String) session.getAttribute("userRole");
        if (!"ADMIN".equals(role)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Admin access required");
        }
    }

    public List<Train> getAllTrains(HttpSession session) {
        checkAdmin(session);
        return trainRepository.findAll();
    }

    public List<UserResponse> getAllUsers(HttpSession session) {
        checkAdmin(session);
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getRole()))
                .toList();
    }

    public Map<String, Object> getDashboardStats(HttpSession session) {
        checkAdmin(session);
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalTrains", trainRepository.count());
        stats.put("totalBookings", bookingRepository.count());
        return stats;
    }

    @PostConstruct
    public void initData() {
        // Create admin user
        if (!userRepository.existsByEmail("admin@railway.com")) {
            User admin = new User();
            admin.setEmail("admin@railway.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
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
            user.setPassword(passwordEncoder.encode("user123"));
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
            train1.setClasses(Arrays.asList(
                    new Train.ClassDetails("1A", 3500.0, 20, 20),
                    new Train.ClassDetails("2A", 2500.0, 40, 40),
                    new Train.ClassDetails("3A", 1850.0, 60, 60)));
                    train1.setDepartureTime(LocalTime.of(16, 55));
train1.setDaysRunning("Daily");

            Train train2 = new Train();
            train2.setTrainNumber("12627");
            train2.setTrainName("Karnataka Express");
            train2.setSource("Delhi");
            train2.setDestination("Bangalore");
            train2.setClasses(Arrays.asList(
                    new Train.ClassDetails("1A", 3500.0, 20, 20),
                    new Train.ClassDetails("2A", 2500.0, 40, 40),
                    new Train.ClassDetails("3A", 1850.0, 60, 60)));
train2.setDepartureTime(LocalTime.of(20, 20));
train2.setDaysRunning("Daily");
            trainRepository.saveAll(Arrays.asList(train1, train2));
            System.out.println("Sample trains created");
        }
    }
}
