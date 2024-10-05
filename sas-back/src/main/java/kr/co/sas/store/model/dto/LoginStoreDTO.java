package kr.co.sas.store.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginStoreDTO {
	private String accessToken;
	private String refreshToken;
	private String soEmail;
	private int type;
	private int storeNo;
	private String storeName;
	private String soName;
	private String soPhone;
	private String storeAddr;
}
