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

    //Filter results based on the organ
    @Query("WITH {tokens} as filters\n" +
            "MATCH p1=(a:Donor)-[:HAS_MEDICAL_INFO]-(m:MedicalDetails)-[:ORGAN_LIST]-(o:Organs)\n" +
            "MATCH p2=(m:MedicalDetails)-[:DISEASE]-(d:Disease)\n" +
            "WHERE m.bloodGroup in filters\n" +
            "MATCH p3=(a:Donor)-[:HAS_ADDRESS]-()\n" +
            "MATCH p4=(a:Donor)-[:HAS_GUARDIANS]-()-[:HAS_ADDRESS]-()\n" +
            "RETURN p1, p2, p3, p4")
    List<Donor> retrieveLookedUpDonors(String tokens);

    //Filter results based on the organ and blood group
    @Query("WITH {blood} as filters\n" +
            "MATCH p1=(a:Donor)-[:HAS_MEDICAL_INFO]-(m:MedicalDetails)\n" +
            "MATCH p2=(m:MedicalDetails)-[:ORGAN_LIST]-(o:Organs)\n" +
            "WHERE o.name = {organ} AND o.donateOrNot = true\n" +
            "MATCH p3=(m:MedicalDetails)-[:DISEASE]-(d:Disease)\n" +
            "WHERE m.bloodGroup in filters\n" +
            "MATCH p4=(a:Donor)-[:HAS_ADDRESS]-()\n" +
            "MATCH p5=(a:Donor)-[:HAS_GUARDIANS]-()-[:HAS_ADDRESS]-()\n" +
            "RETURN p1, p2, p3, p4, p5")
    List<Donor> retrieveDonorsByBloodAndOrgan(String blood, String organ);
}
