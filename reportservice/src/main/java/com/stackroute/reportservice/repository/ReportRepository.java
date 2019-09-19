package com.stackroute.reportservice.repository;

import com.stackroute.reportservice.model.Report;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends MongoRepository<Report,String> {
}

