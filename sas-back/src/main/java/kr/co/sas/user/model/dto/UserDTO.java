package kr.co.sas.user.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "user")
public class UserDTO {
	private int userNo;
	private String userId;
	private String userPw;
	private String userPhone;
	private String userEmail;
	private String userGender;
	private String userBirth;
	private String userNickName;
	private String userName;
	private String userPhoto;
	private int loginType;
}
