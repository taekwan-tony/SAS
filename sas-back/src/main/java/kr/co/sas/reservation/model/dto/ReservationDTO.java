package kr.co.sas.reservation.model.dto;



import java.sql.Date;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
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
	@Schema(description = "예약일정일 문자열변환", type="string")
	private String reserveDateString;
	@Schema(description = "예약 시간", type="string")
	private String reserveTime;
	@Schema(description="예약금-객체 가져올때 사용용...", type="int")
	private int payPrice;
	@Schema(description="해당시간 예약된 좌석수", type="int")
	private int seatAmount;
}
