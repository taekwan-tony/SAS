package kr.co.sas.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.store.model.service.StoreService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/store")
public class StoreController {
	@Autowired
	private StoreService storeService;
	
	
	@GetMapping(value = "/soEmail/{soEmail}/checkEmail")
	public ResponseEntity<Boolean> checkEmail(@PathVariable String soEmail) {
		boolean result = storeService.checkEmail(soEmail);
		return ResponseEntity.ok(result);
	}//checkEmail
	
}
