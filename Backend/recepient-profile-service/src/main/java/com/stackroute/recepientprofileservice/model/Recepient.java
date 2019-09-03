package com.stackroute.recepientprofileservice.model;


import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

/*lombok annotations @Data @AllArgsConstructor @NoArgsConstructor are used for creating constructor, getter and setter*/


@NoArgsConstructor

/*creates a document in mongo db for donor's personal and medical information */
@Document(collection = "RecepientProfile")
//  swagger documentation
@ApiModel(description = "Recepient Profile Model")
@Data
@AllArgsConstructor
public class Recepient {


    @Transient
    public static final String SEQUENCE_NAME = "recepient_sequence";

    @Id
    private Long id;

    @NotNull(message = "usertype is mandatory")
    private String userType;

    @NotNull(message = "firstname is mandatory")
    @Pattern(regexp = "[a-zA-Z]{3,30}" )
    private String firstName;

    @NotNull(message = "lastname is mandatory")
    @Pattern(regexp = "[a-zA-Z]{3,30}" )
    private String lastName;

    @NotNull(message = "email is mandatory")
    @Email
    private String email;

    @Pattern(regexp="(^$|[0-9]{10})")
    @NotNull(message = "phone number is mandatory")
    private String phoneNumber;

    @NotNull(message = "password number is mandatory")
    private String password;

    @NotNull(message = "dob number is mandatory")
    private Date dob;

    @Pattern(regexp="(^$|[0-9]{12})")
    @NotNull(message = "aadhar number is mandatory")
    private String aadhar;

    @NotNull(message = "gender number is mandatory")
    private String gender;

    @NotNull(message = "address number is mandatory")
    private Address address;

    @NotNull(message = "bloodGroup number is mandatory")
    private String bloodGroup;


}



