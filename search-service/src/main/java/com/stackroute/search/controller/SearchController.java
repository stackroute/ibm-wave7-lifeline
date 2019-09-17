package com.stackroute.search.controller;

import com.stackroute.search.models.Donor;
import com.stackroute.search.models.OrganFactors;
import com.stackroute.search.service.SearchServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/search")
@CrossOrigin
@Api("Search based on query")
public class SearchController {

    private SearchServiceImpl searchService;

    public SearchController(SearchServiceImpl searchService) {
        this.searchService = searchService;
    }

    //GetMapping method to search by name
    @ApiOperation("Execute Search Query")
    @GetMapping("query/{name}")
    public ResponseEntity<List<Donor>> retrieveDonors(@PathVariable("name") String name) throws IOException {
        System.out.println("api call");
        return new ResponseEntity<List<Donor>>(searchService.retrieveDonors(name), HttpStatus.OK);
    }

    @ApiOperation("Get Organ Factors")
    @GetMapping("factors/{organ}")
    public ResponseEntity<OrganFactors> getOrganFactors(@PathVariable("organ") String organ) {
        System.out.println("api call");
        return new ResponseEntity<OrganFactors>(searchService.getOrganFactors(organ), HttpStatus.OK);
    }

    @ApiOperation("Set Organ Factors")
    @PostMapping("factors")
    public ResponseEntity<OrganFactors> setOrganFactors(@RequestBody OrganFactors organ) {
        System.out.println("api call");
        return new ResponseEntity<OrganFactors>(searchService.setOrganFactors(organ), HttpStatus.OK);
    }
}
