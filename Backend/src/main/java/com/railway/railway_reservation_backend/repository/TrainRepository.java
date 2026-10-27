// File path: src/main/java/com/railway/railway_reservation_backend/repository/TrainRepository.java
package com.railway.railway_reservation_backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.railway.railway_reservation_backend.entity.Train;
@Repository
public interface TrainRepository extends MongoRepository<Train,String>{
    List<Train> findBySourceAndDestination(String source,String destination);

    @Query("{'source':?0,'destination':?1,'availableSeats':{$gt:0}}")
    List<Train> findAvailableTrains(String source, String destination);

    List<Train> findByActiveTrue();

    boolean existsByTrainNumber(String trainNumber);

}
