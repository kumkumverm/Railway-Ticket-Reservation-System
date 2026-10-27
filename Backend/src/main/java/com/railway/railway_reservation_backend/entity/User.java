// File path: src/main/java/com/railway/railway_reservation_backend/entity/User.java
package com.railway.railway_reservation_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
     @Id
     private String id;
     @Indexed(unique = true)
     private String email;
     private String password;
     private String fullName;
     private String phoneNumber;
     private String role;
     @CreatedDate
     private LocalDateTime createAt;
     private boolean active =true;
}
