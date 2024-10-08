package kr.co.sas.store.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.seat.model.dto.SeatDTO;
import kr.co.sas.store.model.dto.FavoriteStoreInfoDTO;
import kr.co.sas.store.model.dto.StoreAmenitiesDTO;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.store.model.dto.StoreFileDTO;
import kr.co.sas.store.model.dto.StoreMoodDTO;
import kr.co.sas.store.model.dto.StorePaymentDTO;
import kr.co.sas.util.PageInfo;

@Mapper
public interface StoreDao {

	
	StoreDTO checkEmail(String soEmail);

	int insertStoreOwner(StoreDTO store);

	int totalCount(int storeType);

	List selectApprovalStore(PageInfo pi,int storeType);

	StoreDTO getStoreinfo(int storeNo, int userNo);
	
	StoreDTO selectOneApprovalStore(int storeNo);

	int approvalStore(StoreDTO store);

	StoreDTO searchStoreOwner(String soEmail);

	int changePw(StoreDTO store);
	
	List selectAllPayStore();

	List selectAllstore(String keyword, String[] keywordList);
	
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

	StoreDTO checkBusinessNumber(long num);

	StoreDTO storeEmailselect(int storeNo);

	List kakaoMapStore();
	
	List selectStorePayList(int storeNo);

	FavoriteStoreInfoDTO selectStoreFavorite(int storeNo);
	
	StorePaymentDTO storeMonthPayCount(StoreDTO store);

	int insertStoreMonthPay(StorePaymentDTO storePay);

	StoreDTO selectOneSoEmail(int storeNo);
	
	int storePaySuccess(int storePayNo);

	StorePaymentDTO currentYearSales();

	int selectNewStoreCount();
	
	StoreDTO storeView(int storeNo);

	int storeModify(StoreDTO store);

	int updateSeat(SeatDTO seat);

	int updateStoreFile(StoreFileDTO storeFile);

	int updateStoreMood(StoreMoodDTO mood);

	int deleteStoreMood(int storeNo);

	int deleteStoreAmenities(int storeNo);

	List<String> yearData();

	List yearSalesBarChart(int salesValue, String yearValue);


	List<StoreFileDTO> selectStoreFile(int[] delStoreFileNo);

	int deleteStoreFile(int[] delStoreFileNo);


	List selectOneStore();



	List salesDetailList(String startDateValue, String endDateValue, String keyword, int orderBy);

	Map<String, Object> totalSales(String startDateValue, String endDateValue, String keyword);

	List selectBest1();

	List selectBest2();

	List selectBest3();

	List selectBest4();

	StoreDTO searchStoreOwner1(int storeNo);
	
	




}
