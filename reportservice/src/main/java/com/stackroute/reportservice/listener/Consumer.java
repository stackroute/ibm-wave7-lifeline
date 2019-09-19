package com.stackroute.reportservice.listener;

import com.stackroute.reportservice.model.Report;
import com.stackroute.reportservice.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
@Service
public class Consumer {

@Autowired
ReportRepository reportRepository;

    @KafkaListener(topics="RecepientRegistration",groupId = "report_group_id")
    public void consume(Report report) throws IOException {
        System.out.println("Inside Recipient");
        System.out.println(report);
        Report obj=new Report();
        obj.setId(report.getId());
        obj.setUserType(report.getUserType());
        reportRepository.save(obj);
    }

    @KafkaListener(topics="DonorRegistration",groupId = "report_group_id")
    public void consumedonor(Report report) throws IOException {
        System.out.println("Inside Donor");
        System.out.println(report);
        reportRepository.save(report);


    }
}
