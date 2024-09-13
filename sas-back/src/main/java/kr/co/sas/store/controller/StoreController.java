package kr.co.sas.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.store.model.service.StoreService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/store")
public class StoreController {
	@Autowired
	private StoreService storeService;
	
}
