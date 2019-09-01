package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalDetails {
	private String bloodGroup;
	private double height;
	private double weight;
	private Disease disease;
	private Organs organs;
	private String hlaType;
	private long plateletCount;
	private double rhFactor;
	private int bodyMassIndex;
	private int lungSize;
	private int liverAttenuationIndex;
}
