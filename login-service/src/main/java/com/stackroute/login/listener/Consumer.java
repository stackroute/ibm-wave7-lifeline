package com.stackroute.login.listener;

import com.stackroute.login.repository.UserRepository;
import com.stackroute.login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
@Service
public class Consumer {
    private final Logger logger = LoggerFactory.getLogger(Consumer.class.getName());

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
//    @KafkaListener(topics="DonorRegistration",groupId = "group_id")
//    public void check(String message) throws IOException {
//      System.out.println(message);
//    }

    @KafkaListener(topics="RecepientRegistration",groupId = "group_id")
    public void consume(User user) throws IOException {
        logger.info("Inside Recipient");
        logger.info(""+ user);
        logger.info(user.getEmailVerified());
        System.out.println(user.getEmailVerified());
        User presentUser = userRepository.findByUsername(user.getUsername());
        System.out.println(presentUser);
        if(user.getRole().equals(" ")) {
            userRepository.delete(presentUser);
        }
        else if (presentUser != null) {
            presentUser.setEmailVerified((user.getEmailVerified()));
            userRepository.save(presentUser);
        }
        else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        }
    }    

    @KafkaListener(topics="DonorRegistration",groupId = "group_id")
    public void consumedonor(User user) throws IOException {
        logger.info("Inside Donor");
        logger.info(""+ user);
        logger.info(passwordEncoder.encode(user.getPassword()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getEmailVerified());
        User presentUser = userRepository.findByUsername(user.getUsername());
        if(user.getRole().equals(" ")) {
            userRepository.delete(presentUser);
        }
        else if (presentUser != null) {
            presentUser.setEmailVerified((user.getEmailVerified()));
            userRepository.save(presentUser);
        }
        else {
            userRepository.save(user);
        }
    }
}
