package com.stackroute.donorprofileservice.service;

import com.stackroute.donorprofileservice.exception.DonorProfileAlreadyExistsException;
import com.stackroute.donorprofileservice.exception.DonorProfileNotFoundException;
import com.stackroute.donorprofileservice.model.DatabaseSequence;
import com.stackroute.donorprofileservice.model.Donor;
import com.stackroute.donorprofileservice.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class DonorServiceImpl implements DonorService {
	
	@Autowired
	MongoOperations mongoOperations;
	
	DonorRepository donorRepository;
	
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
	
}
