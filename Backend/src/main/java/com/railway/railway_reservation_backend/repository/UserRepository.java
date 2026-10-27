// File path: src/main/java/com/railway/railway_reservation_backend/repository/UserRepository.java
package com.railway.railway_reservation_backend.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.railway.railway_reservation_backend.entity.User;
@Repository
public interface UserRepository extends MongoRepository<User,String> {
Optional<User> findByEmail(String email);
Boolean existsByEmail(String email);
    
} 
