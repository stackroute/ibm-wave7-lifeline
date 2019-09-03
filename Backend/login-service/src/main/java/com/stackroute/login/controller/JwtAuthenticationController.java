package com.stackroute.login.controller;

import com.stackroute.login.model.DAOUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.login.config.JwtTokenUtil;
import com.stackroute.login.model.UserDTO;
import com.stackroute.login.service.JwtUserDetailsService;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody UserDTO userDTO) throws Exception {
        authenticate(userDTO.getUsername(), userDTO.getPassword());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(userDTO.getUsername());
        DAOUser daoUser = userDetailsService.getUserData(userDTO.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        Map<Object,Object> model=new HashMap<>();
        model.put("role",daoUser.getRole());
        model.put("id", daoUser.getId());
        model.put("token",token);
        return ok(model);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    public void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}


