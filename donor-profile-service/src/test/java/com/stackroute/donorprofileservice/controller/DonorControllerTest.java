package com.stackroute.donorprofileservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.donorprofileservice.exception.DonorProfileAlreadyExistsException;
import com.stackroute.donorprofileservice.exception.DonorProfileNotFoundException;
import com.stackroute.donorprofileservice.model.*;
import com.stackroute.donorprofileservice.service.DonorService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
@ContextConfiguration(classes = DonorControllerTest.class)
public class DonorControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private DonorService donorService;
	
	@InjectMocks
	private DonorController donorController;

	@Mock
	private KafkaTemplate<String,Donor> kafkaTemplate;

	private Donor donor;
	private Address address;
	private Guardian guardian;
	private Form form;
	private Disease disease;
	private ArrayList<Organs> organList;
	private Organs organs;
	private List<Form> formList = new ArrayList<>();
	private MedicalDetails medicalDetails;
	private List<Donor> donorList;
	private List<Guardian> guardianList = new ArrayList<>();

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		organList = new ArrayList<>();
		mockMvc = MockMvcBuilders.standaloneSetup(donorController).build();
		address = new Address("11b ","main road","bengaluru","karnataka","344449");
		guardian = new Guardian("Peter","peter@mailinator.com","9876543210","son",address);
		guardianList.add(guardian);
		disease = new Disease(false,false,false,false,false,false,false,false,false,true,false);
		organs = new Organs(1, "cornea", true);
		organList.add(organs);
		organs = new Organs(2, "kidney", true);
		organList.add(organs);
		organs = new Organs(3, "platelet", true);
		organList.add(organs);
		organs = new Organs(4, "boneMarrow", true);
		organList.add(organs);
		organs = new Organs(5, "blood", true);
		organList.add(organs);
		organs = new Organs(6, "heart", true);
		organList.add(organs);
		organs = new Organs(7, "lungs", true);
		organList.add(organs);
		organs = new Organs(8, "liver", true);
		organList.add(organs);
		form = new Form(1,"sample.txt");
		formList.add(form);
		medicalDetails = new MedicalDetails("O+",disease, organList, "HLA-A", "100000000", "1.5", "27", "100", "6" );
		donor = new Donor(101,"D01","donor","Tony","Stark","tony1@mailinator.com","9876543210","PaSsword@123",new Date(1985, Calendar.JUNE,23),
				"987654321098","male",address,guardianList,medicalDetails,"true",formList,new Date());
		donorList = new ArrayList<>();
		donorList.add(donor);
	}

	
	@After
	public void tearDown()  {
		donor = null;
		donorList = null;
	}
	
//	Testcase for getDonorList()
	@Test
	public void getDonorList() throws Exception{
		when(donorService.getDonorList()).thenReturn(donorList);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/donors")
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}
	
//	Testcase for getDonorById()
	@Test
	public void getDonorById() throws Exception{
		when(donorService.getDonorById(donor.getId())).thenReturn(donor);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/donor/"+donor.getId())
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}
	//Negative Testcase for getDonorByIdFailure()
	@Test
	public void getDonorByIdFailure() throws Exception{
		when(donorService.getDonorById(donor.getId())).thenThrow(DonorProfileNotFoundException.class);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/donor/"+donor.getId())
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(status().isConflict())
				.andDo(MockMvcResultHandlers.print());
	}
//	Testcase for saveDonorProfile()
	@Test
	public void saveDonorProfile() throws Exception {
		when(kafkaTemplate.send(any(), any())).thenReturn(any());
//		donor.fo
		when(donorService.saveDonorProfile(donor)).thenReturn(donor);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/donor")
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}
	//Negative Testcase for saveDonorProfileFailure
	@Test
	public void saveDonorProfileFailure() throws Exception {
		when(kafkaTemplate.send(any(), any())).thenReturn(any());
		when(donorService.saveDonorProfile(donor)).thenThrow(DonorProfileAlreadyExistsException.class);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/donor")
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(status().isConflict())
				.andDo(MockMvcResultHandlers.print());
	}

//	Testcase for updateDonorProfile()
	@Test
	public void updateDonorProfile() throws Exception {
		when(donorService.updateDonorProfile(anyInt(),any())).thenReturn(donor);
		mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/donor/"+donor.getId())
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}
	//Negative Testcase for updateDonorProfile()
	@Test
	public void updateDonorProfileFailure() throws Exception {
		when(donorService.updateDonorProfile(anyLong(),any())).thenThrow(DonorProfileNotFoundException.class);
		mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/donor/"+donor.getId())
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(MockMvcResultMatchers.status().isConflict())
				.andDo(MockMvcResultHandlers.print());
	}
//	Testcase for deleteDonorProfile()
	@Test
	public void deleteDonorProfile() throws Exception {
		when(donorService.getDonorById(anyInt())).thenReturn(donor);
		when(donorService.deleteDonorProfile(anyInt())).thenReturn(donor);
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/donor/"+donor.getId())
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}
	//Negative Testcase for deleteDonorProfileFailure()
	@Test
	public void deleteDonorProfileFailure() throws Exception {
		when(donorService.deleteDonorProfile(anyLong())).thenThrow(DonorProfileNotFoundException.class);
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/donor/"+donor.getId()))
				.andExpect(MockMvcResultMatchers.status().isConflict())
				.andDo(MockMvcResultHandlers.print());
	}
	//	method to covert json into string
	private static String jsonToString(final Object obj)
	{
		try{
			return new ObjectMapper().writeValueAsString(obj);
			
		}catch(Exception e){
			throw new RuntimeException(e);
		}
	}
	
}
