package com.stackroute.search.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;

//lombok annotation
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
	@Id
	@GeneratedValue
	private Long id;
	private String addressLine1;
	private String addressLine2;
	private String city;
	private String state;
	private String pinCode;
}
