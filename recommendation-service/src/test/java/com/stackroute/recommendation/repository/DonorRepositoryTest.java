/*
package com.stackroute.recommendation.repository;

import com.stackroute.recommendation.model.*;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.data.neo4j.DataNeo4jTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@DataNeo4jTest
public class DonorRepositoryTest {

    Donor donor;
    Address address;
    Guardian guardian;
    Disease disease;
    Organs organs;
    MedicalDetails medicalDetails;
    private ArrayList<Organs> organsArrayList;
    List<Donor> donorList;
    List<Guardian> guardianList = new ArrayList<>();

    // Mock donor repository
    @Mock
    DonorRepository donorRepository;

    //	Executes before running test
    @Before
    public void setUp() {
        organsArrayList = new ArrayList<>();
        address = new Address(1L, "11b","main road","bengaluru","karnataka","678490");
        guardian = new Guardian(1L, "Peter","peter@gmail.com","7890987654","son",address);
        guardianList.add(guardian);
        disease = new Disease(1L, false,false,false,false,false,false,false,false,false,true,false);
        organs = new Organs(1L,"cornea", true);
        organsArrayList.add(organs);
        organs = new Organs(2L,"kidney", true);
        organsArrayList.add(organs);
        organs = new Organs(3L,"platelet", true);
        organsArrayList.add(organs);
        organs = new Organs(4L,"boneMarrow", true);
        organsArrayList.add(organs);
        organs = new Organs(5L,"blood", true);
        organsArrayList.add(organs);
        organs = new Organs(6L,"heart", true);
        organsArrayList.add(organs);
        organs = new Organs(7L,"lungs", true);
        organsArrayList.add(organs);
        organs = new Organs(8L,"liver", true);
        organsArrayList.add(organs);
        medicalDetails = new MedicalDetails(1L, "O-",1.0, 1.0, disease, organsArrayList, "HLA-A", 1000000, -6, 27, 1, 1);
        donor = new Donor("donor","Tony","Stark","tony@gmail.com","9876543210","password123",new Date(1985, Calendar.JUNE,23), 22,
                "356478900928","male",address, guardianList, medicalDetails);
        donorList = new ArrayList<>();
        donorList.add(donor);
    }

    //	Executes after running test
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

    //	Method to check retrieveDonors() method of Donor Repository
    @Test
    public void callingRetrieveDonorsMethodReturnsDonorList(){
        when(donorRepository.retrieveDonors("O-")).thenReturn(donorList);
        Assert.assertEquals(donorList, donorRepository.retrieveDonors("O-"));
    }

    //	Method to check retrieveDonors() method of Donor Repository
    @Test
    public void callingRetrieveDonorsMethodReturnsNull(){
        when(donorRepository.retrieveDonors("O-")).thenReturn(null);
        Assert.assertEquals(null, donorRepository.retrieveDonors("O-"));
    }

}
*/
