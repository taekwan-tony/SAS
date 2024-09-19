package kr.co.sas.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.notice.model.dao.NoticeDao;
import kr.co.sas.util.PageInfo;
import kr.co.sas.util.PageUtil;

@Service
public class NoticeService {
	@Autowired
	private NoticeDao noticeDao;
	@Autowired
	private PageUtil pageUtil;
	
	public Map selectNoticeList(int reqPage, int noticeType) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = noticeDao.totalCount(noticeType);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = noticeDao.selectNoticeList(pi,noticeType);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}
}
