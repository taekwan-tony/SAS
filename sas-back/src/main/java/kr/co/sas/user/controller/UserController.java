package kr.co.sas.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.sas.user.model.dto.UserDTO;
import kr.co.sas.user.model.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/user")
@Tag(name="USER", description = "USER API")
public class UserController {
	@Autowired
	private UserService userService;
	
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
}
