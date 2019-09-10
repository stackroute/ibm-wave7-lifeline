package com.stackroute.recommendation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Organs {
	@Id
	@GeneratedValue
	private Long id;

	private String organ;

	private boolean donateOrNot;

}
