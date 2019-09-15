package com.stackroute.login.repository;


import com.stackroute.login.model.User;
import com.stackroute.login.model.UserDTO;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.when;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
public class RepositoryTest {

    @Mock
    UserRepository userRepository;

    User user;

    UserDTO userDTO;

    @Before
    public void setUp() {
        user = new User();
        user.setPassword("dwyg");
        user.setUsername("John");
        userDTO = new UserDTO();
        userDTO.setPassword("dwyg");
        userDTO.setUsername("John");
    }

    @After
    public void tearDown() {
        userRepository.deleteAll();
    }
    
    @Test
    public void findByUsername() {
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
        Assert.assertEquals(user, userRepository.findByUsername(userDTO.getUsername()));
    }




}