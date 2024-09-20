package kr.co.sas.store.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.store.model.dto.StoreDTO;

@Mapper
public interface StoreDao {

	
	StoreDTO checkEmail(String soEmail);

	int insertStoreOwner(StoreDTO store);

}
