package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Guardian {
	@NotNull
	private String name;
	@NotNull
	private String email;
	@NotNull
	private String phoneNumber;
	@NotNull
	private String relation;
	@NotNull
	private Address address;
}
