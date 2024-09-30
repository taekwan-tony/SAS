package kr.co.sas.menu.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.menu.model.dao.MenuDao;
import kr.co.sas.menu.model.dto.MenuDTO;
import kr.co.sas.store.model.dao.StoreDao;
import kr.co.sas.store.model.dto.StoreDTO;

@Service
public class MenuService {
	@Autowired
	private MenuDao menuDao;
	@Autowired
	private StoreDao storeDao;
	
	
	@Transactional
	public int insertStoreMenu(MenuDTO menu, int storeNo) {
		int result = menuDao.insertStoreMenu(menu, storeNo);
		return result;
	}//insertStoreMenu
}
