package com.example.uwb_gg_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class UwbggbackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(UwbggbackendApplication.class, args);
	}

}
