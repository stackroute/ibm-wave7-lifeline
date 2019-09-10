package com.stackroute.recommendation.repository;

import com.stackroute.recommendation.model.Donor;
import com.stackroute.recommendation.model.Recepient;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface RecepientRepository extends Neo4jRepository<Recepient, String> {
}
