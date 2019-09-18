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

    @KafkaListener(topics="DonorRegistration", groupId = "search_group_id")
    public void consume(String donorString) throws IOException {
        System.out.println("Donor Consumer");
        Donor donor = new ObjectMapper().readValue(donorString, Donor.class);
        donor.getMedicalDetails().getOrganList().forEach( organs -> {
            organs.setName(organs.getName().substring(0, 1).toUpperCase() + organs.getName().substring(1));
        });
        Donor saveDonor = donationRepository.findByEmail(donor.getEmail());
        if (saveDonor != null) {
            saveDonor.setEmailVerified((saveDonor.getEmailVerified()));
            System.out.println(donationRepository.save(saveDonor));
        } else {
            System.out.println(donationRepository.save(saveDonor));

        }
    }
}
