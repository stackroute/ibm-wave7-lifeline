package com.stackroute.search.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@RestController
@RequestMapping(value="api/v1")
public class SendMail{

    @Autowired
    private JavaMailSender javaMailSender;

    // Pass the Username in the Parameter
    @GetMapping(value="/email")
    public String sendEmail() throws MessagingException {
        MimeMessage message=javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo("username");
        helper.setSubject("Request from Recepient ");
        helper.setText("link"); //link for doner to chat is /chat/{id}
        javaMailSender.send(message);
        return "Successfully Sent Email";
    }
}
