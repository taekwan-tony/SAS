package kr.co.sas.reservation.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "reservation")
public class ReservationDTO {
	private int reserveNo;
	private Date reserveDate;
	private int reservePayStatus;
	private int reserveStatus;
	private int reservePeople;
	private int storeNo;
	private String storeName;
	private int seatNo;
	private String userId;
	private String reserveEnrollDate;
	private String userName;
}
