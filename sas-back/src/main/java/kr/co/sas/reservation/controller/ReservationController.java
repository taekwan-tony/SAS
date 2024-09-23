package kr.co.sas.reservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.reservation.model.dto.ReservationDTO;
import kr.co.sas.reservation.model.service.ReservationService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/reservation")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@GetMapping("/reservation")
	public List<ReservationDTO> getAllReservation(@RequestParam("storeNo") int storeNo){
		return reservationService.getAllReservation(storeNo);
	}
}
