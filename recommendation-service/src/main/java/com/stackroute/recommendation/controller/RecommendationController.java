package com.stackroute.recommendation.controller;

import com.stackroute.recommendation.model.Donor;
import com.stackroute.recommendation.service.RecommendationService;
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
public class RecommendationController {

    RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @ApiOperation("Get Recommendations")
    @GetMapping("results/{name}")
    public ResponseEntity<List<Donor>> retrieveDonors(@PathVariable("name") String name) throws IOException {
        return new ResponseEntity<List<Donor>>(recommendationService.retrieveDonors(name), HttpStatus.OK);
    }
}
