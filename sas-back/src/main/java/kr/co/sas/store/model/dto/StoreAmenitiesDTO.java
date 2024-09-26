package kr.co.sas.store.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "storeAmenities")
public class StoreAmenitiesDTO {
	private int saNo;
	private String amenities;
	private int storeNo;
}
