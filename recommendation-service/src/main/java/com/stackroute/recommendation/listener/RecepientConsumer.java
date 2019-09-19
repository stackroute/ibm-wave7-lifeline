package com.stackroute.recommendation.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.recommendation.model.Recepient;
import com.stackroute.recommendation.repository.RecepientRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class RecepientConsumer {

    private RecepientRepository recepientRepository;

    public RecepientConsumer(RecepientRepository recepientRepository) {
        this.recepientRepository = recepientRepository;
    }

    @KafkaListener(topics="RecepientRegistration",groupId = "recommendation_group_id")
    public void consume(String recepientString) throws IOException {
        System.out.println("Recepient Consumer");
        Recepient recepient = new ObjectMapper().readValue(recepientString, Recepient.class);
        System.out.println(recepientRepository.save(recepient));
    }
}
