package com.stackroute.chat.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message/{type}/{recepientId}/{donorId}/{name}")
    public void onReceivedMesage(@DestinationVariable long recepientId, @DestinationVariable long donorId, @DestinationVariable String type,@DestinationVariable String name, String message){
        if(type.equals("donor")) {
            this.template.convertAndSend("/chat/" + recepientId + "/" + donorId, name + "-" + message);
        }
        else {
            this.template.convertAndSend("/chat/" + recepientId + "/" + donorId, name + "-" + message);
        }
    }
}
