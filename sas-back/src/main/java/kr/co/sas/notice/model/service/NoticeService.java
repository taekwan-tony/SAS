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
import kr.co.sas.store.model.dto.StoreDTO;
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
	@Transactional
	public int storePayNotice(List<StoreDTO> list) {
		int result = 0;
		for(StoreDTO store : list) {
			NoticeDTO notice = new NoticeDTO();
			notice.setNoticeTitle("[결제 알림]이번달 결제 요청드립니다.");
			notice.setSoEmail(store.getSoEmail());
			notice.setNoticeContent("<h1>안녕하세요. Spoon & Smiles 입니다. </h1>"
							+"<h3> <span style='color:red;'>사이트에 결제 내용 참고 바라며, 결제일 5일 이후 미결제시 계약 종료 예정입니다.</span> </h3>");
			result += noticeDao.insertNotice(notice);
		}
		return result;
	}
}
