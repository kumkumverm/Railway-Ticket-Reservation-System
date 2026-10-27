// File path: src/main/java/com/railway/railway_reservation_backend/entity/Train.java
package com.railway.railway_reservation_backend.entity;

import java.time.LocalTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="trains")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Train {
    @Id
    private String id;
 private String trainNumber;
 private String trainName;
 private String source;
 private String destination;
 private LocalTime departureTime;
 private Integer totalSeats;
 private Integer availableSeats;
 private Double fare;
 private String trainClass;
 private String daysRunning;
 private boolean active=true;

}
