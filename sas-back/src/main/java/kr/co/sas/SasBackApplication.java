package kr.co.sas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude= {SecurityAutoConfiguration.class})
public class SasBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(SasBackApplication.class, args);
	}

}
