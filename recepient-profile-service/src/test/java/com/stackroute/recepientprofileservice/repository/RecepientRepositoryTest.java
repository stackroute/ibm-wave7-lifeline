package com.stackroute.recepientprofileservice.repository;

import com.stackroute.recepientprofileservice.model.Address;
import com.stackroute.recepientprofileservice.model.Recepient;
import com.stackroute.recepientprofileservice.model.Request;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;


@RunWith(SpringRunner.class)
@DataMongoTest

public class RecepientRepositoryTest {

    @Autowired
    RecepientRepository recepientRepository;
    Recepient recepient;
    Address address;
    Request request;
    List<Recepient> recepientList;


    //	executes before each test
    @Before
    public void setUp() {
       address = new Address("11b","main road","bengaluru","karnataka","678490");

    request = new Request();
    recepient = new Recepient(101L,"recepient","Tony","Stark","tony@gmail.com","9876543210","password123",new Date(1985,5,23),
                "356478900928","male",address,"A+",new Date(),request,null);
        recepientList = new ArrayList<>();
   }

    //	executes after each test
    @After
    public void tearDown() {
        recepientRepository.deleteAll();
        recepientList = null;
    }


    //	method to check findAll() method of repository
    @Test
    public void testFindAll(){
        Recepient recepient1 = new Recepient(102L,"recepient","Harry","Potter","harry@gmail.com","978645312","password123",new Date(1970,7,14),
                "356478900928","male",address,"A+",new Date(),request,null
        );
        recepientRepository.save(recepient);
       recepientRepository.save(recepient1);
     recepientList.add(recepient);
       recepientList.add(recepient1);
        Assert.assertEquals(recepientList, recepientRepository.findAll());
   }

    //	method to check findById() method of repository
    @Test
    public void testFindById(){
        recepientRepository.save(recepient);
        Assert.assertEquals(recepient,( recepientRepository.findById(recepient.getId())).get());
    }

    //	method to test save() method of repository
    @Test
    public void testSave(){
        Assert.assertEquals(recepient,recepientRepository.save(recepient));
    }


    //	method to test deleteById() method of repository
    @Test(expected = NoSuchElementException.class)
    public void testDelete(){
        recepientRepository.save(recepient);
        recepientRepository.deleteById(recepient.getId());
        Assert.assertNotEquals(recepient,recepientRepository.findById(recepient.getId()).get());
    }

    //	method to check save() and existsById() method of repository
    @Test
    public void testSaveAndExistsByID(){
        recepientRepository.save(recepient);
        address.setCity("Erode");
        address.setState("TamilNadu");
        recepient.setAddress(address);
        Assert.assertTrue(recepientRepository.existsById(recepient.getId()));
        recepientRepository.save(recepient);
        Assert.assertEquals("Erode",(recepientRepository.findById(recepient.getId()).get()).getAddress().getCity());
    }
}