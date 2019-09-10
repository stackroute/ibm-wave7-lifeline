package com.stackroute.login.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.login.dao.UserDao;
import com.stackroute.login.model.DAOUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
@Service
public class Consumer {

    @Autowired
    UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;
//    @KafkaListener(topics="DonorRegistration",groupId = "group_id")
//    public void check(String message) throws IOException {
//      System.out.println(message);
//    }

    @KafkaListener(topics="RecepientRegistration",groupId = "group_id")
    public void consume(DAOUser daoUser) throws IOException {
        System.out.println("Inside Recipient");
        System.out.println(daoUser);
        DAOUser obj=new DAOUser();
        daoUser.setPassword(passwordEncoder.encode(daoUser.getPassword()));
        System.out.println(daoUser.getEmailVerified());
        userDao.save(daoUser);
    }

    @KafkaListener(topics="DonorRegistration",groupId = "group_id")
    public void consumedonor(String daoUser) throws IOException {
        System.out.println("Inside Donor");
        DAOUser obj=new ObjectMapper().readValue(daoUser,DAOUser.class);
        System.out.println(passwordEncoder.encode(obj.getPassword()));
        obj.setPassword(passwordEncoder.encode(obj.getPassword()));
        userDao.save(obj);
    }
}
