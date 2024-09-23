package kr.co.sas.reservation.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.reservation.model.dao.ReservationDao;
import kr.co.sas.reservation.model.dto.ReservationDTO;

@Service
public class ReservationService {
	@Autowired
	private ReservationDao reservationDao;
	
	public List<ReservationDTO> getAllReservation(int storeNo){
		return reservationDao.selectAllReservation(storeNo);
	}
}
