//package com.stackroute.login1.model;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import javax.persistence.*;
//
//@Entity
//@Table(name = "user")
//public class DAOUser {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;
//    @Column
//    private String username;
//    @Column
//    @JsonIgnore
//    private String password;
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    @Override
//    public String toString() {
//        return "DAOUser{" +
//                "id=" + id +
//                ", username='" + username + '\'' +
//                ", password='" + password + '\'' +
//                '}';
//    }
//}
//
//

package com.stackroute.login.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name="user")
@JsonIgnoreProperties(ignoreUnknown = true)
public class DAOUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column
    @JsonProperty("id")
    private Long id;

    @Column
    @JsonProperty("userType")
    private String role;

    @Column
    @JsonProperty("email")
    private String username;

    @Column
    @JsonIgnore
    @JsonProperty("password")
    private String password;

    @Column
    @JsonProperty("isEmailVerified")
    private  String emailVerified;


    public String getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(String emailVerified) {
        this.emailVerified = emailVerified;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPhoneNumber() {
//        return phoneNumber;
//    }
//
//    public void setPhoneNumber(String phoneNumber) {
//        this.phoneNumber = phoneNumber;
//    }


    @Override
    public String toString() {
        return "DAOUser{" +
                "userId=" + userId +
                ", id=" + id +
                ", role='" + role + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", emailVerified='" + emailVerified + '\'' +
                '}';
    }
}

