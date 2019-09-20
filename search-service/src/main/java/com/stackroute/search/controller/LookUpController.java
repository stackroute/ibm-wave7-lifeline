package com.stackroute.search.controller;

import com.stackroute.search.models.Donor;
import com.stackroute.search.service.LookUpService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class LookUpController {

    private LookUpService chatService;

    public LookUpController(LookUpService chatService) {
        this.chatService = chatService;
    }

    @ApiOperation("Get Recommendations")
    @GetMapping("results/{name}")
    public ResponseEntity<List<Donor>> retrieveDonorsByBlood(@PathVariable("name") String name) throws IOException {
        ResponseEntity responseEntity;
        try {
		System.out.println(name);
            responseEntity = new ResponseEntity<List<Donor>>(chatService.retrieveDonors(name), HttpStatus.OK);
        } catch (Exception e) {
            responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
            e.printStackTrace();
	}
        return responseEntity;
    }

    @ApiOperation("Get Recommendations")
    @GetMapping("results/{blood}/{organ}")
    public ResponseEntity<List<Donor>> retrieveDonorsByBloodAndOrgan(@PathVariable("blood") String blood, @PathVariable("organ") String organ) throws IOException {
        ResponseEntity responseEntity;
        try {
            System.out.println(blood);
            responseEntity = new ResponseEntity<List<Donor>>(chatService.retrieveDonors(blood), HttpStatus.OK);
        } catch (Exception e) {
            responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
            e.printStackTrace();
        }
        return responseEntity;
    }
}
