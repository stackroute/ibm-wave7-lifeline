package com.stackroute.recommendation.service;

import com.stackroute.recommendation.exception.DonorsNotFoundException;
import com.stackroute.recommendation.model.Donor;
import com.stackroute.recommendation.repository.DonorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    DonorRepository donorRepository;

    public RecommendationServiceImpl(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    @Override
    public List<Donor> retrieveDonors(String name) throws DonorsNotFoundException {
        try {
            return donorRepository.retrieveDonors(name);
        }
        catch(Exception e) {
            throw new DonorsNotFoundException();
        }
    }
}
