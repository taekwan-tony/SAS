package kr.co.sas.weekcustomer.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("weekCustomerDTO")
public class WeekCustomerDTO {
	private String dayOfWeek;
	private int customerCount;
}
