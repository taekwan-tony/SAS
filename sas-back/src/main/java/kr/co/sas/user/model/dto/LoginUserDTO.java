package kr.co.sas.user.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="loginUser")
public class LoginUserDTO {
	private String accessToken;
	private String refreshToken;
	private String userId;
	private int loginType;
	private int userNo;
	private String userNickname;
}
