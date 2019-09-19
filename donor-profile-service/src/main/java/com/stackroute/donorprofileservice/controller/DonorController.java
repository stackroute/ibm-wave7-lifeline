package com.stackroute.donorprofileservice.controller;

import com.stackroute.donorprofileservice.model.Donor;
import com.stackroute.donorprofileservice.service.DonorService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1")   //  class level request mapping
@CrossOrigin                //  enables cross origin support
@Api(value = "Donor Profile Service CRUD Operations")
public class DonorController {
	
	private DonorService donorService;

	private final Logger logger = LoggerFactory.getLogger(DonorController.class.getName());

	@Autowired
	private KafkaTemplate<String,Donor> kafkaTemplate;
	private static final String TOPIC = "DonorRegistration";
	private static final String SEARCH_TOPIC = "DonorSearch";
	
	@Autowired              // constructor based autowiring
	public DonorController(DonorService donorService) {
		this.donorService = donorService;
	}
	
//  maps the http get method url with corresponding service method
	@GetMapping(value = "/donors")
	@ApiOperation(value = "List of donors", response = List.class)
	public ResponseEntity<?> getDonorList() {
		ResponseEntity responseEntity;
		List<Donor> donorList;
		try {
			donorList = donorService.getDonorList();
			responseEntity = new ResponseEntity<List<Donor>>(donorList, HttpStatus.OK);
			logger.info("get all donors api call success");
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
			logger.error("get all donors api call throws an exception");
		}
//		returns response entity
		return responseEntity;
	}
	
//  maps the http get method url with corresponding service method
	@GetMapping(value = "/donor/{id}")
	@ApiOperation(value = "Get a donor info by id")
	public ResponseEntity<?> getDonorById(@PathVariable long id) {
		ResponseEntity responseEntity;
		Donor donor;
		try {
			donor = donorService.getDonorById(id);
			responseEntity = new ResponseEntity<Donor>(donor, HttpStatus.OK);
			logger.info("get donor by id api call success");
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
			logger.error("get donor by id api call throws an exception");
		}
//		returns response entity
		return responseEntity;
	}
	
//	maps the http post method url with corresponding service method
	@PostMapping(value = "/donor")
	@ApiOperation(value = "save a donor info")
	public ResponseEntity<?> saveDonorProfile(@Valid @RequestBody Donor donor) {
		ResponseEntity responseEntity;
		try {
			responseEntity = new ResponseEntity<Donor>(donorService.saveDonorProfile(donor), HttpStatus.CREATED);
			logger.info("save donor api call success");
			this.kafkaTemplate.send(TOPIC,donor);
			this.kafkaTemplate.send(SEARCH_TOPIC,donor);
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
			logger.error("save donor api call throws an exception");
		}
		return responseEntity;
	}
	
//	maps the http put method url with corresponding service method
	@PutMapping(value = "/donor/{id}")
	@ApiOperation(value = "update a donor info")
	public ResponseEntity<?> updateDonorProfile(@PathVariable long id, @Valid @RequestBody Donor donor) {
		ResponseEntity responseEntity;
		try {
			responseEntity = new ResponseEntity<Donor>(donorService.updateDonorProfile(id,donor), HttpStatus.OK);
			this.kafkaTemplate.send(TOPIC,donor);
			logger.info("update donor api call success");
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
			logger.error("update donor api call throws an exception");
		}
		return responseEntity;
	}
	
	//	maps the http delete method url with corresponding service method
	@DeleteMapping(value = "/donor/{id}")
	@ApiOperation(value = "delete a donor info by id")
	public ResponseEntity<?> deleteDonorProfile(@PathVariable("id") long id) {
		ResponseEntity responseEntity;
		try {
			Donor donor = donorService.getDonorById(id);
			donor.setId(id);
			donor.setUserType(" ");
			System.out.println(donor);
			this.kafkaTemplate.send(TOPIC,donor);
			responseEntity = new ResponseEntity<Donor>(donorService.deleteDonorProfile(id), HttpStatus.OK);
			logger.info("delete donor api call success");
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
			logger.error("delete donor api call throws an exception");
		}
		return responseEntity;
	}

	@PostMapping(value="/forms")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
		String message = "";
		try {
			donorService.store(file);
			message = "You successfully uploaded " + file.getOriginalFilename() + "!";
			logger.info("file uploaded api call success");
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			e.printStackTrace();
			message = "Fail to upload Profile Picture" + file.getOriginalFilename() + "!";
			logger.error("file uploaded api call throws an exception");
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}
	
	@PostMapping(value = "/verify")
	public ResponseEntity<?> verifyEmail(@RequestBody long id) {
		logger.info("id:"+id);
		try {
			donorService.sendMail(id);
			return ResponseEntity.ok("mail sent successfully");
		} catch (MessagingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.CONFLICT).body("mail sent exception");
		}
	}
}
