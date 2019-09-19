package com.stackroute.login.listener;

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
        daoUser.setPassword(passwordEncoder.encode(daoUser.getPassword()));
        System.out.println(daoUser.getEmailVerified());
        userDao.save(daoUser);
    }

    @KafkaListener(topics="DonorRegistration",groupId = "group_id")
    public void consumedonor(DAOUser daoUser) throws IOException {
        System.out.println("Inside Donor");
        System.out.println(daoUser);
        System.out.println(passwordEncoder.encode(daoUser.getPassword()));
        daoUser.setPassword(passwordEncoder.encode(daoUser.getPassword()));
        userDao.save(daoUser);
    }
}
