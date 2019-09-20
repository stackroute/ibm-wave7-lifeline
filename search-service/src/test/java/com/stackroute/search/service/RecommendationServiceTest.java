package com.stackroute.search.service;

import com.stackroute.search.exception.DonorsNotFoundException;
import com.stackroute.search.models.*;
import com.stackroute.search.repository.DonationRepository;
import com.stackroute.search.service.LookUpServiceImpl;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
public class RecommendationServiceTest {

    ///Mock for Donor Repository
    @Mock
    DonationRepository donorRepository;

    //Inject the mocks as dependencies into RecommendationServiceImpl
    @InjectMocks
    LookUpServiceImpl recommendationService;

    Donor donor;
    Address address;
    Guardian guardian;
    Disease disease;
    private ArrayList<Organs> organsArrayList;
    Organs organs;
    MedicalDetails medicalDetails;
    List<Donor> donorList;
    List<Guardian> guardianList = new ArrayList<>();

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
        medicalDetails = new MedicalDetails("O+", 1.0, 1.0, disease, organsArrayList, "HLA-A", "1000000", "-6", "27", "1", "1");
        donor = new Donor(1, "donor","Tony","Stark","tony@gmail.com","9876543210","Password@123",new Date(1985, Calendar.JUNE,23), 22,
                "356478900928","male",address, guardianList, medicalDetails, "true");
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

    //	Test for retrieveDonors service method
    @Test
    public void givenBloodGroupReturnDonorList() throws DonorsNotFoundException {
		when(donorRepository.retrieveDonors("A+")).thenReturn(donorList);

        Assert.assertEquals(donorList,recommendationService.retrieveDonors("A+"));

        verify(donorRepository,times(1)).retrieveDonors("A+");
    }

    //	Test for retrieveDonors service method
    @Test
    public void givenInputReturnDonorsNotFoundException() throws DonorsNotFoundException {
        when(donorRepository.retrieveDonors(any())).thenReturn(new ArrayList<>());

        Assert.assertEquals(new ArrayList<>(),recommendationService.retrieveDonors(null));

        verify(donorRepository,times(1)).retrieveDonors(null);
    }
}
