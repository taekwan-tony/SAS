package kr.co.sas.store.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "storePayment")
public class StorePaymentDTO {
	private int storePayNo;
	private int storeNo;
	private String storePayMethod;
	private String storePayDate;
	private int storeTotalPrice;
	private int storePayStatus;
	private String storePayRequestDate;
	private int storeTotalUsingCount;
}
