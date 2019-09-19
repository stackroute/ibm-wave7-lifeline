package com.stackroute.recommendation.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @PostMapping("/send/message/{recepientId}/{donorId}")
    public void onReceivedMesage(@PathVariable long recepientId, @PathVariable long donorId, String message){
        System.out.println(message);
        this.template.convertAndSend("/chat/"+recepientId+"/"+donorId, "Client "+ new SimpleDateFormat("HH:mm:ss").format(new Date())+"- "+message);
    }
}
