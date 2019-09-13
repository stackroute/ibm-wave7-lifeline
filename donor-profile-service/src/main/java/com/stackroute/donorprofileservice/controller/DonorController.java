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
			logger.info("get all tracks api call success");
		} catch (Exception e) {
			responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
			logger.error("get all tracks api call throws an exception");
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
			logger.info("get all tracks api call success");
		} catch (Exception e) {
			responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
			logger.error("get all tracks api call throws an exception");
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
			logger.info("save track api call success");
			this.kafkaTemplate.send(TOPIC,donor);
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<String>("exception", HttpStatus.CONFLICT);
			logger.error("save track api call throws an exception");
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
			logger.info("update track api call success");
		} catch (Exception e) {
			responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
			logger.error("update track api call throws an exception");
		}
		return responseEntity;
	}
	
	//	maps the http delete method url with corresponding service method
	@DeleteMapping(value = "/donor/{id}")
	@ApiOperation(value = "delete a donor info by id")
	public ResponseEntity<?> deleteDonorProfile(@PathVariable("id") long id) {
		ResponseEntity responseEntity;
		try {
			responseEntity = new ResponseEntity<Donor>(donorService.deleteDonorProfile(id), HttpStatus.OK);
			Donor donor = new Donor();
			donor.setId(id);
			this.kafkaTemplate.send(TOPIC,donor);
			logger.info("delete track api call success");
		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
			logger.error("delete track api call throws an exception");
		}
		return responseEntity;
	}

	@PostMapping(value="/forms")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
		String message = "";

		try {
			donorService.store(file);
			message = "You successfully uploaded " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			e.printStackTrace();
			message = "Fail to upload Profile Picture" + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}
	@PostMapping(value = "/verify")
	public ResponseEntity<?> verifyEmail(@RequestBody long id) throws Exception {
		System.out.println(id);
//        JSONObject jsonObject = new JSONObject(email);
//        email = jsonObject.getString("email");
		System.out.println(id);
		final String user = donorService.findById(id);
		return ResponseEntity.ok(user);
	}
}
