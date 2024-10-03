package kr.co.sas.store.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import kr.co.sas.seat.model.dto.SeatDTO;
import kr.co.sas.store.model.dto.LoginStoreDTO;
import kr.co.sas.store.model.dto.StoreAmenitiesDTO;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.store.model.dto.StoreFileDTO;
import kr.co.sas.store.model.dto.StoreMoodDTO;
import kr.co.sas.store.model.service.StoreService;
import kr.co.sas.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/store")
@Tag(name = "STORE", description = "STORE API")
public class StoreController {
	@Autowired
	private StoreService storeService;
	
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	
	@Operation(summary = "매장 점주 이메일 중복 체크", description = "이메일을 가져와서 중복 체크")
	@GetMapping(value = "/soEmail/{soEmail}/checkEmail")
	public ResponseEntity<Boolean> checkEmail(@PathVariable String soEmail) {
		boolean result = storeService.checkEmail(soEmail);
		return ResponseEntity.ok(result);
	}//checkEmail
	
	
	@Operation(summary = "점주 제휴 신청", description = "사업자등록번호, 이름, 전화번호, 이메일로 제휴 신청")
	@PostMapping
	public ResponseEntity<Boolean> insertStoreOwner(@RequestBody StoreDTO store) {
		int result = storeService.insertStoreOwner(store);
		return ResponseEntity.ok(result > 0);
	}//insertStoreOwner
	
	
	@Operation(summary = "매장 등록", description = "매장 상호명, 매장 전화번호, 매장 위치, 영업 시간, 매장 유형을 받아서 등록")
	@GetMapping
	public ResponseEntity<Boolean> insertStore(@RequestBody StoreDTO store) {
		System.out.println("매장테스트 : "+store);
		int result = storeService.insertStore(store);
		return ResponseEntity.ok(result > 0);
	}//insertStore
	
	
	@Operation(summary = "매장 로그인", description = "이메일, 비밀번호를 객체로 가져와서 로그인")
	@PostMapping(value = "/storeLogin")
	public ResponseEntity<Map> storeLogin(@RequestBody StoreDTO store) {
		System.out.println("로그인 정보 : " + store);
		Map map = storeService.storeLogin(store);
		return ResponseEntity.ok(map);
	}//storeLogin
	
	
	@Operation(summary = "매장 로그인 갱신", description = "토큰으로 로그인 갱신")
	@PostMapping(value = "/storeRefresh")
	public ResponseEntity<LoginStoreDTO> storeRefresh(@RequestHeader("Authorization") String token) {
		LoginStoreDTO loginStore = storeService.storeRefresh(token);
		if(loginStore != null) {
			return ResponseEntity.ok(loginStore);
		}else {
			return ResponseEntity.status(404).build();
		}//else
	}//storeRefresh
	
	@GetMapping(value="/storeList")
	public ResponseEntity<List> selectAllstore (){
		List storeList = storeService.selectAllstore();
		System.out.println("매장이미지보려고"+storeList);
		return ResponseEntity.ok(storeList);
	}
	
	@GetMapping(value="/storeEmail/{storeNo}")
	public ResponseEntity<StoreDTO> storeEmail(@PathVariable int storeNo){
		StoreDTO store = storeService.storeEmailselect(storeNo);
		return ResponseEntity.ok(store);
	}
	
