package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Form {
	private long id;
	private String fileName;
	private String data;
}
