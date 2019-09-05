package com.stackroute.login.service;


import com.stackroute.login.dao.UserDao;
import com.stackroute.login.model.DAOUser;

import com.stackroute.login.model.UserDTO;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ServiceTest {

    @Mock
    private PasswordEncoder bcryptEncoder;

    //Inject the mocks as dependencies into UserServiceImpl
    @Mock
    JwtUserDetailsService jwtUserDetailsService;

    List<UserDTO> list = null;

    @Mock
    UserDao userDao;

    DAOUser daoUser;

    UserDTO userDTO;

    @Before
    public void setUp() {
        //Initialising the mock object
        MockitoAnnotations.initMocks(this);
        userDTO = new UserDTO();
        userDTO.setUsername("John");
        userDTO.setPassword("uhds");

        daoUser = new DAOUser();
        daoUser.setUsername("John");
        daoUser.setPassword("uhds");

        list = new ArrayList<>();
        list.add(userDTO);
    }

    @Test
    public void saveUserTestSuccess() {
        when(jwtUserDetailsService.save(userDTO)).thenReturn(daoUser);
        Assert.assertEquals(daoUser, jwtUserDetailsService.save(userDTO));
        //verify here verifies that userRepository save method is only called once
//        verify(userDao,times(1)).save(daoUser);
    }
//    @Test
//    public void loadUserByName() {
//        when(userDao.findByUsername(daoUser.getUsername())).thenReturn(daoUser);
//        when(jwtUserDetailsService.loadUserByUsername(any()));
//        System.out.println(jwtUserDetailsService.loadUserByUsername(daoUser.getUsername()));
//      //Assert.assertEquals(new User(daoUser.getUsername(), daoUser.getPassword(), new ArrayList<>()),jwtUserDetailsService.loadUserByUsername(daoUser.getUsername()));
//    //verify here verifies that userRepository save method is only called once
////        verify(userDao,times(1)).save(daoUser);
//    }


}
