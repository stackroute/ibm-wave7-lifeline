package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Guardian {
	private String name;
	private String email;
	private String phoneNumber;
	private String relation;
	private Address address;
}
