package kr.co.sas.store.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="favoriteStore")
public class FavoriteStoreInfoDTO {
	@Schema(description = "매장 이름", type="string")
	private String storeName;
	@Schema(description = "매장 별점 평균", type="double")
	private double reviewScoreAvg;
	@Schema(description = "매장 영업시간", type="string")
	private String storeTime;
	@Schema(description = "매장 주소", type="string")
	private String storeAddr;
	@Schema(description = "매장 설명", type="string")
	private String storeIntroduce;
}
