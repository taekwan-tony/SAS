package kr.co.sas.store.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.seat.model.dto.SeatDTO;
import kr.co.sas.store.model.dto.StoreAmenitiesDTO;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.store.model.dto.StoreFileDTO;
import kr.co.sas.store.model.dto.StoreMoodDTO;
import kr.co.sas.util.PageInfo;

@Mapper
public interface StoreDao {

	
	StoreDTO checkEmail(String soEmail);

	int insertStoreOwner(StoreDTO store);

	int insertStore(StoreDTO store);

	int totalCount(int storeType);

	List selectApprovalStore(PageInfo pi,int storeType);

	StoreDTO getStoreinfo(int storeNo, int userNo);
	StoreDTO selectOneApprovalStore(int storeNo);

	int approvalStore(StoreDTO store);

	StoreDTO searchStoreOwner(String soEmail);

	int changePw(StoreDTO store);
	
	List selectAllPayStore();

	List selectAllstore();
	
	StoreDTO checkPw(StoreDTO store);

	StoreDTO selectOneStoreInfo(int storeNo);
	
	int insertStoreFrm(StoreDTO store);

	int insertStoreFile(StoreFileDTO storeFile);

	int insertStoreMood(int storeNo, List<String> storeMood);

	int insertSeat(SeatDTO seat);

	int contractExpire(int storeNo);

	StoreDTO getStoreReserveInfo(int storeNo);
	
	int insertStoreMood(StoreMoodDTO storeMood);

	int insertStoreAmenities(StoreAmenitiesDTO amenities);

	StoreDTO checkBusinessNumber(int businessNumber);

	StoreDTO storeEmailselect(int storeNo);

	List kakaoMapStore();


}
