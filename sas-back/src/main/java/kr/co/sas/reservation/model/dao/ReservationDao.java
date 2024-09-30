package kr.co.sas.reservation.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.sas.reservation.model.dto.ReservationDTO;
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

	List<WeekCustomerDTO> selectWeekCustomer(int storeNo);
}
