package kr.co.sas.reservation.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="countReserve")
@Schema(description = "예약 등록 전 해당 시간에 자리가 있는지 판단하기 위한 DTO")
public class CountReserveDTO {
	@Schema(description = "해당 매장 특정 좌석 개수", type="int")
	private int seatAmount;
	@Schema(description="해당 매장 특정 시간에 예약된 특정 좌석 개수", type="int")
	private int reserveCount;
}
