package com.stackroute.login.service;

import java.util.ArrayList;

import com.stackroute.login.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.stackroute.login.model.DAOUser;
import com.stackroute.login.model.UserDTO;

import javax.xml.crypto.Data;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    private UserDTO userDTO;

    public JwtUserDetailsService(UserDao userDao) {this.userDao=userDao;}

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        DAOUser user = userDao.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public DAOUser getUserData(String username) {
        DAOUser daoUser = userDao.findByUsername(username);
        return daoUser;
    }

    public DAOUser save(UserDTO userDTO) {
        DAOUser newUser = new DAOUser();
        newUser.setUsername(userDTO.getUsername());
        newUser.setPassword(bcryptEncoder.encode(userDTO.getPassword()));
        newUser.setRole(userDTO.getRole());
        return userDao.save(newUser);
    }
    public DAOUser update(UserDTO userDTO) throws Exception {
        DAOUser updateUser = userDao.findByUsername(userDTO.getUsername());
        if (updateUser != null) {
            updateUser.setPassword(bcryptEncoder.encode(userDTO.getPassword()));
        }
        System.out.println(updateUser);
        return userDao.save(updateUser);
    }

}

