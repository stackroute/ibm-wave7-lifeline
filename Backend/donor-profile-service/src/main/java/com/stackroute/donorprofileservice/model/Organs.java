package com.stackroute.donorprofileservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Organs {
	private boolean cornea;
	private boolean blood;
	private boolean liver;
	private boolean heart;
	private boolean kidney;
	private boolean platelet;
	private boolean lungs;
	private boolean boneMarrow;
}
