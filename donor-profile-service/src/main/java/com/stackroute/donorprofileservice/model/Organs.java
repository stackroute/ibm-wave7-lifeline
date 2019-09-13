package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Organs {
	@NotNull
	private long id;

	@NotNull
	private String name;
	
	@NotNull
	private boolean donateOrNot;
}
