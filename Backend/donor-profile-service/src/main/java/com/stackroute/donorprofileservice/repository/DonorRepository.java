package com.stackroute.donorprofileservice.repository;

import com.stackroute.donorprofileservice.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

// DonorRepository interface extends MongoRepository for Donor model object
@Repository
public interface DonorRepository extends MongoRepository<Donor, Long> {
}
