package kr.co.sas.reservation.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import kr.co.sas.reservation.model.dto.PaymentDTO;
import kr.co.sas.reservation.model.dto.ReservationDTO;
import kr.co.sas.reservation.model.service.ReservationService;
import kr.co.sas.review.model.dto.ReviewDTO;
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
    public ResponseEntity<Map> insertReservation(@RequestBody ReservationDTO reservation){
//    	System.out.println(reservation);
    	SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		reservation.setReserveDateString(fmt.format(reservation.getReserveDate())+" "+reservation.getReserveTime());
    	boolean isExist = reservationService.isAlreadyReserved(reservation);
    	Map map = new HashMap<String, Object>();
    	if(!isExist) {    		
    		map = reservationService.insertReservation(reservation);		
    	}else {
    		map.put("result", false);
    	}
    	return ResponseEntity.ok(map);
    }
    
    @Operation(summary="예약등록시 결제", description="결제 완료시 결제수단, 예약번호, 결제코드, 가격을 객체로 받아 등록")
    @PostMapping(value="/pay")
    public ResponseEntity<Boolean> insertPayment(@RequestBody PaymentDTO pay){
    	int result = reservationService.insertPayment(pay);
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
    
    // 예약 삭제를 위한 메서드 추가
    @DeleteMapping("/delete/{reserveNo}")
    public ResponseEntity<String> deleteReservation(@PathVariable int reserveNo) {
        int result = reservationService.deleteReservation(reserveNo);
        return ResponseEntity.ok("예약 삭제 성공");        
    }
    //예약내역가져오기
//    @GetMapping("/view/{userId}")
//    public ResponseEntity<List> reservationView(@PathVariable String userId){
//    	List list = reservationService.reservationView(userId);
//    	System.out.println(list);
//    	System.out.println(userId);
//    	return ResponseEntity.ok(list);
//    }
    @GetMapping("/view/{reqPage}/{userId}")
    public ResponseEntity<Map<String,Object>> reservationList(@PathVariable int reqPage, @PathVariable String userId){
    	Map<String, Object> map = reservationService.reservationList(reqPage, userId);
    	return ResponseEntity.ok(map);
    }
    
    @PatchMapping("/cancel/{reserveNo}")
    public ResponseEntity<Integer> CancelReservation(@PathVariable int reserveNo){
    	int result = reservationService.cancelReservation(reserveNo);
    	return ResponseEntity.ok(result);
    }
    @GetMapping("/todayReservation/{storeNo}")
    public ResponseEntity<List<ReservationDTO>> getTodayReservation(@PathVariable int storeNo) {
        List<ReservationDTO> todayReservation = reservationService.getTodayReservation(storeNo);
        return ResponseEntity.ok(todayReservation);
    }
    @PatchMapping("/noshow/{reserveNo}")
    public ResponseEntity<String> noShow(@PathVariable int reserveNo) {
        int result = reservationService.noShow(reserveNo);
        if (result > 0) {
            return ResponseEntity.ok("노쇼 처리 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("노쇼 처리 실패");
        }
    }
    @PatchMapping("/visit/{reserveNo}")
    public ResponseEntity<String> visit(@PathVariable int reserveNo) {
        int result = reservationService.visit(reserveNo);
        if (result > 0) {
            return ResponseEntity.ok("방문 완료 처리 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("방문 완료 처리 실패");
        }
    }
    @GetMapping("/todaycustomer/{storeNo}")
    public List<ReservationDTO> getTodayCustomer(@PathVariable int storeNo) {
        return reservationService.getTodayCustomer(storeNo);
    }
    
    
    @Operation(summary="예약 변경", description = "예약객체 받아와서 시간, 인원, 날짜, 좌석 번호 변경")
    @PatchMapping
    public ResponseEntity<Boolean> updateReservation(@RequestBody ReservationDTO reservation){
    	System.out.println(reservation);
    	int result = 0;
    	
    	SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		reservation.setReserveDateString(fmt.format(reservation.getReserveDate())+" "+reservation.getReserveTime());
    	boolean isExist = reservationService.isAlreadyReserved(reservation);
    	if(!isExist) {    		
    		result = reservationService.updateReservation(reservation);		
    	}
    	return ResponseEntity.ok(result>0);
    }
}
