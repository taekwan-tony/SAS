package kr.co.sas.user.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "user")
@Schema(description = "일반 회원")
public class UserDTO {
	@Schema(description = "일반 회원 번호", type = "int")
	private int userNo;
	@Schema(description = "일반 회원 아이디", type = "string")
	private String userId;
	@Schema(description = "일반 회원 비밀번호", type = "string")
	private String userPw;
	@Schema(description = "일반 회원 전화번호", type = "string")
	private String userPhone;
	@Schema(description = "일반 회원 이메일", type = "string")
	private String userEmail;
	@Schema(description = "일반 회원 성별", type = "string")
	private String userGender;
	@Schema(description = "일반 회원 생년월일", type = "string")
	private String userBirth;
	@Schema(description = "일반 회원 닉네임", type = "string")
	private String userNickname;
	@Schema(description = "일반 회원 이름", type = "string")
	private String userName;
	@Schema(description = "일반 회원 프로필 사진 경로", type = "string")
	private String userPhoto;
	@Schema(description = "일반 회원 소셜로그인 여부", type = "int")
	private int loginType;
	
}
