package kr.co.sas.reservation.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.reservation.model.dto.ReservationDTO;

@Mapper
public interface ReservationDao {

	List<ReservationDTO> selectAllReservation(int storeNo);


}
