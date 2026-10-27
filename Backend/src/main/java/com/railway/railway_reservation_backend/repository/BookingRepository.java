// File path: src/main/java/com/railway/railway_reservation_backend/repository/BookingRepository.java
package com.railway.railway_reservation_backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.railway.railway_reservation_backend.entity.Booking;

@Repository
public interface BookingRepository extends MongoRepository<Booking,String> {

    List<Booking> findByUserId(String userId);
    Optional<Booking> findByBookingNumber(String bookingNumber);

     //Query for finding bookings by passenger name
     @Query("{'passengers.name':?0}")
     List<Booking> findByPassengerName(String passengerName);
     
     //Query for date range
     @Query("{ 'journeyDate':{$gte:?0,$lte:?1}}")
     List<Booking> findByJourneyDateBetween(LocalDateTime start, LocalDateTime end);
} 
