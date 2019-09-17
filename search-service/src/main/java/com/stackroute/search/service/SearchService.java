package com.stackroute.search.service;

import com.stackroute.search.models.Donor;
import com.stackroute.search.models.OrganFactors;

import java.util.List;

//Interface for search service methods
public interface SearchService {

    public List<Donor> retrieveDonors(String name);

    public OrganFactors getOrganFactors(String organ);

    OrganFactors setOrganFactors(OrganFactors organ);
}
