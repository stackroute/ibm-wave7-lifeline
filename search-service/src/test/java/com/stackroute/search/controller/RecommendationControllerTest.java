package com.stackroute.search.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.search.exception.DonorsNotFoundException;
import com.stackroute.search.models.*;
import com.stackroute.search.service.LookUpService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
@ContextConfiguration(classes = RecommendationControllerTest.class)
public class RecommendationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    //Mock for RecommendationService
    @MockBean
    private LookUpService lookUpService;

    //Inject the mocks as dependencies into RecommendationController
    @InjectMocks
    private LookUpController recommendationController;

    private Donor donor;
    private Address address;
    private Guardian guardian;
    private Disease disease;
    private ArrayList<Organs> organsArrayList;
    private Organs organs;
    private MedicalDetails medicalDetails;
    private List<Donor> donorList;
    private List<Guardian> guardianList = new ArrayList<>();

    //	Executes before running test
    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        organsArrayList = new ArrayList<>();
        mockMvc = MockMvcBuilders.standaloneSetup(recommendationController).build();
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
    public void tearDown()  {
        donor = null;
        donorList = null;
    }

    //	Test for retrieveDonors method
    @Test
    public void givenBloodGroupReturnsDonorList() throws Exception{
        when(lookUpService.retrieveDonors(any())).thenReturn(donorList);
        mockMvc.perform(MockMvcRequestBuilders.get("/results/A+")
                .contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    //	Test for retrieveDonors method
    @Test
    public void givenInputReturnDonorsNotFoundException() throws Exception{
        when(lookUpService.retrieveDonors(any())).thenThrow(DonorsNotFoundException.class);
        mockMvc.perform(MockMvcRequestBuilders.get("/results/a")
                .contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
                .andExpect(status().isConflict())
                .andDo(MockMvcResultHandlers.print());
    }

    //	Method to convert JSON into String
    private static String jsonToString(final Object obj)
    {
        try{
            return new ObjectMapper().writeValueAsString(obj);

        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

}
