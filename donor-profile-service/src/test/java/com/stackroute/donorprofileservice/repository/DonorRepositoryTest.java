package com.stackroute.donorprofileservice.repository;

import com.stackroute.donorprofileservice.model.*;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;


@RunWith(SpringRunner.class)
@DataMongoTest
public class DonorRepositoryTest {
	
	@Autowired
	DonorRepository donorRepository;
	Donor donor;
	Address address;
	Guardian guardian;
	Disease disease;
	Organs organs;
	MedicalDetails medicalDetails;
	private ArrayList<Organs> organsArrayList;
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
		donor = new Donor(101,"D01","donor","Tony","Stark","tony@gmail.com","9876543210","password123",new Date(1985, Calendar.JUNE,23),
				"356478900928","male",address,guardianList,medicalDetails,"true",new ArrayList<>(),new Date());

		donorList = new ArrayList<>();
	}
	
//	executes after each test
	@After
	public void tearDown() {
		donorRepository.deleteAll();
		donorList = null;
	}
	
//	method to check findAll() method of repository
	@Test
	public void testFindAll(){
		Donor donor1 = new Donor(102,"D02","donor","Tony","Stark","tony1@gmail.com","9876543210","password123",new Date(1985, Calendar.JUNE,23),
				"356478900928","male",address,guardianList,medicalDetails,"true",new ArrayList<>(),new Date());
		donorRepository.save(donor);
		donorRepository.save(donor1);
		donorList.add(donor);
		donorList.add(donor1);
		Assert.assertEquals(donorList, donorRepository.findAll());
	}
	
//	method to check findById() method of repository
	@Test
	public void testFindById(){
		donorRepository.save(donor);
		Assert.assertEquals(donor,( donorRepository.findById(donor.getId())).get());
	}
	
//	method to test save() method of repository
	@Test
	public void testSave(){
		Assert.assertEquals(donor,donorRepository.save(donor));
	}

	
//	method to test deleteById() method of repository
	@Test(expected = NoSuchElementException.class)
	public void testDelete(){
		donorRepository.save(donor);
		donorRepository.deleteById(donor.getId());
		Assert.assertNotEquals(donor,donorRepository.findById(donor.getId()).get());
	}
	
//	method to check save() and existsById() method of repository
	@Test
	public void testSaveAndExistsByID(){
		donorRepository.save(donor);
		address.setCity("Erode");
		address.setState("TamilNadu");
		donor.setAddress(address);
		Assert.assertTrue(donorRepository.existsById(donor.getId()));
		donorRepository.save(donor);
		Assert.assertEquals("Erode",(donorRepository.findById(donor.getId()).get()).getAddress().getCity());
	}
}
