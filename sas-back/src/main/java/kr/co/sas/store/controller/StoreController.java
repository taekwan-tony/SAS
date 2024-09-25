package kr.co.sas.store.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.sas.store.model.dto.LoginStoreDTO;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.store.model.service.StoreService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/store")
@Tag(name = "STORE", description = "STORE API")
public class StoreController {
	@Autowired
	private StoreService storeService;
	
	
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
		int result = storeService.insertStore(store);
		return ResponseEntity.ok(result > 0);
	}//insertStore
	
	
	@Operation(summary = "매장 로그인", description = "이메일, 비밀번호를 객체로 가져와서 로그인")
	@PostMapping(value = "/storeLogin")
	public ResponseEntity<Map> storeLogin(@RequestBody StoreDTO store) {
		Map map = storeService.storeLogin(store);
		return ResponseEntity.ok(map);
	}//storeLogin
	
	
	@Operation(summary = "매장 로그인 갱신", description = "토큰으로 로그인 갱신")
	@PostMapping(value = "/storeRefresh")
	public ResponseEntity<Map> storeRefresh(@RequestHeader("Authorization") String token) {
		LoginStoreDTO loginStore = storeService.storeRefresh(token);
		if(loginStore != null) {
			Map map = new HashMap<String, Object>();
			map.put("loginSoEmail", loginStore.getSoEmail());
			map.put("storeType", loginStore.getType());
			map.put("accessToken", loginStore.getAccessToken());
			map.put("refreshToken", loginStore.getRefreshToken());
			return ResponseEntity.ok(map);
		}//if
		return ResponseEntity.status(404).build();
	}//storeRefresh
	
	
	
}
