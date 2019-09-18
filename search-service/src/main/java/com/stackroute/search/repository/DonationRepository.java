package com.stackroute.search.repository;

import com.stackroute.search.models.Donor;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

//Repository to perform operations on Donor
public interface DonationRepository extends Neo4jRepository<Donor, Long> {

    //Filter results based on the organ
    @Query("WITH {tokens} as filters\n" +
            "MATCH p1=(a:Donor)-[:HAS_MEDICAL_INFO]-()-[:ORGAN_LIST]-(o:Organs)\n" +
            "WHERE o.name in filters AND o.donateOrNot = true\n" +
            "MATCH p2=(a:Donor)-[:HAS_ADDRESS]-()\n" +
            "MATCH p3=(a:Donor)-[:HAS_GUARDIANS]-()\n" +
            "RETURN p1, p2, p3")
    List<Donor> retrieveDonors(String tokens);

    Donor findByEmail(String email);
}
