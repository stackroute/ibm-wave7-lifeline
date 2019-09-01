package com.stackroute.recepientprofileservice.repository;

import com.stackroute.recepientprofileservice.model.Recepient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecepientRepository extends MongoRepository<Recepient, Long> {

}
