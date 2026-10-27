// File path: src/main/java/com/railway/railway_reservation_backend/entity/Booking.java
package com.railway.railway_reservation_backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Document(collection="bookings")
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    private String id;
    @Indexed(unique = true)
    private String bookingNumber;
    @Indexed
    private String trainId;

    @CreatedDate
    private LocalDateTime bookingDate;
    private Integer numberOfSeats;
    private LocalDateTime journeyDate;
    private Double totalAmount;
    private String status;// CONFIRMED, CANCELLED, WAITING
    private String userId;

    //Nested documents
    private List<Passenger> passengers;
    private PaymentInfo payment;
 //Inner class for passengers
 @Data
 @NoArgsConstructor
 @AllArgsConstructor
    public static class Passenger{
        private String name;
        private Integer age;
       private String gender;
       private String seatNumber;
       private String idProof;
    }
    //Inner class for payment
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentInfo{
        private String paymentId;
        private Double amount;
        private LocalDateTime payDate;
        private String paymentMethod;
        private String status;
    }
}
