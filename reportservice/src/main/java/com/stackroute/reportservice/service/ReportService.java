package com.stackroute.reportservice.service;

import com.stackroute.reportservice.model.Report;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface ReportService {
    public List countDonorRegistrations();
    public List countRecepientRegistrations();
    public List numberOfOrganDonations();
    public long getNextSequenceId(String key);

}
