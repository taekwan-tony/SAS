package kr.co.sas.user.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.menu.model.dao.MenuDao;
import kr.co.sas.menu.model.dto.MenuDTO;
import kr.co.sas.review.model.dao.ReviewDao;
import kr.co.sas.review.model.dto.ReviewDTO;
import kr.co.sas.store.model.dao.StoreDao;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.user.model.dao.UserDao;
import kr.co.sas.user.model.dto.LoginUserDTO;
import kr.co.sas.user.model.dto.UserDTO;
import kr.co.sas.util.JwtUtils;

@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	private StoreDao storeDao;
	@Autowired 
	private MenuDao menuDao;
	@Autowired
	private ReviewDao reviewDao;
	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	private JwtUtils jwtUtils;
	
	
	@Transactional
	public int insertUser(UserDTO user) {
		System.out.println(user.getUserPw());
		user.setUserPw(encoder.encode(user.getUserPw()));
		System.out.println(user.getUserPw());
		int result = userDao.insertUser(user);
		return result;
	}

	public boolean checkId(String userId) {
		UserDTO user = userDao.searchUser(userId);
		return (user==null);
	}

	public Map login(UserDTO user) {
		int result = 2;
		Map map = new HashMap<String, Object>();
		UserDTO loginUser = userDao.searchUser(user.getUserId());
		if(loginUser !=null) {
			if(encoder.matches(user.getUserPw(), loginUser.getUserPw())) {
				result=1;
				loginUser.setUserPw(null);
				map.put("loginId", loginUser.getUserId());
				map.put("userType", loginUser.getLoginType());
				map.put("userNo", loginUser.getUserNo());
				map.put("accessToken", jwtUtils.createAccessToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo()));
				map.put("refreshToken", jwtUtils.createRefreshToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo()));
			}else {
				result=3;
			}
		}
		map.put("result", result);
		return map;
	}

	public LoginUserDTO refresh(String token) {
		try {
			LoginUserDTO loginUser = jwtUtils.checkToken(token);
			String accessToken = jwtUtils.createAccessToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo());
			String refreshToken = jwtUtils.createRefreshToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo());
			loginUser.setAccessToken(accessToken);
			loginUser.setRefreshToken(refreshToken);;
			return loginUser;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("에러임 ");
		}
		return null;
	}

	public String findId(UserDTO user) {
		String userId = userDao.findId(user);
//		System.out.println(userId);
		return userId;
	}

	public int checkUser(UserDTO user) {
		UserDTO findUser = userDao.findUserNo(user);
		if(findUser != null) {
			return findUser.getUserNo();
		}
		return 0;
	}
	@Transactional
	public int updatePw(UserDTO user) {
		user.setUserPw(encoder.encode(user.getUserPw()));
		int result = userDao.updatePw(user);
		return result;
	}

	public StoreDTO getStoreinfo(int storeNo) {
		StoreDTO getStoreinfo = storeDao.getStoreinfo(storeNo);
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

	public UserDTO selectOneUser(int userNo) {
		UserDTO user = userDao.selectOneUser(userNo);
		System.out.println(user);
		return user;
	}

	public String getUserNickname(String loginId) {
		UserDTO userDTO = userDao.searchUser(loginId);
		return userDTO.getUserNickname();
		//반환타입,void는 반환할게없다 string이면 스트링타입을 반환
	}
	
}
