package com.stackroute.search.repository;

import com.stackroute.search.models.OrganFactors;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface FactorsRepository extends Neo4jRepository<OrganFactors, String> {

    @Query("MATCH (n:OrganFactors)\n" +
            "WHERE n.name in {organ} \n" +
            "MATCH (n)-[r1:HAS_FACTORS]-(f:FactorsRanges)\n" +
            "RETURN n, f, r1")
    OrganFactors findByOrgan(String organ);
}
