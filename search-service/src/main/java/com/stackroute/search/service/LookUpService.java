package com.stackroute.search.service;

import com.stackroute.search.exception.DonorsNotFoundException;
import com.stackroute.search.models.Donor;

import java.util.List;

public interface LookUpService {

    public List<Donor> retrieveDonors(String name) throws DonorsNotFoundException;

    List<Donor> retrieveDonorsByBloodAndOrgan(String blood, String organ) throws DonorsNotFoundException;
}
