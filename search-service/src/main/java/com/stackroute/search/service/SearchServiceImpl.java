package com.stackroute.search.service;

import com.stackroute.search.models.Donor;
import com.stackroute.search.models.OrganFactors;
import com.stackroute.search.repository.DonationRepository;
import com.stackroute.search.repository.FactorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//Implementation of all the methods in SearchService interface
@Service
public class SearchServiceImpl implements SearchService{

    private DonationRepository donationRepository;

    private FactorsRepository factorsRepository;

    @Autowired
    public SearchServiceImpl(DonationRepository donationRepository, FactorsRepository factorsRepository) {
        this.donationRepository = donationRepository;
        this.factorsRepository = factorsRepository;
    }

    //Retrieve donors based on the organ and blood group
    @Override
    public List<Donor> retrieveDonors(String name) {
        return donationRepository.retrieveDonors(name);
    }

    @Override
    public OrganFactors getOrganFactors(String organ) {
        return factorsRepository.findByOrgan(organ);
    }

    @Override
    public OrganFactors setOrganFactors(OrganFactors organ) {
        return factorsRepository.save(organ);
    }
}
