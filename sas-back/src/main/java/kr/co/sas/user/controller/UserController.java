package kr.co.sas.user.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.sas.menu.model.dto.MenuDTO;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.user.model.dto.LoginUserDTO;
import kr.co.sas.user.model.dto.NaverCodeDTO;
import kr.co.sas.user.model.dto.UserDTO;
import kr.co.sas.user.model.service.UserService;
import kr.co.sas.util.EmailSender;
import kr.co.sas.util.FileUtils;
import springfox.documentation.spring.web.json.Json;


@CrossOrigin("*")
@RestController
@RequestMapping(value = "/user")
@Tag(name="USER", description = "USER API")
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private FileUtils fileUtil;
	@Value("${file.root}")
	private String root;
	
	@Autowired
	private EmailSender email;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Operation(summary = "일반회원 회원가입", description = "아이디, 비밀번호, 전화번호, 이메일, 성별, 생년월일, 이름, 랜덤생성된 닉네임을 유저 객체로 가져와 회원가입")
	@PostMapping
	public ResponseEntity<Boolean> insertUser(@RequestBody UserDTO user){
		int result = userService.insertUser(user);
		return ResponseEntity.ok(result>0);
	}
	
	@Operation(summary = "아이디 중복 체크", description = "회원 아이디를 가져와 중복체크")
	@GetMapping(value="/userId/{userId}/checkId")
	public ResponseEntity<Boolean> checkId(@PathVariable String userId){
		boolean result = userService.checkId(userId);
		return ResponseEntity.ok(result);
	}
	
	@Operation(summary="일반회원 로그인", description = "아이디, 비밀번호를 유저 객체로 가져와 로그인 진행한 후 그 결과값을 숫자인 result로 가져옴, 로그인완료시 map으로 추가 정보 제공")
	@PostMapping(value="/login")
	public ResponseEntity<Map> login(@RequestBody UserDTO user){
		Map map = userService.login(user);
		return ResponseEntity.ok(map);
	}
	@Operation(summary = "일반회원 로그인 갱신", description = "리프레시 토큰을 가져와서 옳은 토큰이면 로그인 갱신하고 map으로 토큰값과 함께 보냄")
	@PostMapping(value="/refresh")
	public ResponseEntity<Map> refresh(@RequestHeader("Authorization") String token){
//		System.out.println(token);
		LoginUserDTO loginUser = userService.refresh(token);
//		System.out.println(loginUser);
		if(loginUser!=null) {
			Map map = new HashMap<String, Object>();
			map.put("loginId", loginUser.getUserId());
			map.put("userType", loginUser.getLoginType());
			map.put("userNo", loginUser.getUserNo());
			map.put("userNickname", loginUser.getUserNickname());
			map.put("accessToken", loginUser.getAccessToken());
			map.put("refreshToken", loginUser.getRefreshToken());
			return ResponseEntity.ok(map);
		}
		return ResponseEntity.status(404).build();
	}
	
	@Operation(summary="일반회원 아이디 찾기", description = "회원 이름과 전화번호 또는 이메일을 유저 객체로 받아 해당하는 아이디를 찾아 반환>>회원 이름,전화번호/ 회원이름, 이메일이 유니크하다고 가정")
	@PostMapping(value="/findId")
	public ResponseEntity<String> findId(@RequestBody UserDTO user){
//		System.out.println(user);
		String userId = userService.findId(user);
//		System.out.println(userId);
		return ResponseEntity.ok(userId);
	}
	
	@Operation(summary="일반회원 비밀번호 찾기 회원조회", description = "회원 아이디와 이메일을 유저 객체로 받아 해당 회원이 있는지 조회, userNo를 반환")
	@PostMapping(value="/findPw")
	public ResponseEntity<Integer> findPw(@RequestBody UserDTO user){
		int result = userService.checkUser(user);
		return ResponseEntity.ok(result);
	}
	
	@Operation(summary = "일반회원 비밀번호 재생성", description = "새비밀번호와 유저 번호(+ 기존 비밀번호)를 객체로 받아서 새비밀번호로 변경, 결과를 boolean으로 반환")
	@PostMapping(value="/updatePw")
	public ResponseEntity<Boolean> updatePw(@RequestBody UserDTO user){
		int result = userService.updatePw(user);
		return ResponseEntity.ok(result>0);
	}
	
	@Operation(summary="인증메일 보내기", description = "받은 이메일을 이용해서 인증번호를 보내기")
	@PostMapping(value="/sendCode")
	public ResponseEntity<String> sendCode(@RequestBody UserDTO user) {
//		System.out.println(user);
		String receiver = user.getUserEmail();
		//인증메일 제목 생성
		String emailTitle = "Spoon & Smiles 인증메일입니다.";
		//인증메일 인증코드 생성
		Random r = new Random();
		StringBuffer sb = new StringBuffer();
		for(int i=0; i<6; i++) {
			//0~9 : r.nextInt(10);
			//A~Z : r.nextInt(26)+65;
			//a~z : r.nextInt(26)+97;
			
			int flag = r.nextInt(3); //0,1,2=>숫자쓸지, 대문자 쓸지, 소문자쓸지 결정
			
			if(flag==0) {
				int randomCode = r.nextInt(10);
				sb.append(randomCode);
			}else if(flag==1) {
				char randomCode = (char)(r.nextInt(26)+65);
				sb.append(randomCode);
			}else if(flag==2) {
				char randomCode = (char)(r.nextInt(26)+97);
				sb.append(randomCode);
			}
		}
		String emailContent = "<h1>안녕하세요. Spoon & Smiles 입니다. </h1>"
								+"<h3>인증번호는 [<span style='color:red;'>"
								+sb.toString()
								+"</span>]입니다. </h3>";
		email.sendMail(emailTitle, receiver, emailContent);
		return ResponseEntity.ok(sb.toString());
	}
	
	
	@Operation(summary="회원정보 조회", description = "userNo를 받아와서 그에 해당하는 유저객체 반환, 없으면 404")
	@GetMapping(value="/userNo/{userNo}")
	public ResponseEntity<UserDTO> getUserInfo(@PathVariable int userNo){
		UserDTO user = userService.selectOneUser(userNo);
		if(user!=null) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(404).build();
	}
	@GetMapping(value="/userId/{loginId}/getUserNickname")
	public ResponseEntity<String> getUserNickname (@PathVariable String loginId){
		String userNickname = userService.getUserNickname(loginId);
		return ResponseEntity.ok(userNickname);
	}
	
	@Operation(summary = "일반회원 프로필사진 업데이트", description = "이미지 파일을 form으로 받아와서 일반회원 정보 업데이트, 결과와 filepath를 반환")
	@PatchMapping(value="/updateUserPhoto")
	public ResponseEntity<Map> updateUserPhoto(@ModelAttribute UserDTO user, @ModelAttribute MultipartFile userImageFile){
		Map map = new HashMap<String, Object>();
		int result = 0;
		if(userImageFile != null) {
			String savepath = root + "/userProfile/";
			String filepath = fileUtil.upload(savepath, userImageFile);
			user.setUserPhoto(filepath);
			result = userService.updateUserPhoto(user);
			if(result>0) {
				map.put("userPhoto", user.getUserPhoto());
			}
		}
		map.put("result", result>0);
		return ResponseEntity.ok(map);
	}
	
	@Operation(summary="일반회원 결제 정보 가져오기", description = "결제위해 필요한 일반회원 이름, 전화번호, 이메일 가져오기")
	@GetMapping(value="/userNo/{userNo}/reservation")
	public ResponseEntity<UserDTO> getUserInfoForPay(@PathVariable int userNo){
		UserDTO user = userService.getUserInfoForPay(userNo);
		if(user!=null) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(404).build();
	}
	
	@Operation(summary="일반회원 기본 정보 가져오기", description = "정보 수정 위해 개인 정보(아이디, 닉네임, 이름, 성별, 생년월일, 전화번호, 이메일 조회")
	@GetMapping(value="/userNo/{userNo}/update")
	public ResponseEntity<UserDTO> getUserInfoForUpdate(@PathVariable int userNo){
		UserDTO user = userService.getUserInfoForUpdate(userNo);
		if(user!=null) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(404).build();
	}
	
	@Operation(summary="일반회원 비밀번호 체크", description="정보 수정 전 회원 비밀번호를 받아와 맞는지 여부를 논리값으로 반환")
	@PostMapping(value="/checkUser")
	public ResponseEntity<Boolean> checkUserPw(@RequestBody UserDTO user){
		boolean result = userService.checkUserPw(user);
		return ResponseEntity.ok(result);
	}
	
	@Operation(summary="일반회원 정보 수정", description = "회원 번호, 회원 닉네임, (회원 비밀번호), 회원 전화번호, 회원 이메일을 유저 객체로 받아 수정")
	@PatchMapping
	public ResponseEntity<Boolean> updateUser(@RequestBody UserDTO user){
//		System.out.println("업데이트 값"+user);
		int result = userService.updateUser(user);
//		System.out.println(result);
		return ResponseEntity.ok(result>0);
	}
	
	@Operation(summary="일반회원 닉네임 중복 조회", description = "회원 닉네임을 받아서 중복됐는지 체크")
	@GetMapping(value="/userNickname/{userNickname}")
	public ResponseEntity<Boolean> checkNickname(@PathVariable String userNickname){
		boolean result = userService.checkNickname(userNickname);
		return ResponseEntity.ok(result);
	}
	
	@Operation(summary="일반회원 회원정보 수정시 토큰 재갱신", description="회원 아이디, 번호, 닉네임, 유저타입을 받아서 토큰 재갱신해서 반환")
	@PostMapping(value="/refreshToken")
	public ResponseEntity<Map> refreshTokenAfterUpdate(@RequestBody UserDTO user){
//		System.out.println("토큰 값:"+user);
		LoginUserDTO loginUser = userService.getToken(user);
		Map map = new HashMap<String, Object>();
		map.put("loginId", loginUser.getUserId());
		map.put("userType", loginUser.getLoginType());
		map.put("userNo", loginUser.getUserNo());
		map.put("userNickname", loginUser.getUserNickname());
		map.put("accessToken", loginUser.getAccessToken());
		map.put("refreshToken", loginUser.getRefreshToken());
		return ResponseEntity.ok(map);	
	}
	
	@Operation(summary="일반회원 프로필사진 가져오기", description = "회원 아이디를 받아서 프로필사진 경로 가져오기")
	@GetMapping(value="/userId/{userId}/userPhoto")
	public ResponseEntity<String> getUserPhoto(@PathVariable String userId){
		String userPhoto = userService.getUserPhoto(userId);
		return ResponseEntity.ok(userPhoto);
	}
	
	@Operation(summary="네이버 소셜로그인 인증 코드 받아오기")
	@PostMapping(value="/callBack")
	public ResponseEntity<Map> naverLogin(@RequestBody NaverCodeDTO naver){
		Map isUser = new HashMap<String, Object>();
//		System.out.println(1);
//		System.out.println(naver);
		HttpHeaders header = new HttpHeaders();
		header.setContentType(MediaType.APPLICATION_FORM_URLENCODED); //일단 이걸로 넣었음 아직 이게 뭔지 모름
		HttpEntity<String> entity=new HttpEntity("grant_type=authorization_code&client_id="+naver.getClientId()+"&client_secret="+naver.getClientSecret()+"&code="+naver.getCode()+"&state="+naver.getState(), header);
		ResponseEntity<String> response = restTemplate.postForEntity("https://nid.naver.com/oauth2.0/token", entity, String.class);
//		System.out.println(response);
//		System.out.println(response.getBody());
		ObjectMapper om = new ObjectMapper(); //json을 읽고 쓸 수 있게 도와준대..
		String accessToken="";
		try {
			JsonNode node = om.readTree(response.getBody());
			accessToken = node.get("access_token").asText();
			
//			accessToken 받았으므로 여기서 프로필 정보 가져오는 코드 써야함
			HttpHeaders profileHeader = new HttpHeaders();
			profileHeader.setContentType(MediaType.APPLICATION_JSON);
			profileHeader.setBearerAuth(accessToken);
			HttpEntity<String> profileEntity = new HttpEntity(profileHeader);
			ResponseEntity<String> profileResponse = restTemplate.postForEntity("https://openapi.naver.com/v1/nid/me", profileEntity, String.class);
//			System.out.println(profileResponse);
			//받아온 값에서 가져올 유저 프로필 정보 가져오기
			
			JsonNode jsonNode = om.readTree(profileResponse.getBody());
			JsonNode profileObject = jsonNode.get("response");
			UserDTO user = new UserDTO();
			if(profileObject.get("profile_image")!=null) {
			String userPhotoUrl =profileObject.get("profile_image").asText("/image/프로필 기본.png").replace("\\", "");
			String savepath = root + "/userProfile/";
			String filepath=fileUtil.uploadProfile(userPhotoUrl, savepath);
			user.setUserPhoto(filepath);
			}
//			System.out.println(user.getUserPhoto());
			user.setUserGender(profileObject.get("gender").asText().equals("F")?"여":"남");
			user.setUserEmail(profileObject.get("email").asText());
			user.setUserPhone(profileObject.get("mobile").asText());
			user.setUserBirth(profileObject.get("birthyear").asText()+"-"+profileObject.get("birthday").asText());
			isUser = userService.isThereUser(user);
		} catch (JsonProcessingException e) {
			isUser.put("result", -1);
		}
		return ResponseEntity.ok(isUser);
	}
	@Operation(summary="네이버 소셜로그인 회원가입")
	@PostMapping(value="/joinNaver")
	public ResponseEntity<Map> joinNaver(@RequestBody UserDTO user){
//		System.out.println(user);
		Map map = userService.insertNaverUser(user);
		return ResponseEntity.ok(map);
	}
}
