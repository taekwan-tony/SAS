package kr.co.sas.store.model.dto;


import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "store")
public class StoreDTO {
	private int storeNo;
	private String soEmail;
	private String soPw;
	private String businessNumber;
	private String storeName;
	private Date storeReStart;
	private Date storeReEnd;
	private String storeTime;
	private Date breakTimeStart;
	private Date breakTimeEnd;
	private String storePhone;
	private int OneMaxPrice;
	private String storeAddr;
	private String soName;
	private String soPhone;
	private int storeClass;
	private int deposit;
	private int registType;
	private String storeIntroduce;
	private int mapX;
	private int mapY;
	private int type;
	private int servicePrice;
	private String storeRequestDate;
	private String storeEnrollDate;
}
