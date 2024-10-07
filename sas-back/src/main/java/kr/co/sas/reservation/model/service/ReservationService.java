package kr.co.sas.reservation.model.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.reservation.model.dao.ReservationDao;
import kr.co.sas.reservation.model.dto.PaymentDTO;
import kr.co.sas.reservation.model.dto.ReservationDTO;
import kr.co.sas.util.PageInfo;
import kr.co.sas.util.PageUtil;
import kr.co.sas.weekcustomer.model.dto.WeekCustomerDTO;

@Service
public class ReservationService {
	@Autowired
	private ReservationDao reservationDao;
	@Autowired
	private PageUtil pageUtil;
	
		
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
//		예약 -수진
		@Transactional
		public Map insertReservation(ReservationDTO reservation) {
			//System.out.println(reservation.getReserveDateString());
			int result = reservationDao.insertReservation(reservation);
			Map map = new HashMap<String, Object>();
			map.put("result", result>0);
			map.put("reserveNo", reservation.getReserveNo());
			System.out.println(reservation.getReserveNo());
			return map;
		}
		public boolean isAlreadyReserved(ReservationDTO reservation) {
			int isExist = reservationDao.countSameReserve(reservation);
			System.out.println("개수 :"+isExist+(isExist>0));
			return isExist>0;
		}
		@Transactional
		public int insertPayment(PaymentDTO pay) {
			int result = reservationDao.insertPay(pay);
			return result;
		}
		//예약-수진-끝
	    public int deleteReservation(int reserveNo) {
	        return reservationDao.deleteReservation(reserveNo);
	    }
	    public List<ReservationDTO> getTodayReservation(int storeNo) {
	        return reservationDao.getTodayReservation(storeNo);
	    }
	    
	    // 노쇼 상태로 변경하는 메서드
	    public int noShow(int reserveNo) {
	        return reservationDao.updateReserveStatusNoShow(reserveNo);
	    }
	    // 방문 완료 상태로 변경하는 메서드
	    public int visit(int reserveNo) {
	        return reservationDao.updateReserveStatusVisit(reserveNo);
	    }

		public List<ReservationDTO> getTodayCustomer(int storeNo) {
			return reservationDao.getTodayCustomer(storeNo);
		}

		


		public Map<String, Object> reservationList(int reqPage, String userId) {
			int numPerPage = 5;
			int pageNaviSize = 5;
			int reservationTotal = reservationDao.reservationTotal(userId);
			PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, reservationTotal);
			List list = reservationDao.reservationView(pi, userId);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("pi", pi);
			map.put("list", list);
			return map;
		}
		@Transactional
		public int cancelReservation(int reserveNo) {
			int result = reservationDao.cancelReservation(reserveNo);
			return result;
		}
		@Transactional
		public int updateReservation(ReservationDTO reservation) {
			int result = reservationDao.updateReservation(reservation);
			return result;
		}

		public PaymentDTO getPayInfo(int reserveNo) {
			// TODO Auto-generated method stub
			PaymentDTO payment = reservationDao.getPayInfo(reserveNo);
			return payment;
		}


}

