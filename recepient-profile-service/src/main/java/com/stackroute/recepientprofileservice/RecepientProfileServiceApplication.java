package com.stackroute.recepientprofileservice;


import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@Slf4j          // abstraction framework for logging
@EnableEurekaClient
public class RecepientProfileServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(RecepientProfileServiceApplication.class, args);
	}

}
