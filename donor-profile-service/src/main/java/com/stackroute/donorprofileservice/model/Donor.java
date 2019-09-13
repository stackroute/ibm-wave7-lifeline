package com.stackroute.donorprofileservice.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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
	
	private String donorId;
//	SEQUENCE_NAME field is not persistent in mongo db
	@Transient
	public static final String SEQUENCE_NAME = "donors_sequence";

	@Transient
	private String userType;

	@NotNull(message = "firstname is mandatory")
	@Pattern(regexp = "[a-zA-Z]{3,30}" )
	private String firstName;

	@NotNull(message = "lastname is mandatory")
	@Pattern(regexp = "[a-zA-Z]{3,30}" )
	private String lastName;

	@NotNull(message = "email is mandatory")
	@Email
	@Indexed(unique = true)
	private String email;

	@Pattern(regexp="(^$|[0-9]{10})")
	@NotNull(message = "phone number is mandatory")
	private String phoneNumber;

	@NotNull(message = "password number is mandatory")
	@Transient
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,16})" )
	private String password;

	@NotNull(message = "dob number is mandatory")
	private Date dob;

	@Pattern(regexp="(^$|[0-9]{12})")
	@NotNull(message = "aadhar number is mandatory")
	private String aadhar;

	@NotNull(message = "gender  is mandatory")
	private String gender;

	@NotNull(message = "guardianListaddress  is mandatory")
	private Address address;
	
	@NotNull(message = "guardian list is mandatory")
	private List<Guardian> guardianList;

	private MedicalDetails medicalDetails;
	
	private String isEmailVerified="false";
	
	private List<Form> formList;
	
	private Date createdDate = new Date();
}






