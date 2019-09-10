package com.stackroute.recommendation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Relationship;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Guardian {

	private Long id;
	private String name;
	@Id
	private String email;
	private String phoneNumber;
	private String relation;
	@Relationship(type = "HAS_ADDRESS")
	private Address address;
}
