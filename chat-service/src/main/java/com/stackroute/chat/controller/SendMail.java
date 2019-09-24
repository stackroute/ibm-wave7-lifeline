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
    @GetMapping(value="/email/{recepientId}/{donorId}/{email}/{name}")
    public String sendEmail(@PathVariable("recepientId") long recepientId, @PathVariable("donorId") long donorId, @PathVariable("email") String email, @PathVariable("name") String name) throws MessagingException {
        MimeMessage message=javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        System.out.println(helper);
        helper.setTo(email);
        helper.setSubject("Request from Recepient ");
        helper.setText("http://52.66.129.41:4200/chat" + "/" + recepientId + "/" + donorId + "/" + email + "/" + name);
        javaMailSender.send(message);
        return "Successfully Sent Email";
    }
}
