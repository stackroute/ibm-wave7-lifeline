package com.stackroute.recepientprofileservice.model;


import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.persistence.Transient;
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
    private String bloodGroup;


}



