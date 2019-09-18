package com.stackroute.search.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.Date;
import java.util.List;

import static org.neo4j.ogm.annotation.Relationship.OUTGOING;

@Data
@NoArgsConstructor
@AllArgsConstructor
@NodeEntity
@JsonIgnoreProperties(ignoreUnknown = true)
//  swagger documentation
@ApiModel(description = "Donor Profile Model")
public class Donor {

	@JsonProperty("id")
	private long id;
	private String userType;
	private String firstName;
	private String lastName;
	@Id
	private String email;
	private String phoneNumber;
	private String password;
	private Date dob;
	private int age;
	private String aadhar;
	private String gender;
	@Relationship(type = "HAS_ADDRESS", direction = OUTGOING)
	private Address address;
	@Relationship(type = "HAS_GUARDIANS")
	private List<Guardian> guardianList;
	@Relationship(type = "HAS_MEDICAL_INFO")
	private MedicalDetails medicalDetails;
	private String isEmailVerified;

}






