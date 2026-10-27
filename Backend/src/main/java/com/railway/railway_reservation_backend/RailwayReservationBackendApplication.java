// File path: src/main/java/com/railway/railway_reservation_backend/RailwayReservationBackendApplication.java
package com.railway.railway_reservation_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class RailwayReservationBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(RailwayReservationBackendApplication.class, args);
		System.out.println("Railway Reservation System Backend Started!");
        System.out.println("Server running at: http://localhost:8080");
	}

}
