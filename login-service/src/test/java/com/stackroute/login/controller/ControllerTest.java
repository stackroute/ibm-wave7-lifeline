package com.stackroute.login.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.login.LoginApplication;
import com.stackroute.login.config.JwtTokenUtil;
import com.stackroute.login.model.User;
import com.stackroute.login.model.UserDTO;
import com.stackroute.login.service.JwtUserDetailsService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//import org.aspectj.lang.annotation.Before;

@RunWith(SpringRunner.class)
@WebMvcTest
@ContextConfiguration(classes = LoginApplication.class)
public class ControllerTest {

    @Autowired
    private MockMvc mockMvc;
//    @Autowired
    private User daouser;
//    @Autowired
    @Mock
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtUserDetailsService jwtUserDetailsService;

//    @InjectMocks
    @MockBean
    private JwtAuthenticationController jwtAuthenticationController;

    @Mock
    private JwtTokenUtil jwtTokenUtil;

    private List<User> list = null;
    private UserDTO userDTO;

    @Before
    public void setUp() {

        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(jwtAuthenticationController).build();
        daouser = new User();
        daouser.setUsername("ascv");
        daouser.setPassword("Jonny");


        list = new ArrayList();

      list.add(daouser);
        userDTO = new UserDTO();
        userDTO.setUsername("ascv");
        userDTO.setPassword("Jonny");
        userDTO.setRole("donor");

    }

//    @Test
//    public void saveUser() throws Exception {
//        when(jwtUserDetailsService.save(any())).thenReturn(daouser);
//        mockMvc.perform(MockMvcRequestBuilders.post("/register")
//                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(daouser)))
//                .andExpect(status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//    }

    @Test
    public void saveUser() throws Exception {
        when(jwtUserDetailsService.loadUserByUsername(userDTO.getUsername())).thenReturn(new org.springframework.security.core.userdetails.User(daouser.getUsername(), daouser.getPassword(), new ArrayList<>()));
        when(jwtTokenUtil.generateToken(new org.springframework.security.core.userdetails.User(daouser.getUsername(), daouser.getPassword(), new ArrayList<>()))).thenReturn("Hello");
        mockMvc.perform(post("/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(userDTO)))
                .andExpect(status().isOk());
    }

//    @Test
//    public void createAuthenticationToken() throws Exception {
//        when(jwtAuthenticationController.authenticate(any(), any())).thenReturn(daouser);
//        mockMvc.perform(MockMvcRequestBuilders.post("/")
//                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(daouser)))
//                .andExpect(status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}