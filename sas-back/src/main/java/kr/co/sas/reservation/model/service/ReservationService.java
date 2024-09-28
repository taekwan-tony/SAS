package kr.co.sas.reservation.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.reservation.model.dao.ReservationDao;
import kr.co.sas.reservation.model.dto.ReservationDTO;

@Service
public class ReservationService {
	@Autowired
	private ReservationDao reservationDao;
	
		// 기존 메서드
		public List<ReservationDTO> getAllReservation(int storeNo){
			return reservationDao.selectAllReservation(storeNo);
		}

	    // 이번 달 예약 건수 조회
	    public int getselectTotalReserve(int storeNo) {
	        return reservationDao.selectTotalReserve(storeNo);
	    }

	    // 이번 달 예약한 사람의 총 인원 조회
	    public int getselectTotalReservedPeople(int storeNo) {
	        return reservationDao.selectTotalReservedPeople(storeNo);
	    }
	    // 연령대별 예약 손님 수 조회
	    public List<Map<String, Object>> getAgeReservation(int storeNo) {
	        return reservationDao.selectAgeReservation(storeNo);
	    }
	    // 예약 상태를 가져오는 서비스 메서드
	    public List<Map<String, Object>> getReservationStatus(int storeNo) {
	        return reservationDao.selectReservationStatus(storeNo);
	    }
}