	@GetMapping(value="/storeNo/{storeNo}/userNo/{userNo}")
	public ResponseEntity<StoreDTO> getStoreinfo(@PathVariable int storeNo, @PathVariable int userNo) {
//		System.out.println(userNo);
		StoreDTO store = storeService.getStoreinfo(storeNo, userNo);
		System.out.println(store);
		if(store !=null) {
			return ResponseEntity.ok(store);
		}
		return ResponseEntity.status(404).build();
	}
	@GetMapping(value="/storeNo/{storeNo}/menu")
	public ResponseEntity<List> getMenuinfo(@PathVariable int storeNo){
		List list = storeService.getMenuinfo(storeNo);	
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/storeNo/{storeNo}/review")
	public ResponseEntity<List> getReviewinfo(@PathVariable int storeNo){
		List list = storeService.getReviewinfo(storeNo);
		return ResponseEntity.ok(list);
	}
	
	@Operation(summary = "매장 비밀번호 변경", description ="새 비밀번호와 기존 비밀번호를 객체로 받아서 새 비밀번호로 변경")
	@PostMapping(value = "/changePw")
	public ResponseEntity<Integer> changePw(@RequestBody StoreDTO store) {
		int result = storeService.changePw(store);
		return ResponseEntity.ok(result);
	}//changePw
	
	
	@Operation(summary = "매장 비밀번호 변경 시 회원 조회", description = "점주 이메일, 기존 비밀번호 일치하는지 확인")
	@PostMapping(value = "/checkPw")
	public ResponseEntity<LoginStoreDTO> checkPw(@RequestBody StoreDTO store) {
		LoginStoreDTO result = storeService.checkPw(store);
		if(result != null) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.status(404).build();
		}//else
	}//checkPw
	
	
	@Operation(summary = "매장 정보")
	@PostMapping(value = "/insertStore")
	public ResponseEntity<Boolean> insertStoreFrm(@RequestBody StoreDTO store) {
		
	    // 데이터 로그
	    System.out.println("StoreDTO: " + store.toString());
	    //System.out.println("Store Mood: " + storeMood);
	    //System.out.println("Store Amenities: " + storeAmenities);

	    int result = storeService.insertStoreFrm(store);
	    return ResponseEntity.ok(result > 0);
	}//insertStore
	
	
	@Operation(summary = "매장 좌석 수")
	@PostMapping(value = "/insertSeat")
	public ResponseEntity<Boolean> insertSeat(@RequestBody SeatDTO seat) {
		
		// 데이터 로그
		System.out.println("SeatDTO : " + seat.toString());
		
		int result = storeService.insertSeat(seat);
		return ResponseEntity.ok(result > 0);
	}//insertSeat
	
	
	@Operation(summary = "매장 사진")
	@PostMapping(value = "/insertStoreImg/{storeNo}")
	public ResponseEntity<Boolean> insertStoreImg(
	        @ModelAttribute MultipartFile[] storeFile, @PathVariable int storeNo) {

		List<StoreFileDTO> storeFileList = new ArrayList<StoreFileDTO>();
		if(storeFile != null) {
			String savepath = root + "/store/";
			for(MultipartFile file : storeFile) {
				StoreFileDTO storeFileDTO = new StoreFileDTO();
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.upload(savepath, file);
				storeFileDTO.setSiFileName(filename);
				storeFileDTO.setSiFilepath(filepath);
				storeFileDTO.setStoreNo(storeNo);
				storeFileList.add(storeFileDTO);
			}//for
		}//if
		int result = storeService.insertStoreImg(storeNo, storeFileList);
		return ResponseEntity.ok(result == 1 + storeFileList.size());
	}//insertStoreImg
	
	
	@Operation(summary = "매장 분위기")
	@PostMapping(value = "insertStoreMood/{storeNo}")
	public ResponseEntity<Boolean> insertStoreMood(@PathVariable int storeNo, @RequestParam List<String> storeMood) {
		System.out.println("매장 분위기 " + storeMood.toString());
		System.out.println(storeNo);
		
		List<StoreMoodDTO> storeMoodList = new ArrayList<StoreMoodDTO>();
		if(storeMoodList != null) {
			for(String mood : storeMood) {
				StoreMoodDTO st = new StoreMoodDTO();
				st.setMood(mood);
				storeMoodList.add(st);
			}//for
		}//if
		int result = storeService.insertStoreMood(storeNo, storeMoodList);
		return ResponseEntity.ok(result > 0);
	}//insertStoreMood
	
	
	@Operation(summary = "매장 편의시설")
	@PostMapping(value = "insertStoreAmenities/{storeNo}")
	public ResponseEntity<Boolean> insertStoreAmenities(@PathVariable int storeNo, @RequestParam List<String> storeAmenities) {
		System.out.println("매장 편의시설" + storeAmenities.toString());
		
		List<StoreAmenitiesDTO> storeAMList = new ArrayList<StoreAmenitiesDTO>();
		if(storeAMList != null) {
			for(String amenities : storeAmenities) {
				StoreAmenitiesDTO sa = new StoreAmenitiesDTO();
				sa.setAmenities(amenities);
				storeAMList.add(sa);
			}//for
		}//if
		int result = storeService.insertStoreAmenities(storeNo, storeAMList);
		return ResponseEntity.ok(result > 0);
	}//insertstoreAmenities
	
	
	@Operation(summary = "매장 정보 가져오기", description = "매장 번호를 받아 예약등록에 필요한 매장 정보(예약금/ 예약시작시간/ 예약 마감시간/ 브레이크 타임 시작/마감/좌석수  가져오기 )")
	@GetMapping(value="/storeNo/{storeNo}/getReserveInfo")
	public ResponseEntity<StoreDTO> getStoreReserveInfo(@PathVariable int storeNo){
		StoreDTO store = storeService.getStoreReserveInfo(storeNo);
		return ResponseEntity.ok(store);
	}
	
	
	@Operation(summary = "사업자 등록 번호 중복 확인")
	@GetMapping(value = "/businessNumber/{businessNumber}/checkBusinessNumber")
	public ResponseEntity<Boolean> checkBusinessNumber(@PathVariable int businessNumber) {
		boolean result = storeService.checkBusinessNumber(businessNumber);
		return ResponseEntity.ok(result);
	}//checkBusinessNumber
	
	
}
