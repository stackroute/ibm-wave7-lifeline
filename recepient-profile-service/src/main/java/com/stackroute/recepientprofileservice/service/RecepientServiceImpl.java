package com.stackroute.recepientprofileservice.service;

import com.stackroute.recepientprofileservice.exception.RecepientProfileAlreadyExistsException;
import com.stackroute.recepientprofileservice.exception.RecepientProfileNotFoundException;
import com.stackroute.recepientprofileservice.model.DatabaseSequence;
import com.stackroute.recepientprofileservice.model.Recepient;
import com.stackroute.recepientprofileservice.repository.RecepientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Optional;

@Service
public class RecepientServiceImpl implements RecepientService {
    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    MongoOperations mongoOperations;

    RecepientRepository recepientRepository;

    @Autowired
    public RecepientServiceImpl(RecepientRepository recepientRepository) {
        this.recepientRepository = recepientRepository;
    }

    @Override
    public List<Recepient> getRecepientList() {
        return recepientRepository.findAll();
    }

    @Override
    public Recepient getRecepientById(long id) throws RecepientProfileNotFoundException {
        if (recepientRepository.existsById(id) == true) {
            return recepientRepository.findById(id).get();
        } else {
            throw new RecepientProfileNotFoundException();
        }
    }

    @Override
    public Recepient saveRecepientProfile(Recepient recepient) throws RecepientProfileAlreadyExistsException {
        try {
            recepient.setId(getNextSequenceId("recepient_sequence"));
            return recepientRepository.save(recepient);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RecepientProfileAlreadyExistsException();
        }
    }


    @Override
    public Recepient deleteRecepientProfile(long id) throws RecepientProfileNotFoundException {
        Optional<Recepient> recepientOptional;
        if (recepientRepository.existsById(id) == true) {
            recepientOptional = recepientRepository.findById(id);
            recepientRepository.deleteById(id);
            return recepientOptional.get();
        } else {
            throw new RecepientProfileNotFoundException();
        }
    }

    @Override
    public Recepient updateRecepientProfile(long id, Recepient recepient) throws RecepientProfileNotFoundException {

        if (recepientRepository.existsById(id) == true) {
            return recepientRepository.save(recepient);

        } else {
            throw new RecepientProfileNotFoundException();
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
    public String findById(long id) throws MessagingException {
        Recepient recepient = recepientRepository.findById(id).get();
        String email =  recepient.getEmail();
        if (email!=null && recepientRepository.findById(id).isPresent()) {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(recepient.getEmail());
            helper.setSubject("SpringBootApplication");
            helper.setText("http://52.66.129.41:4200/id?id="+id+ "&type=recepient");
            javaMailSender.send(message);
            return "successfully sent email";

        }
        return "hello";
    }


}
