package com.stackroute.recommendation.service;

import com.stackroute.recommendation.exception.DonorsNotFoundException;
import com.stackroute.recommendation.models.Donor;

import java.util.List;

public interface RecommendationService {

    public List<Donor> retrieveDonors(String name) throws DonorsNotFoundException;

    List<Donor> retrieveDonorsByBloodAndOrgan(String blood, String organ) throws DonorsNotFoundException;
}
