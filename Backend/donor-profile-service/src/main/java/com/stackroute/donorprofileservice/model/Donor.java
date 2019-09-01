package com.stackroute.donorprofileservice.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/*lombok annotations @Data @AllArgsConstructor @NoArgsConstructor are used for creating constructor, getter and setter*/
@Data
@AllArgsConstructor
@NoArgsConstructor

/*creates a document in mongo db for donor's personal and medical information */
@Document(collection = "DonorProfile")
//  swagger documentation
@ApiModel(description = "Donor Profile Model")
public class Donor {
	@Id
	@ApiModelProperty("id")
	private long id;
	
//	SEQUENCE_NAME field is not persistent in mongo db
	@Transient
	public static final String SEQUENCE_NAME = "donors_sequence";
	
	private String userType;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;
	private String password;
	private Date dob;
	private String aadhar;
	private String gender;
	private Address address;
	private List<Guardian> guardianList;
	private MedicalDetails medicalInfo;
}






