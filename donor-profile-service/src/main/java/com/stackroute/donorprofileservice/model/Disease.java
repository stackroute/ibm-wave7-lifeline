package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Disease {
	private boolean hiv;
	private boolean fits;
	private boolean hepatitis;
	private boolean heartAttack;
	private boolean rabies;
	private boolean tuberculosis;
	private boolean hyperTension;
	private boolean diabetes;
	private boolean cancer;
	private boolean	kidneyDisease;
	private boolean	liverDisease;
}
