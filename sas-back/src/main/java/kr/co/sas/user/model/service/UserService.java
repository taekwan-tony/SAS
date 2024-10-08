package kr.co.sas.user.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.favorite.model.dao.FavoriteDao;
import kr.co.sas.favorite.model.dto.FavoriteFolderDTO;
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
	@Autowired
	private FavoriteDao favoriteDao;
	
	@Transactional
	public int insertUser(UserDTO user) {
//		System.out.println(user.getUserPw());
		user.setUserPw(encoder.encode(user.getUserPw()));
//		user.setUserPw(encoder.encode("1234"));=>새 테스트용 데이터 넣는 용
//		System.out.println(user.getUserPw());
		int result = userDao.insertUser(user);
		if(result>0) {
			FavoriteFolderDTO favoriteFolder = new FavoriteFolderDTO();
			favoriteFolder.setFavoriteFolderName("기본 폴더");
			result = favoriteDao.insertStandardFavoriteFolder(favoriteFolder);
		}
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
				map.put("userNickname", loginUser.getUserNickname());
				map.put("accessToken", jwtUtils.createAccessToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo(), loginUser.getUserNickname()));
				map.put("refreshToken", jwtUtils.createRefreshToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo(), loginUser.getUserNickname()));
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
			String accessToken = jwtUtils.createAccessToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo(), loginUser.getUserNickname());
			String refreshToken = jwtUtils.createRefreshToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo(), loginUser.getUserNickname());
			loginUser.setAccessToken(accessToken);
			loginUser.setRefreshToken(refreshToken);;
			return loginUser;
		} catch (Exception e) {
			// TODO: handle exception
//			System.out.println("에러임 ");
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



	public UserDTO selectOneUser(int userNo) {
		UserDTO user = userDao.selectOneUser(userNo);
//		System.out.println(user);
		return user;
	}

	public String getUserNickname(String loginId) {
		UserDTO userDTO = userDao.searchUser(loginId);
		return userDTO.getUserNickname();
		//반환타입,void는 반환할게없다 string이면 스트링타입을 반환
	}
	
	@Transactional
	public int updateUserPhoto(UserDTO user) {
		int result = userDao.updateUserPhoto(user);
		return result;
	}

	public UserDTO getUserInfoForPay(int userNo) {
		UserDTO user = userDao.getUserInfo(userNo);
		if(user!=null) {
			user.setUserBirth(null);
			user.setUserGender(null);
		}
		return user;
	}

	public UserDTO getUserInfoForUpdate(int userNo) {
		UserDTO user = userDao.getUserInfo(userNo);
		return user;
	}

	public boolean checkUserPw(UserDTO user) {
		UserDTO userPw = userDao.getUserPwInfo(user);
//		System.out.println(user);
//		System.out.println(userPw);
		if(userPw!=null) {
			return encoder.matches(user.getUserPw(), userPw.getUserPw());
		}else {
			return false;
		}
	}
	@Transactional
	public int updateUser(UserDTO user) {
		if(user.getUserPw()!=null && !user.getUserPw().equals("")) {
			user.setUserPw(encoder.encode(user.getUserPw()));
		}else {
			user.setUserPw(null);
		}
		int result = userDao.updateUser(user);
		if(result>0) {
//			System.out.println("회원 업데이트"+result);
			result += userDao.updateReview(user);
//			System.out.println("리뷰업데이트"+result);
		}
		return result;
	}

	public boolean checkNickname(String userNickname) {
		int result = userDao.checkNickname(userNickname);
		return result==0;
	}

	public LoginUserDTO getToken(UserDTO user) {
		LoginUserDTO loginUser = new LoginUserDTO();
		loginUser.setAccessToken(jwtUtils.createAccessToken(user.getUserId(), user.getLoginType(), user.getUserNo(), user.getUserNickname()));
		loginUser.setLoginType(user.getLoginType());
		loginUser.setRefreshToken(jwtUtils.createRefreshToken(user.getUserId(), user.getLoginType(), user.getUserNo(), user.getUserNickname()));
		loginUser.setUserId(user.getUserId());
		loginUser.setUserNickname(user.getUserNickname());
		loginUser.setUserNo(user.getUserNo());
		return loginUser;
	}

	public String getUserPhoto(String userId) {
		UserDTO user = userDao.searchUser(userId);
		return user.getUserPhoto();
	}
	
	public Map isThereUser(UserDTO user) {
		Map map = new HashMap<String, Object>();
		int result = 0;
		LoginUserDTO loginUser= userDao.isThereUser(user.getUserPhone());
		if(loginUser!=null) {
			result=1;
			loginUser.setAccessToken(jwtUtils.createAccessToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo(), loginUser.getUserNickname()));
			loginUser.setRefreshToken(jwtUtils.createAccessToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo(), loginUser.getUserNickname()));
			map.put("loginUser", loginUser);
		}else {
			map.put("joinUser", user);
		}
		map.put("result", result);
		return map;
	}	
	
	@Transactional
	public Map insertNaverUser(UserDTO user) {
		Map map = new HashMap<String, Object>();
		Random r = new Random();
		//임의로 넣을 아이디, 비밀번호 만들기
		//아이디
		StringBuffer userId = new StringBuffer();
		for(int i=0; i<8; i++) {
			//0~9 : r.nextInt(10);
			//A~Z : r.nextInt(26)+65;
			//a~z : r.nextInt(26)+97;
			
			int idFlag = r.nextInt(3); //0,1,2=>숫자쓸지, 대문자 쓸지, 소문자쓸지 결정
			
			if(idFlag==0) {
				int randomCode = r.nextInt(10);
				userId.append(randomCode);
			}else if(idFlag==1) {
				char randomCode = (char)(r.nextInt(26)+65);
				userId.append(randomCode);
			}else if(idFlag==2) {
				char randomCode = (char)(r.nextInt(26)+97);
				userId.append(randomCode);
			}
		}
		user.setUserId(userId.toString());
		//비밀번호
		StringBuffer userPw = new StringBuffer();
		for(int j=0; j<20; j++) {
			//0~9 : r.nextInt(10);
			//A~Z : r.nextInt(26)+65;
			//a~z : r.nextInt(26)+97;
			
			int pwFlag = r.nextInt(3); //0,1,2=>숫자쓸지, 대문자 쓸지, 소문자쓸지 결정
			
			if(pwFlag==0) {
				int randomCode = r.nextInt(10);
				userPw.append(randomCode);
			}else if(pwFlag==1) {
				char randomCode = (char)(r.nextInt(26)+65);
				userPw.append(randomCode);
			}else if(pwFlag==2) {
				char randomCode = (char)(r.nextInt(26)+97);
				userPw.append(randomCode);
			}
		}
		user.setUserPw(encoder.encode(userPw));
		int result = userDao.insertNaverUser(user);
		if(result>0) {
			FavoriteFolderDTO favoriteFolder = new FavoriteFolderDTO();
			favoriteFolder.setFavoriteFolderName("기본 폴더");
			result = favoriteDao.insertStandardFavoriteFolder(favoriteFolder);
		}
		if(result>0) {
//			System.out.println(112);
			LoginUserDTO loginUser = userDao.isThereUser(user.getUserPhone());
			loginUser.setAccessToken(jwtUtils.createAccessToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo(), loginUser.getUserNickname()));
			loginUser.setRefreshToken(jwtUtils.createAccessToken(loginUser.getUserId(), loginUser.getLoginType(), loginUser.getUserNo(), loginUser.getUserNickname()));
			map.put("loginUser", loginUser);
		}
		map.put("result", result>0);
		return map;
	}


}
