package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

//lombok annotation
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
	@NotNull
	private String addressLine1;
	@NotNull
	private String addressLine2;
	@NotNull
	private String city;
	@NotNull
	private String state;
	@NotNull
	@Pattern(regexp="(^$|[0-9]{6})")
	private String pinCode;
}
