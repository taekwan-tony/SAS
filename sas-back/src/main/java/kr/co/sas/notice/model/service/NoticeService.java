package kr.co.sas.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.notice.model.dao.NoticeDao;
import kr.co.sas.notice.model.dto.NoticeBothDTO;
import kr.co.sas.notice.model.dto.NoticeDTO;
import kr.co.sas.util.PageInfo;
import kr.co.sas.util.PageUtil;

@Service
public class NoticeService {
	@Autowired
	private NoticeDao noticeDao;
	@Autowired
	private PageUtil pageUtil;
	
	public Map selectNoticeList(int reqPage, int noticeType) {
		int numPerPage = 12;
		int pageNaviSize = 5;
		int totalCount = noticeDao.totalCount(noticeType);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = noticeDao.selectNoticeList(pi,noticeType);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}

	@Transactional
	public int insertNotice(NoticeDTO notice) {
		int result = noticeDao.insertNotice(notice);
		return result;
	}

	public Map selectOneNotice(int noticeNo,int noticeType) {
		NoticeDTO notice = noticeDao.selectOneNotice(noticeNo);
		if(noticeType==0) {
			notice.setNoticeType(noticeType);
		}
		NoticeBothDTO noticeBoth = noticeDao.selectBothNotice(notice);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("notice", notice);
		map.put("noticeBoth", noticeBoth);
		return map;
	}

	@Transactional	
	public int deleteNotice(int noticeNo) {
		int result = noticeDao.deleteNotice(noticeNo);
		return result;
	}

	public NoticeDTO selectOneNotice(int noticeNo) {
		NoticeDTO notice = noticeDao.selectOneNotice(noticeNo);
		return notice;
	}

	@Transactional
	public int updateNotice(NoticeDTO notice) {
		int result = noticeDao.updateNotice(notice);
		return result;
	}
}
