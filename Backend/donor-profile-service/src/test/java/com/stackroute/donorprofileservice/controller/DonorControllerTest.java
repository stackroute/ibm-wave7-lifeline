package com.stackroute.donorprofileservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.discovery.converters.Auto;
import com.stackroute.donorprofileservice.model.*;
import com.stackroute.donorprofileservice.service.DonorService;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.TopicPartition;
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
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.SendResult;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.concurrent.ListenableFuture;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;
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
	private Disease disease;
	private ArrayList<Organs> organsArrayList;
	private Organs organs;
	private MedicalDetails medicalDetails;
	private List<Donor> donorList;
	private List<Guardian> guardianList = new ArrayList<>();
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		organsArrayList = new ArrayList<>();
		mockMvc = MockMvcBuilders.standaloneSetup(donorController).build();
		address = new Address("11b","main road","bengaluru","karnataka","678490");
		guardian = new Guardian("Peter","peter@gmail.com","7890987654","son",address);
		guardianList.add(guardian);
		disease = new Disease(false,false,false,false,false,false,false,false,false,true,false);
		organs = new Organs("cornea", true);
		organsArrayList.add(organs);
		organs = new Organs("kidney", true);
		organsArrayList.add(organs);
		organs = new Organs("platelet", true);
		organsArrayList.add(organs);
		organs = new Organs("boneMarrow", true);
		organsArrayList.add(organs);
		organs = new Organs("blood", true);
		organsArrayList.add(organs);
		organs = new Organs("heart", true);
		organsArrayList.add(organs);
		organs = new Organs("lungs", true);
		organsArrayList.add(organs);
		organs = new Organs("liver", true);
		organsArrayList.add(organs);
		medicalDetails = new MedicalDetails("O+",160,80,disease,organsArrayList, "HLA-A", 100000000, 1.5, 27, 100, 6 );
		donor = new Donor(101,"donor","Tony","Stark","tony@gmail.com","9876543210","password123",new Date(1985,5,23),
				"356478900928","male",address,guardianList,medicalDetails);
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
	
//	Testcase for saveDonorProfile()
	@Test
	public void saveDonorProfile() throws Exception {
		when(kafkaTemplate.send(any(), any())).thenReturn(any());
		when(donorService.saveDonorProfile(donor)).thenReturn(donor);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/donor")
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(status().isCreated())
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
	
//	Testcase for deleteDonorProfile()
	@Test
	public void deleteDonorProfile() throws Exception {
		when(donorService.deleteDonorProfile(anyInt())).thenReturn(donor);
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/donor/"+donor.getId())
				.contentType(MediaType.APPLICATION_JSON).content(jsonToString(donor)))
				.andExpect(MockMvcResultMatchers.status().isOk())
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