//package com.stackroute.donorprofileservice.resource;
//
//import com.stackroute.donorprofileservice.model.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//@RestController
//@RequestMapping("kafka")
//public class DonorResource {
//	Address address = new Address("11b","main road","bengaluru","karnataka","678490");
//	Guardian guardian = new Guardian("Peter","peter@gmail.com","7890987654","son",address);
//	List<Guardian> guardianList = new ArrayList<>();
//	Disease disease = new Disease(false,false,false,false,false,false,false,false,false,true,false);
//	Organs organs = new Organs(true,true,true,true,false,true,true,true);
//	MedicalDetails medicalDetails = new MedicalDetails("O+",160,80,disease,organs);
//
//	@Autowired
//	private KafkaTemplate<String, Donor> kafkaTemplate;
//	private static final String TOPIC = "DonorRegistration";
//	@GetMapping("/publish/{donor}")
//	public String post(@PathVariable("donor") final Donor donor) {
//		guardianList.add(guardian);
//		Donor donor1 = new Donor(101,"donor","Tony","Stark","tony@gmail.com","9876543210","password123",new Date(1985,5,23),
//				"356478900928","male",address,guardianList,medicalDetails);
//		kafkaTemplate.send(TOPIC, donor1);
//		return "Published successfully";
//	}
//}