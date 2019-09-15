package com.stackroute.recepientprofileservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.recepientprofileservice.exception.RecepientProfileAlreadyExistsException;
import com.stackroute.recepientprofileservice.exception.RecepientProfileNotFoundException;
import com.stackroute.recepientprofileservice.model.Address;
import com.stackroute.recepientprofileservice.model.Recepient;
import com.stackroute.recepientprofileservice.model.Request;
import com.stackroute.recepientprofileservice.service.RecepientService;
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
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
@ContextConfiguration(classes = RecepientControllerTest.class)
public class RecepientControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RecepientService recepientService;

    @InjectMocks
    private RecepientController recepientController;

    @Mock
    private KafkaTemplate<String, Recepient> kafkaTemplate;

    private Recepient recepient;
    private Address address;
    private List<Recepient> recepientList;



    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(recepientController).build();
        address = new Address("11b","main road","bengaluru","karnataka","678490");

        recepient = new Recepient(101,"recepient","Tony","Stark","tony@gmail.com","9876543210","Password@123",new Date(1985,5,23),
                "356478900928","male",address,"A+", new Date(), new Request(), "true");
        recepientList = new ArrayList<>();
        recepientList.add(recepient);
    }

    @After
    public void tearDown()  {
        recepient = null;
        recepientList = null;
    }

    //Testcase for getrecepientList()
    @Test
    public void getRecepientList() throws Exception{
        when(recepientService.getRecepientList()).thenReturn(recepientList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/recepient")
                .contentType(MediaType.APPLICATION_JSON).content(jsonToString(recepient)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }



    //	Negative Testcase for getrecepientById()
    @Test
    public void getRecepientByIdFailure() throws Exception {
        when(recepientService.getRecepientById(recepient.getId())).thenThrow(RecepientProfileNotFoundException.class);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/recepient/"+recepient.getId())
                .contentType(MediaType.APPLICATION_JSON).content(jsonToString(recepient)))
                .andExpect(status().isConflict())
                .andDo(MockMvcResultHandlers.print());
    }

    //Testcase for saving recepientProfile()
    @Test
    public void saveRecepientProfile() throws Exception {

        when(recepientService.saveRecepientProfile(recepient)).thenReturn(recepient);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/recepient")
                .contentType(MediaType.APPLICATION_JSON).content(jsonToString(recepient)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    //Negative Testcase for saving recepientProfile()
    @Test
    public void saveRecepientProfileFailure() throws Exception {
        when(recepientService.saveRecepientProfile(recepient)).thenThrow(RecepientProfileAlreadyExistsException.class);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/recepient")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonToString(recepient)))
                .andExpect(MockMvcResultMatchers.status().isConflict())
                .andDo(MockMvcResultHandlers.print());
    }

    //	Testcase to update recepient Profile()
    @Test
    public void updateRecepientProfile() throws Exception, RecepientProfileNotFoundException {
        when(recepientService.updateRecepientProfile(anyInt(),any())).thenReturn(recepient);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/recepient/"+recepient.getId())
                .contentType(MediaType.APPLICATION_JSON).content(jsonToString(recepient)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    //Negative Testcase to update recepient Profile()
    @Test
    public void updateRecepientByIdFailure() throws Exception, RecepientProfileNotFoundException {
        when(recepientService.updateRecepientProfile(anyLong(),any())).thenThrow(RecepientProfileNotFoundException.class);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/recepient/"+recepient.getId())
                .contentType(MediaType.APPLICATION_JSON).content(jsonToString(recepient)))
                .andExpect(MockMvcResultMatchers.status().isConflict())
                .andDo(MockMvcResultHandlers.print());
    }

    //	Testcase to delete recepientProfile()
    @Test
    public void deleterecepientProfile() throws Exception, RecepientProfileNotFoundException {
        when(recepientService.deleteRecepientProfile(anyInt())).thenReturn(recepient);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/recepient/"+recepient.getId())
                .contentType(MediaType.APPLICATION_JSON).content(jsonToString(recepient)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    //	Negative Testcase to delete recepientProfile()
    @Test
    public void deleteRecepientByIdFailure() throws Exception, RecepientProfileNotFoundException {
        when(recepientService.deleteRecepientProfile(anyLong())).thenThrow(RecepientProfileNotFoundException.class);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/recepient/"+recepient.getId()))

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

