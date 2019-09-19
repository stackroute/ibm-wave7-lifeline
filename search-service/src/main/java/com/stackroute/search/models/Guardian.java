package com.stackroute.search.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Relationship;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Guardian {

	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String email;
	private String phoneNumber;
	private String relation;
	@Relationship(type = "HAS_ADDRESS")
	private Address address;
}
