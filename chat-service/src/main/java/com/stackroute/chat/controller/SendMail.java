package com.stackroute.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@RestController
@CrossOrigin
public class SendMail{

    @Autowired
    private JavaMailSender javaMailSender;

    // Pass the Username in the Parameter
    @GetMapping(value="/email/{recepientId}/{donorId}/{email}")
    public String sendEmail(@PathVariable("recepientId") long recepientId, @PathVariable("donorId") long donorId, @PathVariable("email") String email) throws MessagingException {
        MimeMessage message=javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        System.out.println(helper);
        helper.setTo(email);
        helper.setSubject("Request from Recepient ");
        helper.setText("http://172.23.238.228:8084/chat/" + donorId + "/" + recepientId); //link for doner to chat is /chat/{id}
        javaMailSender.send(message);
        return "Successfully Sent Email";
    }
}
