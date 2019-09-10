package com.stackroute.recepientprofileservice.repository;

import com.stackroute.recepientprofileservice.model.Recepient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecepientRepository extends MongoRepository<Recepient, Long> {
    @Query("{email: ?0})")
    Recepient findByEmail(@Param("email") String email);

}
