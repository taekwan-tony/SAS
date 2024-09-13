package kr.co.sas.reservation.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.reservation.model.dao.ReservationDao;

@Service
public class ReservationService {
	@Autowired
	private ReservationDao reservationDao;
}
