package com.stackroute.login.service;

import java.util.ArrayList;

import com.stackroute.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.stackroute.login.model.User;
import com.stackroute.login.model.UserDTO;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder bcryptEncoder;
    @Autowired
    private JavaMailSender javaMailSender;

    private UserDTO userDTO;
    
    @Autowired
    public JwtUserDetailsService(UserRepository userRepository) {this.userRepository = userRepository;}

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public User getUserData(String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }

    public User save(UserDTO userDTO) {
        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setPassword(bcryptEncoder.encode(userDTO.getPassword()));
        newUser.setRole(userDTO.getRole());
        return userRepository.save(newUser);
    }
    public User update(UserDTO userDTO) throws Exception {
        User updateUser = userRepository.findByUsername(userDTO.getUsername());
        if (updateUser != null) {
            updateUser.setPassword(bcryptEncoder.encode(userDTO.getPassword()));
        }
        System.out.println(updateUser);
        return userRepository.save(updateUser);
    }
    public String forgotPassword(String username) throws MessagingException {
        String status = "Failed";
        System.out.println(username);
        System.out.println(userRepository.findByUsername(username));
        System.out.println("abcd");
        if (userRepository.findByUsername(username) != null) {
            System.out.println(username);
            System.out.println("efgh");
            MimeMessage message=javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(username);
            helper.setSubject("Link for Reset your Password");
            helper.setText("http://172.23.238.202:4200/resetPassword");
            javaMailSender.send(message);
            System.out.println("hello");
            status = "Sent";
        }
        else {

        }
        return status;
    }

    //    @Override
    public User updatePassword(UserDTO userDTO) throws Exception {
        User user = userRepository.findByUsername(userDTO.getUsername());
        if (user != null) {
            user.setPassword(bcryptEncoder.encode(userDTO.getPassword()));
        }
        return userRepository.save(user);
    }

}

