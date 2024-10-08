package kr.co.sas.store.model.dto;


import java.sql.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.co.sas.seat.model.dto.SeatDTO;
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
	private String storeReStart;
	private String storeReEnd;
	private String storeTime;
	private String breakTimeStart;
	private String breakTimeEnd;
	private String storePhone;
	private int OneMaxPrice;
	private String storeAddr;
	private String soName;
	private String soPhone;
	private int storeClass;
	private int deposit;
	private int registType;
	private String storeIntroduce;
	private double mapX;
	private double mapY;
	private int type;
	private int servicePrice;
	private String storeRequestDate;
	private String storeEnrollDate;
	private String siFilepath;
	private int reportTotalCount;
	@Schema(description = "해당 회원이 즐겨찾기 했는지 여부", type="boolean")
	private boolean isFavorite;
	@Schema(description="해당 매장에서 등록한 좌석 정보 리스트", type="List")
	private List<SeatDTO> seatList;
	//민규가해놨음 문제될시수정함
	private List<StoreFileDTO> siFilepathList;
	private List<StoreAmenitiesDTO> storeAmenityList;
	//+
	private List<StoreMoodDTO> storeMoodList;
	private List<StoreFileDTO> storeSiFilepathList;
	private int[] delStoreFileNo;
}
