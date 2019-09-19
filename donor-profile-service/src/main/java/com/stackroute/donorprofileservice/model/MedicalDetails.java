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
	private List<Organs> organList;
	private String hlaType;
	private String plateletCount;
	private String rhFactor;
	private String bodyMassIndex;
	private String lungSize;
	private String liverAttenuationIndex;
}
