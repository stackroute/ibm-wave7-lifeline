package com.stackroute.search.service;

import com.stackroute.search.exception.DonorsNotFoundException;
import com.stackroute.search.models.Donor;
import com.stackroute.search.repository.DonationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LookUpServiceImpl implements LookUpService {

    private DonationRepository donorRepository;

    public LookUpServiceImpl(DonationRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    @Override
    public List<Donor> retrieveDonors(String name) throws DonorsNotFoundException {
        try {
            System.out.println(donorRepository.retrieveLookedUpDonors("A+"));
            List<Donor> donorList = donorRepository.retrieveLookedUpDonors(name);
            System.out.println(donorList);
            return donorList;
        }
        catch(Exception e) {
            throw new DonorsNotFoundException();
        }
    }

    @Override
    public List<Donor> retrieveDonorsByBloodAndOrgan(String blood, String organ) throws DonorsNotFoundException {
        try {
            List<Donor> donorList = donorRepository.retrieveDonorsByBloodAndOrgan(blood, organ);
            System.out.println(donorList);
            return donorList;
        }
        catch(Exception e) {
            throw new DonorsNotFoundException();
        }
    }
}
