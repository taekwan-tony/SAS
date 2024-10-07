package kr.co.sas.reservation.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.sas.reservation.model.dto.PaymentDTO;
import kr.co.sas.reservation.model.dto.ReservationDTO;
import kr.co.sas.util.PageInfo;
import kr.co.sas.weekcustomer.model.dto.WeekCustomerDTO;

@Mapper
public interface ReservationDao {

	List<ReservationDTO> selectAllReservation(int storeNo);

	int selectTotalReserve(int storeNo);

	int selectTotalReservedPeople(int storeNo);

    List<Map<String, Object>> selectAgeReservation(int storeNo);
    
    List<ReservationDTO> selectReservationStatus(int storeNo);
    
    List<Map<String, Object>> selectReservationGender(int storeNo);
 
    int selectLastMonthTotalReservation(int storeNo);
    
    int selectLastMonthTotalReservedPeople(@Param("storeNo") int storeNo);

	List<ReservationDTO> selectReservationList(int storeNo);

	List<ReservationDTO> selectReservationForCount(String date, int storeNo);

	List<WeekCustomerDTO> selectWeekCustomer(int storeNo);

	int insertReservation(ReservationDTO reservation);

	int deleteReservation(int reserveNo);

	int countSameReserve(ReservationDTO reservation);

	int insertPay(PaymentDTO pay);
	
	List<ReservationDTO> getTodayReservation(@Param("storeNo") int storeNo);

	int updateReserveStatusNoShow(int reserveNo);

	int updateReserveStatusVisit(int reserveNo);

	List<ReservationDTO> getTodayCustomer(int storeNo);


	List<ReservationDTO> reservationView(PageInfo pi, String userId);

	int reservationTotal(String userId);

	int cancelReservation(int reserveNo);

	List<ReservationDTO> selectYearAgrGroup();

}
