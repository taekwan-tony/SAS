package kr.co.sas.seat.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.seat.model.dao.SeatDao;

@Service
public class SeatService {
	@Autowired
	private SeatDao seatDao;
	
}
