package kr.co.sas.seat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.seat.model.service.SeatService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/seat")
public class SeatController {
	@Autowired
	private SeatService seatService;
	
	
}
