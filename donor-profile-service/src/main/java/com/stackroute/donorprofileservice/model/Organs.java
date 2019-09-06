package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

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
