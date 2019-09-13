package com.stackroute.search.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Disease {
	@Id
	@GeneratedValue
	private Long id;
	private boolean hiv;
	private boolean fits;
	private boolean hepatitis;
	private boolean heartAttack;
	private boolean rabies;
	private boolean tuberculosis;
	private boolean hyperTension;
	private boolean diabetes;
	private boolean cancer;
	private boolean	kidneyDisease;
	private boolean	liverDisease;
}
