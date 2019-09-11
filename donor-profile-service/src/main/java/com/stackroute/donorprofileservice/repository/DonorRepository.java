package com.stackroute.donorprofileservice.repository;

import com.stackroute.donorprofileservice.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

// DonorRepository interface extends MongoRepository for Donor model object
@Repository
public interface DonorRepository extends MongoRepository<Donor, Long> {
    @Query("{email: ?0})")
    Donor findByEmail(@Param("email") String email);
}
