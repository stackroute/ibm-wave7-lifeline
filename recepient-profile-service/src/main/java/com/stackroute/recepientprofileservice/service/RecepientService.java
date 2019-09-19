package com.stackroute.recepientprofileservice.service;

import com.stackroute.recepientprofileservice.exception.RecepientProfileAlreadyExistsException;
import com.stackroute.recepientprofileservice.exception.RecepientProfileNotFoundException;
import com.stackroute.recepientprofileservice.model.Recepient;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.List;

@Service
public interface RecepientService {
    
    List<Recepient> getRecepientList();

    Recepient getRecepientById(long id) throws RecepientProfileNotFoundException;

    Recepient saveRecepientProfile(Recepient Recepient) throws RecepientProfileAlreadyExistsException;

    Recepient deleteRecepientProfile(long id) throws RecepientProfileNotFoundException;

    Recepient updateRecepientProfile(long id, Recepient Recepient) throws RecepientProfileNotFoundException;

    public long getNextSequenceId(String key);

    String findById(long id) throws MessagingException;
}
