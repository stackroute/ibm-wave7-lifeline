package com.stackroute.reportservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
//import org.hibernate.annotations.GeneratorType;
import org.springframework.data.mongodb.core.mapping.Document;

//import javax.persistence.*;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.List;

/*lombok annotations @Data @AllArgsConstructor @NoArgsConstructor are used for creating constructor, getter and setter*/


/*creates a document in mongo db for donor's personal and medical information */
//@Document(collection = "Reportgeneration")
//  swagger documentation
//@ApiModel(description = "Report generation Model")
//@Table(name="report")
@Document(collection = "Reportgeneration")
@Data
//@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Report {

    @Id
    @JsonProperty("id")
    private long id;

    @Transient
    public static final String SEQUENCE_NAME = "reportgeneration_sequence";


    @JsonProperty("userType")
    private String userType;

    @JsonProperty("medicalDetails")
   private MedicalDetails medicalDetails;
//@JsonProperty("request")
// private Request request;



}
