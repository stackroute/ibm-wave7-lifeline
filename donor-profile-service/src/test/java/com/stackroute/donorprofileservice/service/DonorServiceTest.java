package com.stackroute.donorprofileservice.service;

import com.stackroute.donorprofileservice.exception.DonorProfileAlreadyExistsException;
import com.stackroute.donorprofileservice.exception.DonorProfileNotFoundException;
import com.stackroute.donorprofileservice.model.*;
import com.stackroute.donorprofileservice.repository.DonorRepository;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class DonorServiceTest {

	//Create a mock for DonorRepository
	@Mock
	DonorRepository donorRepository;

	//Inject the mocks as dependencies into DonorServiceImpl
	@InjectMocks
	DonorServiceImpl donorService;
	
	Donor donor;
	Address address;
	Guardian guardian;
	Disease disease;
	private ArrayList<Organs> organsArrayList;
	Organs organs;
	MedicalDetails medicalDetails;
	List<Donor> donorList;
	List<Guardian> guardianList = new ArrayList<>();
	
	//	executes before each test
	@Before
	public void setUp() {
		address = new Address("11b","main road","bengaluru","karnataka","678490");
		guardian = new Guardian("Peter","peter@gmail.com","7890987654","son",address);
		organsArrayList = new ArrayList<>();
		guardianList.add(guardian);
		disease = new Disease(false,false,false,false,false,false,false,false,false,true,false);
		organs = new Organs(1, "cornea", true);
		organsArrayList.add(organs);
		organs = new Organs(2, "kidney", true);
		organsArrayList.add(organs);
		organs = new Organs(3, "platelet", true);
		organsArrayList.add(organs);
		organs = new Organs(4, "boneMarrow", true);
		organsArrayList.add(organs);
		organs = new Organs(5, "blood", true);
		organsArrayList.add(organs);
		organs = new Organs(6, "heart", true);
		organsArrayList.add(organs);
		organs = new Organs(7, "lungs", true);
		organsArrayList.add(organs);
		organs = new Organs(8, "liver", true);
		organsArrayList.add(organs);
		medicalDetails = new MedicalDetails("O+",disease,organsArrayList, "HLA-A", "100000000", "1.5", "27", "100", "6" );
		donor = new Donor(101,"D01","donor","Tony","Stark","tony@gmail.com","9876543210","password123",new java.util.Date(1985, Calendar.JUNE,23),
				"356478900928","male",address,guardianList,medicalDetails,"true",new ArrayList<>(),new Date());
		donorList = new ArrayList<>();
	}
	
	//	executes after each test
	@After
	public void tearDown() {
		address = null;
		guardian = null;
		guardianList = null;
		disease = null;
		organs = null;
		medicalDetails = null;
		donor = null;
		donorList = null;
	}

//	Test for getDonorList service method
	@Test
	public void getDonorList() {
		donorRepository.save(donor);
		donorList.add(donor);
		
//		stubbing the mock to return specific data
		when(donorRepository.findAll()).thenReturn(donorList);
		
		Assert.assertEquals(donorList,donorService.getDonorList());
		
//      verifies that donorRepository's findAll method is called only once
		verify(donorRepository,times(1)).findAll();
	}
	
//	Test for getDonorById service method
	@Test
	public void getDonorById() throws DonorProfileNotFoundException {
		donorRepository.save(donor);
//		stubbing the mock to return specific data
		when(donorRepository.findById(donor.getId())).thenReturn(Optional.of(donor));
		when(donorRepository.existsById(donor.getId())).thenReturn(true);
		
		Assert.assertEquals(donor,donorService.getDonorById(donor.getId()));
		
//      verifies that donorRepository's findById method is called only once
		verify(donorRepository,times(1)).findById(donor.getId());
	}

//	Test for saveDonorProfile service method
	@Test
	public void saveDonorProfile() throws DonorProfileAlreadyExistsException {
		when(donorRepository.save(donor)).thenReturn(donor);
		when(donorRepository.existsById(donor.getId())).thenReturn(false);
//		Assert.assertEquals(donor,donorService.saveDonorProfile(donor));

//      verifies that donorRepository's save method is called only once
//		verify(donorRepository,times(1)).save(donor);
	}


//	Test for deleteDonorProfile service method
	@Test
	public void deleteDonorProfile() throws DonorProfileNotFoundException, DonorProfileAlreadyExistsException{
//		stubbing the mock to return specific data
		when(donorRepository.existsById(donor.getId())).thenReturn(true);
		when(donorRepository.findById(donor.getId())).thenReturn(Optional.of(donor));
		
		Assert.assertEquals(donor,donorService.deleteDonorProfile(donor.getId()));

//      verifies that donorRepository's deleteById method is called only once
		verify(donorRepository,times(1)).deleteById(donor.getId());
//      verifies that donorRepository's existsById method is called only once
		verify(donorRepository,times(1)).existsById(donor.getId());
//      verifies that donorRepository's findById method is called only once
		verify(donorRepository,times(1)).findById(donor.getId());
	}

	//	Test for updateTrack service method
	@Test
	public void updateDonorProfile() throws DonorProfileNotFoundException {

//		stubbing the mock to return specific data
		when(donorRepository.save(donor)).thenReturn(donor);
		when(donorRepository.existsById(donor.getId())).thenReturn(true);
		
		address.setAddressLine1("door no:11");
		donor.setAddress(address);
		
		Assert.assertEquals(donor,donorService.updateDonorProfile(donor.getId(),donor));
		
//      verifies that donorRepository's save method is called only once
		verify(donorRepository,times(1)).save(donor);
//      verifies that donorRepository's existsById method is called only once
		verify(donorRepository,times(1)).existsById(donor.getId());
	}
}

