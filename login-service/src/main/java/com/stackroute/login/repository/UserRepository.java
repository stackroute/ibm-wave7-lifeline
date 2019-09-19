package com.stackroute.login.repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.login.model.User;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    @Query("select u from User u where username=:username")
    User findByUsername(String username);

    @Modifying
    @Transactional
    void deleteByUsername(String username);

}
