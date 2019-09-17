package com.stackroute.reportservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MedicalDetails {
	@NotNull
	private String bloodGroup;
	@JsonProperty("organList")
	private List<Organs> organs;
	private String hlaType;
	private String plateletCount;
	private String rhFactor;
	private String bodyMassIndex;
	private String lungSize;
	private String liverAttenuationIndex;
}
