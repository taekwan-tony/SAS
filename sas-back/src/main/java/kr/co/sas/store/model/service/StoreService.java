package kr.co.sas.store.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.store.model.dao.StoreDao;
import kr.co.sas.store.model.dto.StoreDTO;

@Service
public class StoreService {
	@Autowired
	private StoreDao storeDao;

	
	public boolean checkEmail(String soEmail) {
		StoreDTO store = storeDao.checkEmail(soEmail);
		return (store==null);
	}//checkEmail


	@Transactional
	public int insertStoreOwner(StoreDTO store) {
		int result = storeDao.insertStoreOwner(store);
		return result;
	}//insertStoreOwner


	@Transactional
	public int insertStore(StoreDTO store) {
		int result = storeDao.insertStore(store); //매장 사업자번호를 가져와서 점주 등록 정보를 수정
		return result;
	}//insertStore
}
