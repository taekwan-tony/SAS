package kr.co.sas.reservation.controller;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import kr.co.sas.reservation.model.dto.ReservationDTO;
import kr.co.sas.reservation.model.service.ReservationService;
import kr.co.sas.weekcustomer.model.dto.WeekCustomerDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/reservation")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@GetMapping("/reservation/{storeNo}")
	public List<ReservationDTO> getAllReservation(@PathVariable int storeNo){
	    List<ReservationDTO> reservations = reservationService.getAllReservation(storeNo);
		return reservationService.getAllReservation(storeNo);
	}
	// 이번 달 예약 건수 조회
	@GetMapping("/totalreservation/storeNo/{storeNo}")
    public ResponseEntity<Integer> getselectTotalReserve(@PathVariable int storeNo) {
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
    // 예약 상태를 가져오는 메서드
    @GetMapping("/status/storeNo/{storeNo}")
    public List<ReservationDTO> getReservationStatus(@PathVariable int storeNo){
	    List<ReservationDTO> reservations = reservationService.getReservationStatus(storeNo);
		return reservations;
	}
    //성별 정보를 가져오는 메서드
    @GetMapping("/genderdata/storeNo/{storeNo}")
    public ResponseEntity<List<Map<String, Object>>> getReservationGender(@PathVariable int storeNo) {
        List<Map<String, Object>> genderData = reservationService.getReservationGender(storeNo);
        return ResponseEntity.ok(genderData);
    }
//    수진-예약-시작
    @Operation(summary = "예약 좌석 수 비교", description = "해당 날짜의 예약명단에서 시간과 좌석코드 가져와 반환")
    @GetMapping(value="/reserveDate/{date}/storeNo/{storeNo}/selectReservationForCount")
    public ResponseEntity<List> selectReservationForCount(@PathVariable String date, @PathVariable int storeNo){
    	System.out.println(date);
    	List list = reservationService.selectReservationForCount(date, storeNo);
    	return ResponseEntity.ok(list);
    }
    
    @Operation(summary="예약 등록", description="예약날짜, 예약 시간, 결제 여부, 인원수, 매장 번호, 좌석 번호, 유저 아이디를 예약 객체로 받아 등록")
    @PostMapping
    public ResponseEntity<Boolean> insertReservation(@RequestBody ReservationDTO reservation){
    	System.out.println(reservation);
    	int result = reservationService.insertReservation(reservation);
    	return ResponseEntity.ok(result>0);
    }
//   수진-예약 -끝
    // 지난달 예약 건수 조회 메서드 추가
    @GetMapping("/lastMonthTotalReservation/storeNo/{storeNo}")
    public ResponseEntity<Integer> getLastMonthTotalReservation(@PathVariable int storeNo) {
        return ResponseEntity.ok(reservationService.getLastMonthTotalReservation(storeNo));
    }
    // 지난달 예약된 총 인원수를 조회하는 메서드
    @GetMapping("/lastMonthTotalReservedPeople/storeNo/{storeNo}")
    public ResponseEntity<Integer> getLastMonthTotalReservedPeople(@PathVariable int storeNo) {
        int totalReservedPeople = reservationService.getLastMonthTotalReservedPeople(storeNo);
        return ResponseEntity.ok(totalReservedPeople);
    }
    // 한 주간의 손님 수를 요일별로 조회하는 메서드
    @GetMapping("/weekcustomer/storeNo/{storeNo}")
    public ResponseEntity<List<WeekCustomerDTO>> getWeekCustomer(@PathVariable int storeNo) {
        List<WeekCustomerDTO> weeklyCustomer = reservationService.getWeeklyCustomer(storeNo);
        return ResponseEntity.ok(weeklyCustomer);
    }

}
