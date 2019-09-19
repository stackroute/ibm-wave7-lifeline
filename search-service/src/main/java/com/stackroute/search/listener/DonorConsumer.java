package com.stackroute.search.listener;

import com.stackroute.search.models.Donor;
import com.stackroute.search.repository.DonationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DonorConsumer {

    private DonationRepository donationRepository;

    public DonorConsumer(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    @KafkaListener(topics="DonorSearch", groupId = "search_group_id")
    public void consume(String donorString) throws IOException {
        System.out.println("Donor Consumer");
        System.out.println(donorString);
        Donor donor = new ObjectMapper().readValue(donorString, Donor.class);
        System.out.println(donor);
        donor.getMedicalDetails().getOrganList().forEach( organs -> {
            organs.setName(organs.getName().substring(0, 1).toUpperCase() + organs.getName().substring(1));
        });
        System.out.println(donationRepository.save(donor));
    }
}
