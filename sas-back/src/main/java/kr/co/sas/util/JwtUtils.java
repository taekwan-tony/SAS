package kr.co.sas.util;


import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import kr.co.sas.store.model.dto.LoginStoreDTO;
import kr.co.sas.user.model.dto.LoginUserDTO;


@Component
public class JwtUtils {
	@Value("${jwt.secret-key}")
	public String secretkey;
	@Value("${jwt.expire-hour}")
	public int expireHour;
	@Value("${jwt.expire-hour-refresh}")
	public int expireHourRefresh;
	
	
	/**
	 * 
	 * 소비자 토큰 생성
	 * 
	 * */
	//1시간짜리 토큰생성
	public String createAccessToken(String userId,int loginType, int userNo) {
		//1. 작성해둔 키 값을 이용해서 암호화 코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretkey.getBytes());
		//2. 토큰 생성시간 및 만료시간 설정
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();
		c.add(Calendar.HOUR, expireHour);
		Date expireTime = c.getTime();
		
		String token = Jwts.builder()					//JWT생성 시작
						.issuedAt(startTime)  			//토큰발행 시작시간
						.expiration(expireTime)			//토큰만료 시간
						.signWith(key)					//암호화서명
						.claim("userId", userId)	//토큰에 포함할 회원정보 세팅(key = value)
						.claim("userType", loginType) //토큰에 포함할 회원정보 세팅(key = value)
						.claim("userNo", userNo)//토큰에 포함할 회원정보 세팅
						.compact();
		return token;
	}
	//8760시간(1년)짜리 accessToken
	public String createRefreshToken(String userId, int loginType, int userNo) {
		//1. 작성해둔 키 값을 이용해서 암호화 코드 생성
				SecretKey key = Keys.hmacShaKeyFor(secretkey.getBytes());
				//2. 토큰 생성시간 및 만료시간 설정
				Calendar c = Calendar.getInstance();
				Date startTime = c.getTime();
				c.add(Calendar.HOUR, expireHourRefresh);
				Date expireTime = c.getTime();
				
				String token = Jwts.builder()					//JWT생성 시작
								.issuedAt(startTime)  			//토큰발행 시작시간
								.expiration(expireTime)			//토큰만료 시간
								.signWith(key)					//암호화서명
								.claim("userId", userId)	//토큰에 포함할 회원정보 세팅(key = value)
								.claim("userType", loginType) //토큰에 포함할 회원정보 세팅(key = value)
								.claim("userNo", userNo)
								.compact();
				return token;
	}
	
	//토큰을 받아서 확인을 하는 작업
		public LoginUserDTO checkToken(String token) {
			//1. 토큰 해석을 위한 암호화 키 세팅 (암호화로 세팅한 그 키를 똑같이 사용 한다)
			SecretKey key = Keys.hmacShaKeyFor(secretkey.getBytes());
			Claims claims = (Claims) Jwts.parser()			//토큰해석 시작
										.verifyWith(key)	//암호화 키
										.build()
										.parse(token)
										.getPayload();
			String userId = (String)claims.get("userId");
			int loginType = (int)claims.get("userType");
			int userNo = (int)claims.get("userNo");
			LoginUserDTO loginUser = new LoginUserDTO();
			loginUser.setUserId(userId);
			loginUser.setLoginType(loginType);
			loginUser.setUserNo(userNo);
			return loginUser;
		}
		
		
		/**
		 * 
		 * 매장/관리자 토큰 생성
		 * 
		 * */
		//1시간짜리 토큰생성
		public String storeCreateAccessToken(String soEmail,int type) {
			//1. 작성해둔 키 값을 이용해서 암호화 코드 생성
			SecretKey key = Keys.hmacShaKeyFor(secretkey.getBytes());
			//2. 토큰 생성시간 및 만료시간 설정
			Calendar c = Calendar.getInstance();
			Date startTime = c.getTime();
			c.add(Calendar.HOUR, expireHour);
			Date expireTime = c.getTime();
			
			String token = Jwts.builder()					//JWT생성 시작
							.issuedAt(startTime)  			//토큰발행 시작시간
							.expiration(expireTime)			//토큰만료 시간
							.signWith(key)					//암호화서명
							.claim("soEmail", soEmail)	//토큰에 포함할 회원정보 세팅(key = value)
							.claim("type", type) //토큰에 포함할 회원정보 세팅(key = value)
							.compact();
			return token;
		}
		//8760시간(1년)짜리 accessToken
		public String storeCreateRefreshToken(String soEmail, int type) {
			//1. 작성해둔 키 값을 이용해서 암호화 코드 생성
					SecretKey key = Keys.hmacShaKeyFor(secretkey.getBytes());
					//2. 토큰 생성시간 및 만료시간 설정
					Calendar c = Calendar.getInstance();
					Date startTime = c.getTime();
					c.add(Calendar.HOUR, expireHourRefresh);
					Date expireTime = c.getTime();
					
					String token = Jwts.builder()					//JWT생성 시작
									.issuedAt(startTime)  			//토큰발행 시작시간
									.expiration(expireTime)			//토큰만료 시간
									.signWith(key)					//암호화서명
									.claim("soEmail", soEmail)	//토큰에 포함할 회원정보 세팅(key = value)
									.claim("type", type) //토큰에 포함할 회원정보 세팅(key = value)
									.compact();
					return token;
		}
		
		//토큰을 받아서 확인을 하는 작업
			public LoginStoreDTO storeCheckToken(String token) {
				//1. 토큰 해석을 위한 암호화 키 세팅 (암호화로 세팅한 그 키를 똑같이 사용 한다)
				SecretKey key = Keys.hmacShaKeyFor(secretkey.getBytes());
				Claims claims = (Claims) Jwts.parser()			//토큰해석 시작
											.verifyWith(key)	//암호화 키
											.build()
											.parse(token)
											.getPayload();
				String soEmail = (String)claims.get("soEmail");
				int type = (int)claims.get("type");
				LoginStoreDTO loginStore = new LoginStoreDTO();
				loginStore.setSoEmail(soEmail);
				loginStore.setType(type);
				return loginStore;
			}
			

			
}
