package com.stackroute.reportservice.controller;

import com.stackroute.reportservice.service.ReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1")   //  class level request mapping
@CrossOrigin                //  enables cross origin support
@Api(value = "Report Service")
public class ReportController {

    private ReportService reportService;

    private final Logger logger = LoggerFactory.getLogger(ReportController.class.getName());

    @Autowired              // constructor based autowiring
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }


    //  maps the http get method url with corresponding service method
    @GetMapping("donor/registrations")
    @ApiOperation(value = "generating graph for donor registrations")
    public ResponseEntity<?> getReport() {
        ResponseEntity responseEntity;

        try {
            responseEntity = new ResponseEntity<List>(reportService.countDonorRegistrations(), HttpStatus.OK);
        } catch (Exception exception) {

            responseEntity = new ResponseEntity<String>(exception.getMessage(), HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    @GetMapping("recepient/registrations")
    public ResponseEntity<?> getReportRecepients() {
        ResponseEntity responseEntity;

        try {
            responseEntity = new ResponseEntity<List>(reportService.countRecepientRegistrations(), HttpStatus.OK);
            System.out.println("api call success");
        } catch (Exception exception) {
            exception.printStackTrace();
            responseEntity = new ResponseEntity<String>(exception.getMessage(), HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    @GetMapping("organs/donations")
    public ResponseEntity<?> getNumberOfDonations() {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<>(reportService.numberOfOrganDonations(), HttpStatus.OK);
        } catch (Exception exception) {
            exception.printStackTrace();
            responseEntity = new ResponseEntity<String>(exception.getMessage(), HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

}





