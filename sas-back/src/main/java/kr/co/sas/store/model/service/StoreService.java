package kr.co.sas.store.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.store.model.dao.StoreDao;

@Service
public class StoreService {
	@Autowired
	private StoreDao storeDao;
}
