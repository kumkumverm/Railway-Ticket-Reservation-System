package com.railway.railway_reservation_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor 
public class UserResponse {
    
    private String id;
    private String fullName;
    private String email;
    private String role;
}
