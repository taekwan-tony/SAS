package kr.co.sas.reservation.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="pay")
@Schema(description = "예약 결제 정보")
public class PaymentDTO {
	@Schema(description = "결제 번호", type="int")
	private int payNo;
	@Schema(description = "결제 날짜", type="date")
	private Date payDate;
	@Schema(description = "결제수단-아마 카드", type="string")
	private String payMethod;
	@Schema(description = "예약 코드", type="int")
	private int reserveNo;
	@Schema(description = "결제 코드", type="string")
	private String payCode;
	@Schema(description = "가격", type="int")
	private int payPrice;
}
