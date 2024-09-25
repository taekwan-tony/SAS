package kr.co.sas.seat.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "seat")
public class SeatDTO{
	private int seatNo;
	private int seatCapacity;
	private int seatAmount;
	private int storeNo;

}
