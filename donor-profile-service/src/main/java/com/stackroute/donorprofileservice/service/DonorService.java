package com.stackroute.donorprofileservice.service;

import com.stackroute.donorprofileservice.exception.DonorProfileAlreadyExistsException;
import com.stackroute.donorprofileservice.exception.DonorProfileNotFoundException;
import com.stackroute.donorprofileservice.model.Donor;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface DonorService {
	
	List<Donor> getDonorList();
	
	Donor getDonorById(long id) throws DonorProfileNotFoundException;
	
	Donor saveDonorProfile(Donor donor) throws DonorProfileAlreadyExistsException;
	
	Donor deleteDonorProfile(long id) throws DonorProfileNotFoundException;
	
	Donor updateDonorProfile(long id, Donor donor) throws DonorProfileNotFoundException;
	
	long getNextSequenceId(String key);

	void store(MultipartFile file) throws Exception;

	void sendMail(long id) throws MessagingException, javax.mail.MessagingException;
}
