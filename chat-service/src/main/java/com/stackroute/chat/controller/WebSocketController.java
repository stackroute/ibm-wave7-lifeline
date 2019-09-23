package com.stackroute.chat.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@CrossOrigin
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message/{recepientId}/{donorId}/{donorEmail}")
    public void onReceivedMesage(@DestinationVariable long recepientId, @DestinationVariable long donorId, @DestinationVariable String donorEmail, String message, String type){
        System.out.println(donorId);
        System.out.println(recepientId);
        System.out.println(message);
        if(type.equals("Donor")) {
            this.template.convertAndSend("/chat/" + recepientId + "/" + donorId + "/" + donorEmail, "Donor " + new SimpleDateFormat("HH:mm:ss").format(new Date()) + "- " + message);
        }
        else {
            this.template.convertAndSend("/chat/" + recepientId + "/" + donorId + "/" + donorEmail, "Receiver " + new SimpleDateFormat("HH:mm:ss").format(new Date()) + "- " + message);
        }
    }
}
