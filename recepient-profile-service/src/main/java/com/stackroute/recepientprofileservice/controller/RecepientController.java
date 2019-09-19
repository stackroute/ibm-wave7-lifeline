package com.stackroute.recepientprofileservice.controller;

import com.stackroute.recepientprofileservice.model.Recepient;
import com.stackroute.recepientprofileservice.service.RecepientService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1")   //  class level request mapping
@CrossOrigin(origins = "*")
@Api(value = "Recepient Profile Service CRUD Operations")
public class RecepientController {

    private RecepientService recepientService;
    private final Logger logger=LoggerFactory.getLogger(RecepientController.class);
    @Autowired
    private KafkaTemplate<String,Recepient> kafkaTemplate;
    private static final String TOPIC = "RecepientRegistration";
    @Autowired
    public RecepientController(RecepientService recepientService)
    {
        this.recepientService=recepientService;
    }

    //  maps the http get method url with corresponding service method
    @GetMapping(value = "/recepient")
    @ApiOperation(value = "List of Recepients", response = List.class)
    public ResponseEntity<?> getRecepientList() {
        ResponseEntity responseEntity;
        List<Recepient> recepientList;

        try {
            recepientList = recepientService.getRecepientList();
            responseEntity = new ResponseEntity<List<Recepient>>(recepientList, HttpStatus.OK);
            logger.info("get all recepient api call success");
        } catch (Exception e) {
            e.printStackTrace();
            responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
            logger.error("get all recepient api call throws an exception");
        }
//		returns response entity
        return responseEntity;
    }

    //  maps the http get method url with corresponding service method
    @GetMapping(value = "/recepient/{id}")
    @ApiOperation(value = "Get a recepient info by id")
    public ResponseEntity<?> getRecepientById(@PathVariable long id) {
        ResponseEntity responseEntity;
        Recepient recepient;
        try {
            recepient = recepientService.getRecepientById(id);
            responseEntity = new ResponseEntity<Recepient>(recepient, HttpStatus.OK);
            this.kafkaTemplate.send(TOPIC,recepient);
            logger.info("get recepient by id api call success");
        } catch (Exception e) {
            e.printStackTrace();
            responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
            logger.error("get recepient by id api call throws an exception");
        }
//		returns response entity
        return responseEntity;
    }

    //	maps the http post method url with corresponding service method
    @PostMapping(value = "/recepient")
    @ApiOperation(value = "save a recepient info")
    public ResponseEntity<?> saveRecepientProfile(@Valid @RequestBody Recepient recepient) {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<Recepient>(recepientService.saveRecepientProfile(recepient), HttpStatus.CREATED);
            logger.info("save track api call success");
            this.kafkaTemplate.send(TOPIC,recepient);
        } catch (Exception e) {
            e.printStackTrace();
            responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
            logger.error("save track api call throws an exception");
        }
        return responseEntity;
    }

    //	maps the http put method url with corresponding service method
    @PutMapping(value = "/recepient/{id}")
    @ApiOperation(value = "update a recepient info")
    public ResponseEntity<?> updateRecepientProfile(@PathVariable long id,@Valid @RequestBody Recepient recepient) {
        ResponseEntity responseEntity;
        try {
            responseEntity = new ResponseEntity<Recepient>(recepientService.updateRecepientProfile(id,recepient), HttpStatus.OK);
            this.kafkaTemplate.send(TOPIC,recepient);
            logger.info("update track api call success");
        } catch (Exception e) {
            e.printStackTrace();
            responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
            logger.error("update track api call throws an exception");
        }
        return responseEntity;
    }

    //	maps the http delete method url with corresponding service method
    @DeleteMapping(value = "/recepient/{id}")
    @ApiOperation(value = "delete a recepient info by id")
    public ResponseEntity<?> deleteRecepientProfile(@PathVariable("id") long id) {
        ResponseEntity responseEntity;
        try {
            Recepient recepient = recepientService.getRecepientById(id);
            recepient.setId(id);
            recepient.setUserType(" ");
            System.out.println(recepient);
            this.kafkaTemplate.send(TOPIC,recepient);
            responseEntity = new ResponseEntity<Recepient>(recepientService.deleteRecepientProfile(id), HttpStatus.OK);
            logger.info("delete track api call success");
        } catch (Exception e) {
            e.printStackTrace();
            responseEntity = new ResponseEntity<String>("Exception", HttpStatus.CONFLICT);
            logger.error("delete track api call throws an exception");
        }
        return responseEntity;
    }
    @PostMapping(value = "/verify")
    public ResponseEntity<?> verifyEmail(@RequestBody long id) throws Exception {
        final String user = recepientService.findById(id);
        return ResponseEntity.ok(user);
    }


}
