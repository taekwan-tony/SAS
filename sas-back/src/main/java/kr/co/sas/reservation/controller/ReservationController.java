package kr.co.sas.reservation.controller;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import kr.co.sas.reservation.model.dto.ReservationDTO;
import kr.co.sas.reservation.model.service.ReservationService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/reservation")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@GetMapping("/reservation")
	public List<ReservationDTO> getAllReservation(@RequestParam("storeNo") int storeNo){
		return reservationService.getAllReservation(storeNo);
	}
	// 이번 달 예약 건수 조회
	@GetMapping("/totalreservation/storeNo/{storeNo}")
    public ResponseEntity<Integer> getselectTotalReserve(@PathVariable int storeNo) {
		System.out.println(storeNo);
        return ResponseEntity.ok(reservationService.getselectTotalReserve(storeNo));
    }
	// 이번 달 예약한 사람의 총 인원 조회
    @GetMapping("/totalreservedpeople/storeNo/{storeNo}")
    public ResponseEntity<Integer> getselectTotalReservedPeople(@PathVariable int storeNo) {
        return ResponseEntity.ok(reservationService.getselectTotalReservedPeople(storeNo));
    }
    // 연령대별 예약 손님 수 조회
    @GetMapping("/agereservation/storeNo/{storeNo}")
    public ResponseEntity<List<Map<String, Object>>> getAgeReservation(@PathVariable int storeNo) {
    	List<Map<String, Object>> ageData = reservationService.getAgeReservation(storeNo);
        return ResponseEntity.ok(ageData);
    }
    // 예약 상태를 가져오는 엔드포인트
    @GetMapping("/status/storeNo/{storeNo}")
    public ResponseEntity<List<Map<String, Object>>> getReservationStatus(@PathVariable int storeNo) {
        List<Map<String, Object>> reservationStatus = reservationService.getReservationStatus(storeNo);
        return ResponseEntity.ok(reservationStatus);
    }
    
    @Operation(summary = "예약 좌석 수 비교", description = "해당 날짜의 예약명단에서 시간과 좌석코드 가져와 반환")
    @GetMapping(value="/reserveDate/{date}/storeNo/{storeNo}/selectReservationForCount")
    public ResponseEntity<List> selectReservationForCount(@PathVariable String date, @PathVariable int storeNo){
    	List list = reservationService.selectReservationForCount(date, storeNo);
    	return ResponseEntity.ok(list);
    }
}
