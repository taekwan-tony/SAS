package kr.co.sas.store.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.store.model.dao.StoreDao;
import kr.co.sas.store.model.dto.LoginStoreDTO;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.util.JwtUtils;

@Service
public class StoreService {
	@Autowired
	private StoreDao storeDao;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Autowired
	private JwtUtils jwtUtils;

	
	public boolean checkEmail(String soEmail) {
		StoreDTO store = storeDao.checkEmail(soEmail);
		return (store==null);
	}//checkEmail


	@Transactional
	public int insertStoreOwner(StoreDTO store) {
		int result = storeDao.insertStoreOwner(store);
		return result;
	}//insertStoreOwner


	@Transactional
	public int insertStore(StoreDTO store) {
		int result = storeDao.insertStore(store); //매장 사업자번호를 가져와서 점주 등록 정보를 수정
		return result;
	}//insertStore


	public Map storeLogin(StoreDTO store) {
	    Map map = new HashMap<String, Object>();
	    StoreDTO loginStore = storeDao.searchStoreOwner(store.getSoEmail());
	    if (loginStore != null) {
	        if (encoder.matches(store.getSoPw(), loginStore.getSoPw())) {
	        	// 비밀번호 일치: 로그인 성공
	            map.put("result", 0); // 로그인 성공 상태
	            loginStore.setSoPw(null); // 비밀번호는 null로 반환
	            map.put("loginSoEmail", loginStore.getSoEmail());
	            map.put("storeType", loginStore.getType());
	            map.put("accessToken", jwtUtils.storeCreateAccessToken(loginStore.getSoEmail(), loginStore.getType()));
	            map.put("refreshToken", jwtUtils.storeCreateRefreshToken(loginStore.getSoEmail(), loginStore.getType()));
	        } else {
	        	// 비밀번호 불일치
	            map.put("result", 1); // 로그인 실패 상태
	        } //else
	    } else {
	    	// 이메일 없음: 로그인 실패
	        map.put("result", 1); // 로그인 실패 상태
	    } //else
	    
	    System.out.println(map);
	    return map;
	}//storeLogin



	public LoginStoreDTO storeRefresh(String token) {
		try {
			LoginStoreDTO loginStore = jwtUtils.storeCheckToken(token);
			String accessToken = jwtUtils.storeCreateAccessToken(loginStore.getSoEmail(), loginStore.getType());
			String refreshToken = jwtUtils.storeCreateRefreshToken(loginStore.getSoEmail(), loginStore.getType());
			loginStore.setAccessToken(accessToken);
			loginStore.setRefreshToken(refreshToken);
			return loginStore;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("에러");
		}//catch
		return null;
	}//storeRefresh


	public List<StoreDTO> selectAllPayStore() {
		List list = storeDao.selectAllPayStore();
		return list;
	}


}
