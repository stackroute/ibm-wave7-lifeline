package com.stackroute.recepientprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Request {
	

	private long id;
	
	private List<String> requestedOrganList;
	
	private String status;
}
