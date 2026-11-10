package com.railway.railway_reservation_backend.dto.request;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class BookingRequest {
    @NotBlank (message = "Train ID is required")
    private String trainId;
    @NotNull(message = "Journey date is required")
    private LocalDate journeyDate;
    @NotBlank(message="Travel class is required")
    private String travelClass;
    @NotEmpty (message = "At least one passenger is required")
    @Valid
    private List<PassengerRequest> passengers;
}
