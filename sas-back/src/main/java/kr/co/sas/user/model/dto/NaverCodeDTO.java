package kr.co.sas.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class NaverCodeDTO {
	private String code;
	private String state;
	private String error;
	private String error_description;
	private String clientId;
	private String clientSecret;
}
