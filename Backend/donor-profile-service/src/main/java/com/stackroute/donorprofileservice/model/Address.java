package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//lombok annotation
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
	private String addressLine1;
	private String addressLine2;
	private String city;
	private String state;
	private String pinCode;
}
