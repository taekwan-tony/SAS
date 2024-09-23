package kr.co.sas.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.store.model.dao.StoreDao;
import kr.co.sas.util.PageInfo;
import kr.co.sas.util.PageUtil;


@Service
public class AdminService {

	@Autowired
	private StoreDao storeDao;
	@Autowired
	private PageUtil pageUtil;
	
	
	public Map selectApprovalStore(int reqPage,int storeType) {
		int numPerPage = 12;
		int pageNaviSize = 5;
		int totalCount = storeDao.totalCount(storeType); 
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = storeDao.selectApprovalStore(pi,storeType);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi",pi);
		return map;
	}

}
