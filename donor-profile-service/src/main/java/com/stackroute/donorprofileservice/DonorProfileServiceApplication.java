package com.stackroute.donorprofileservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@Slf4j          // abstraction framework for logging
@EnableEurekaClient
public class DonorProfileServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DonorProfileServiceApplication.class, args);
	}

}
