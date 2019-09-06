package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalDetails {
	@NotNull
	private String bloodGroup;
	private Disease disease;
	private List<Organs> organs;
	private String hlaType;
	private long plateletCount;
	private double rhFactor;
	private int bodyMassIndex;
	private int lungSize;
	private int liverAttenuationIndex;
}
