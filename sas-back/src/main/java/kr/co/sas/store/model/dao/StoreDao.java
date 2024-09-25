package kr.co.sas.store.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.util.PageInfo;

@Mapper
public interface StoreDao {

	
	StoreDTO checkEmail(String soEmail);

	int insertStoreOwner(StoreDTO store);

	int insertStore(StoreDTO store);

	int totalCount(int storeType);

	List selectApprovalStore(PageInfo pi,int storeType);

	StoreDTO getStoreinfo(int storeNo);
	StoreDTO selectOneApprovalStore(int storeNo);

	int approvalStore(StoreDTO store);

	StoreDTO searchStoreOwner(String soEmail);

	int changePw(StoreDTO store);
	
	List selectAllPayStore();


}
