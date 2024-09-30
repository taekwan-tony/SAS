package kr.co.sas.reservation.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.reservation.model.dao.ReservationDao;
import kr.co.sas.reservation.model.dto.ReservationDTO;
import kr.co.sas.weekcustomer.model.dto.WeekCustomerDTO;

@Service
public class ReservationService {
	@Autowired
	private ReservationDao reservationDao;
	
		
		public List<ReservationDTO> getAllReservation(int storeNo){
		    List<ReservationDTO> reservations = reservationDao.selectAllReservation(storeNo);
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
	    public List<ReservationDTO> getReservationStatus(int storeNo){
		    List<ReservationDTO> reservations = reservationDao.selectReservationStatus(storeNo);
			return reservations;
		}
	    // 모든 예약 데이터와 성별 정보를 가져옴
	    public List<Map<String, Object>> getReservationGender(int storeNo) {
	        return reservationDao.selectReservationGender(storeNo);
	    }
	    // 지난달 예약 건수 조회 메서드 추가
	    public int getLastMonthTotalReservation(int storeNo) {
	        return reservationDao.selectLastMonthTotalReservation(storeNo);
	    }
	    // 지난달 예약된 총 인원수를 조회하는 메서드
	    public int getLastMonthTotalReservedPeople(int storeNo) {
	        return reservationDao.selectLastMonthTotalReservedPeople(storeNo);
	    }
	    // 한 주간의 손님 수를 요일별로 가져오는 메서드
	    public List<WeekCustomerDTO> getWeeklyCustomer(int storeNo) {
	        return reservationDao.selectWeekCustomer(storeNo);
	    }

		public List selectReservationForCount(String date, int storeNo) {
			List<ReservationDTO> list = reservationDao.selectReservationForCount(date, storeNo);
			return list;
		}
}

