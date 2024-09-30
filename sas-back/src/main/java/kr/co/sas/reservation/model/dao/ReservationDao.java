package kr.co.sas.reservation.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.sas.reservation.model.dto.ReservationDTO;

@Mapper
public interface ReservationDao {

	List<ReservationDTO> selectAllReservation(int storeNo);

	int selectTotalReserve(int storeNo);

	int selectTotalReservedPeople(int storeNo);

    List<Map<String, Object>> selectAgeReservation(int storeNo);
    
    List<Map<String, Object>> selectReservationStatus(int storeNo);

	List<ReservationDTO> selectReservationList(int storeNo);

	List<ReservationDTO> selectReservationForCount(String date, int storeNo);

}
