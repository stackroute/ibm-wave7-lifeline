package com.stackroute.donorprofileservice.service;

import com.stackroute.donorprofileservice.controller.DonorController;
import com.stackroute.donorprofileservice.exception.DonorProfileAlreadyExistsException;
import com.stackroute.donorprofileservice.exception.DonorProfileNotFoundException;
import com.stackroute.donorprofileservice.model.DatabaseSequence;
import com.stackroute.donorprofileservice.model.Donor;
import com.stackroute.donorprofileservice.repository.DonorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class DonorServiceImpl implements DonorService {
	@Autowired
	JavaMailSender javaMailSender;

	@Autowired
	MongoOperations mongoOperations;
	
	DonorRepository donorRepository;
	private final Path rootLocation = Paths.get("form-store");
	private final Logger logger = LoggerFactory.getLogger(DonorController.class.getName());

	@Autowired
	public DonorServiceImpl(DonorRepository donorRepository) {
		this.donorRepository = donorRepository;
	}
	
	@Override
	public List<Donor> getDonorList() {
		return donorRepository.findAll();
	}
	
	@Override
	public Donor getDonorById(long id) throws DonorProfileNotFoundException {
		if(donorRepository.existsById(id) == true) {
			return donorRepository.findById(id).get();
		} else {
			throw new DonorProfileNotFoundException();
		}
	}
	
	@Override
	public Donor saveDonorProfile(Donor donor) throws DonorProfileAlreadyExistsException {
		if(donorRepository.existsById(donor.getId()) == false) {
			donor.setId(getNextSequenceId("donors_sequence"));
			donor.getDob().toLocaleString();
			return donorRepository.save(donor);
		} else {
			throw new DonorProfileAlreadyExistsException();
		}
	}
	
	@Override
	public Donor deleteDonorProfile(long id) throws DonorProfileNotFoundException {
		Optional<Donor> donorOptional;
		if(donorRepository.existsById(id) == true) {
			donorOptional = donorRepository.findById(id);
			donorRepository.deleteById(id);
			return donorOptional.get();
		} else {
			throw new DonorProfileNotFoundException();
		}
	}
	
	@Override
	public Donor updateDonorProfile(long id, Donor donor) throws DonorProfileNotFoundException {
		if(donorRepository.existsById(id) == true){
			return donorRepository.save(donor);
		} else {
			throw new DonorProfileNotFoundException();
		}
	}
	
	@Override
	public long getNextSequenceId(String key) {
		
		Query query = new Query(Criteria.where("_id").is(key));
		Update update = new Update();
		update.inc("seq", 1);
		FindAndModifyOptions options = new FindAndModifyOptions();
		options.returnNew(true);
		DatabaseSequence seqId = mongoOperations.findAndModify(query, update, options, DatabaseSequence.class);
		return seqId.getSeq();
		
	}

	@Override
	public void store(MultipartFile file) throws Exception {
		logger.info("File name: "+file.getOriginalFilename());
		Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
	}

	@Override
	public String findById(long id) throws MessagingException {
		Donor donor = donorRepository.findById(id).get();
		String email = donor.getEmail();
		if (email != null && donorRepository.findById(id).isPresent()) {
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			helper.setTo(donor.getEmail());
			helper.setSubject("SpringBootApplication");
			helper.setText("http://172.23.238.228:4200/id?id=" + id);
			javaMailSender.send(message);
			System.out.println("Sent Email");
			return "successfully sent email";
		}
		return "hello";
	}
}