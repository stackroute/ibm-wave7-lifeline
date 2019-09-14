package com.stackroute.donorprofileservice.exception;

public class DonorProfileAlreadyExistsException extends Exception {
	public DonorProfileAlreadyExistsException() {
	}
	
	public DonorProfileAlreadyExistsException(String message) {
		super(message);
	}
}
