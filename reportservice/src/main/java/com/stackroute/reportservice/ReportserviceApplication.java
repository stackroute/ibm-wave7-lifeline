package com.stackroute.reportservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ReportserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReportserviceApplication.class, args);
	}

}
