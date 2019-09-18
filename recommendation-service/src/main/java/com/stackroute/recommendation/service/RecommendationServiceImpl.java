package com.stackroute.recommendation.service;

import com.stackroute.recommendation.exception.DonorsNotFoundException;
import com.stackroute.recommendation.models.Donor;
import com.stackroute.recommendation.repository.DonorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    private DonorRepository donorRepository;

    public RecommendationServiceImpl(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    @Override
    public List<Donor> retrieveDonors(String name) throws DonorsNotFoundException {
        try {
            List<Donor> donorList = donorRepository.retrieveDonors(name);
            System.out.println(donorList);
            return donorList;
        }
        catch(Exception e) {
            throw new DonorsNotFoundException();
        }
    }
}
