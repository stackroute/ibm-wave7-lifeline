package com.stackroute.recepientprofileservice.exception;

public class RecepientProfileAlreadyExistsException extends Exception {
	public RecepientProfileAlreadyExistsException() {
	}
	
	public RecepientProfileAlreadyExistsException(String message) {
		super(message);
	}
}
