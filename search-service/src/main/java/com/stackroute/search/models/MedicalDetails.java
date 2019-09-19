package com.stackroute.search.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalDetails {
	private String bloodGroup;
	private double height;
	private double weight;
	private Disease disease;
	@Id
	private List<Organs> organList;
	private String hlaType;
	private String plateletCount;
	private String rhFactor;
	private String bodyMassIndex;
	private String lungSize;
	private String liverAttenuationIndex;
}
