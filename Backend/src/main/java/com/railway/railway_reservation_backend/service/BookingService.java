package com.railway.railway_reservation_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.railway.railway_reservation_backend.dto.request.BookingRequest;
import com.railway.railway_reservation_backend.entity.Booking;
import com.railway.railway_reservation_backend.entity.Train;
import com.railway.railway_reservation_backend.repository.BookingRepository;
import com.railway.railway_reservation_backend.repository.TrainRepository;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {
        private final BookingRepository bookingRepository;
        private final TrainRepository trainRepository;

        public Booking createBooking(BookingRequest request, HttpSession session) {
                // 1. Get logged in user
                String userId = (String) session.getAttribute("userId");

                if (userId == null) {
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login first");
                }
                // 2.Find train
                Train train = trainRepository.findById(request.getTrainId())
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Train not found"));

                // 3. Find selected class
                Train.ClassDetails selectedClass = train.getClasses()
                                .stream()
                                .filter(c -> c.getClassName()
                                                .equalsIgnoreCase(request.getTravelClass()))
                                .findFirst()
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.BAD_REQUEST, "Invalid travel class"));

                // 4. Check seat availability
                int passengerCount = request.getPassengers().size();

                if (selectedClass.getAvailableSeats() < passengerCount) {
                        throw new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST, "Not enough seats available");
                }

                // 5. Calculate total fare on backend
                double totalAmount = selectedClass.getFare() * passengerCount;

                // 6. Create booking
                Booking booking = new Booking();

                booking.setBookingNumber("BKG" + System.currentTimeMillis());
                booking.setUserId(userId);
                booking.setTrainId(train.getId());
                booking.setTravelClass(selectedClass.getClassName());
                booking.setBookingDate(LocalDateTime.now());
                booking.setJourneyDate(request.getJourneyDate().atStartOfDay());
                booking.setNumberOfSeats(passengerCount);
                booking.setTotalAmount(totalAmount);
                booking.setStatus("CONFIRMED");

                // 7. Convert passenger DTOs to entity passengers
                List<Booking.Passenger> passengers = request.getPassengers()
                                .stream()
                                .map(p -> new Booking.Passenger(
                                                p.getName(),
                                                p.getAge(),
                                                p.getGender(),
                                                null,
                                                null))
                                .toList();

                booking.setPassengers(passengers);

                // 8. Save booking
                Booking savedBooking = bookingRepository.save(booking);

                // 9. Reduce seats in selected class
                selectedClass.setAvailableSeats(
                                selectedClass.getAvailableSeats() - passengerCount);

                trainRepository.save(train);

                return savedBooking;
        }

        public List<Booking> getMyBookings(HttpSession session) {
                String userId = (String) session.getAttribute("userId");
                if (userId == null) {
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please Login first");
                }
                return bookingRepository.findByUserId(userId);
        }

        public void cancelBooking(String bookingNumber, HttpSession session) {
                String userId = (String) session.getAttribute("userId");
                if (userId == null) {
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login first");
                }
                // Find booking
                Booking booking = bookingRepository.findByBookingNumber(bookingNumber)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Booking not found"));
                // verify ownership
                if (!userId.equals((booking.getUserId()))) {
                        throw new ResponseStatusException(
                                        HttpStatus.FORBIDDEN, "Not your booking");
                }
                // Prevent repeated cancellation
                if ("CANCELLED".equals(booking.getStatus())) {
                        throw new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST, "Booking already cancelled");
                }

                // Find train
                Train train = trainRepository.findById(booking.getTrainId())
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.NOT_FOUND, "Train not found"));

                // Find the originally booked class
                Train.ClassDetails bookedClass = train.getClasses()
                                .stream()
                                .filter(c -> c.getClassName()
                                                .equalsIgnoreCase(booking.getTravelClass()))
                                .findFirst()
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.NOT_FOUND, "Booked class not found"));

                // Restore seats to that class
                bookedClass.setAvailableSeats(
                                bookedClass.getAvailableSeats() + booking.getNumberOfSeats());

                // Update booking status
                booking.setStatus("CANCELLED");

                // Save changes
                trainRepository.save(train);
                bookingRepository.save(booking);
        }
}
