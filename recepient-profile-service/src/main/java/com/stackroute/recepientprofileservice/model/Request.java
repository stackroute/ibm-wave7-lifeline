package com.stackroute.recepientprofileservice.model;

import javax.validation.constraints.NotNull;
import java.util.List;

public class Request {
	
	@NotNull
	private long id;
	
	@NotNull
	private List<String> requestedOrganList;
	
	@NotNull
	private String status;
}
