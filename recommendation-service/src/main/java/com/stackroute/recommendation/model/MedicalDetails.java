package com.stackroute.recommendation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalDetails {
	@Id
	@GeneratedValue
	private Long id;
	private String bloodGroup;
	private double height;
	private double weight;
	private Disease disease;
	private List<Organs> organs;
	private String hlaType;
	private long plateletCount;
	private double rhFactor;
	private int bodyMassIndex;
	private int lungSize;
	private int liverAttenuationIndex;
}
