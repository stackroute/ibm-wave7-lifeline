package com.stackroute.login.dao;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.login.model.DAOUser;

import javax.transaction.Transactional;

@Repository
public interface UserDao extends CrudRepository<DAOUser, Integer> {

    @Query("select u from DAOUser u where username=:username")
    DAOUser findByUsername(String username);

    @Modifying
    @Transactional
    void deleteByUsername(String username);

}
