package kr.co.sas.userReport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.sas.userReport.model.dto.UserReportDTO;
import kr.co.sas.userReport.model.service.UserReportService;

@RestController
@RequestMapping(value="/userReport")
@CrossOrigin("*")
@Tag(name="USER_REPORT", description = "USER_REPORT API")
public class UserReportController {
	@Autowired
	private UserReportService userReportService;
	
	@PostMapping
	public ResponseEntity<Boolean> insertUserReport(@RequestBody UserReportDTO report){
		int result = userReportService.insertUserReport(report);
		return ResponseEntity.ok(result>0);
	}
}
