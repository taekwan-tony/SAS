package kr.co.sas.store.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.menu.model.dao.MenuDao;
import kr.co.sas.review.model.dao.ReviewDao;
import kr.co.sas.review.model.dto.ReviewDTO;
import kr.co.sas.seat.model.dto.SeatDTO;
import kr.co.sas.store.model.dao.StoreDao;
import kr.co.sas.store.model.dto.LoginStoreDTO;
import kr.co.sas.store.model.dto.StoreAmenitiesDTO;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.store.model.dto.StoreFileDTO;
import kr.co.sas.store.model.dto.StoreMoodDTO;
import kr.co.sas.util.JwtUtils;

@Service
public class StoreService {
	@Autowired
	private StoreDao storeDao;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private MenuDao menuDao;
	@Autowired
	private ReviewDao reviewDao;
	
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
		int result = 2;
	    Map map = new HashMap<String, Object>();
	    StoreDTO loginStore = storeDao.searchStoreOwner(store.getSoEmail());
	    if (loginStore != null) {
	        if (encoder.matches(store.getSoPw(), loginStore.getSoPw())) {
	        	// 비밀번호 일치: 로그인 성공
	        	result = 1;
	            loginStore.setSoPw(null); // 비밀번호는 null로 반환
	            map.put("loginSoEmail", loginStore.getSoEmail());
	            map.put("storeType", loginStore.getType());
	            map.put("storeNo", loginStore.getStoreNo()); // storeNo 추가
	            map.put("storeName", loginStore.getStoreName()); // storeName 추가
	            map.put("accessToken", jwtUtils.storeCreateAccessToken(loginStore.getSoEmail(), loginStore.getType(), loginStore.getStoreNo(), loginStore.getStoreName()));
	            map.put("refreshToken", jwtUtils.storeCreateRefreshToken(loginStore.getSoEmail(), loginStore.getType(), loginStore.getStoreNo(), loginStore.getStoreName()));
	        } else {
	        	// 비밀번호 불일치
	            result = 3;
	        } //else
	    } //else
	    map.put("result", result);
	    System.out.println("로그인 : " + map);
	    return map;
	}//storeLogin



	public LoginStoreDTO storeRefresh(String token) {
		try {
			LoginStoreDTO loginStore = jwtUtils.storeCheckToken(token);
			System.out.println("갱신된 storeNo: " + loginStore.getStoreNo()); // storeNo 값 로그로 확인
			String accessToken = jwtUtils.storeCreateAccessToken(loginStore.getSoEmail(), loginStore.getType(), loginStore.getStoreNo(), loginStore.getStoreName());
			String refreshToken = jwtUtils.storeCreateRefreshToken(loginStore.getSoEmail(), loginStore.getType(), loginStore.getStoreNo(), loginStore.getStoreName());
			loginStore.setAccessToken(accessToken);
			loginStore.setRefreshToken(refreshToken);
			return loginStore;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("에러");
		}//catch
		return null;
	}//storeRefresh


	@Transactional
	public int changePw(StoreDTO store) {
		String encPw = (encoder.encode(store.getSoPw()));
		store.setSoPw(encPw);
		int result = storeDao.changePw(store);
		return result;
	}//changePw

	
	public List<StoreDTO> selectAllPayStore() {
		List list = storeDao.selectAllPayStore();
		return list;
	}


	public List selectAllstore() {
		List list = storeDao.selectAllstore();
		return list;
	}

	public StoreDTO getStoreinfo(int storeNo, int userNo) {
		StoreDTO getStoreinfo = storeDao.getStoreinfo(storeNo, userNo);
		return getStoreinfo;
			
		}

	public List getMenuinfo(int storeNo) {
		List getMenuinfo = menuDao.getMenuinfo(storeNo);
		return getMenuinfo;
	}

	public List<ReviewDTO> getReviewinfo(int storeNo) {
	    List<ReviewDTO> getReviewinfo = reviewDao.getReviewsByStoreNo(storeNo); 
	    return getReviewinfo;
	}
	public LoginStoreDTO checkPw(StoreDTO store) {
		StoreDTO checkPw = storeDao.searchStoreOwner(store.getSoEmail());
		if(checkPw != null && encoder.matches(store.getSoPw(), checkPw.getSoPw())) {
			String accessToken = jwtUtils.storeCreateAccessToken(checkPw.getSoEmail(), checkPw.getType(), checkPw.getStoreNo(), checkPw.getStoreName());
			String refreshToken = jwtUtils.storeCreateRefreshToken(checkPw.getSoEmail(), checkPw.getType(), checkPw.getStoreNo(), checkPw.getStoreName());
			LoginStoreDTO loginStore = new LoginStoreDTO(accessToken, refreshToken, checkPw.getSoEmail(), checkPw.getType(), store.getStoreNo(), store.getStoreName());
			return loginStore;
		}//if
		return null;
	}//checkPw


	@Transactional
	public int insertStoreFrm(StoreDTO store) {
		//매장 정보
		int result = storeDao.insertStoreFrm(store);
		return result;
		
	}//insertStoreFrm


	@Transactional
	public int insertSeat(SeatDTO seat) {
		int result = storeDao.insertSeat(seat);
		return result;
	}//insertSeat


	@Transactional
	public int insertStoreImg(int storeNo, List<StoreFileDTO> storeFileList) {
		int result = 0;
		for(StoreFileDTO storeFile : storeFileList) {
			storeFile.setStoreNo(storeNo);
			result += storeDao.insertStoreFile(storeFile);
		}//for
		return result;
	}//insertStoreImg


	public StoreDTO getStoreReserveInfo(int storeNo) {
		StoreDTO store = storeDao.getStoreReserveInfo(storeNo);
		return store;
	}
	
	@Transactional
	public int insertStoreMood(int storeNo, List<StoreMoodDTO> storeMoodList) {
		int result = 0;
		for(StoreMoodDTO mood : storeMoodList) {
			mood.setStoreNo(storeNo);
			result += storeDao.insertStoreMood(mood);
		}//for
		return result;
	}//insertStoreMood


	@Transactional
	public int insertStoreAmenities(int storeNo, List<StoreAmenitiesDTO> storeAMList) {
		int result = 0;
		for(StoreAmenitiesDTO amenities : storeAMList) {
			amenities.setStoreNo(storeNo);
			result += storeDao.insertStoreAmenities(amenities);
		}//for
		return result;
	}//insertStoreAmenities


	public boolean checkBusinessNumber(int businessNumber) {
		StoreDTO store = storeDao.checkBusinessNumber(businessNumber);
		return (store == null);
	}//checkBusinessNumber


	public StoreDTO storeEmailselect(int storeNo) {
		StoreDTO store = storeDao.storeEmailselect(storeNo);
		return store;
	}


	public List kakaoMapStore() {
		List list = storeDao.kakaoMapStore();
		return list;
	}


}
