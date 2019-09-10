package com.stackroute.recommendation.model;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import java.util.Date;

/*lombok annotations @Data @AllArgsConstructor @NoArgsConstructor are used for creating constructor, getter and setter*/


@NodeEntity
@NoArgsConstructor
//  swagger documentation
@ApiModel(description = "Recepient Profile Model")
@Data
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Recepient {

    private String userType;

    private String firstName;

    private String lastName;

    @Id
    private String email;

    private String phoneNumber;

    private String password;

    private Date dob;

    private String aadhar;

    private String gender;

    private Address address;

    private String bloodGroup;


}


