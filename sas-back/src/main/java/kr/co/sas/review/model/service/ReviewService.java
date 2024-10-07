package kr.co.sas.review.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.notice.model.dao.NoticeDao;
import kr.co.sas.notice.model.dto.NoticeDTO;
import kr.co.sas.review.model.dao.ReviewDao;
import kr.co.sas.review.model.dto.ReviewDTO;
import kr.co.sas.util.PageInfo;
import kr.co.sas.util.PageUtil;

@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;
	@Autowired
	private PageUtil pageUtil;
	@Autowired
	private NoticeDao noticeDao;
	
    public List<ReviewDTO> getAllReview(String storeId) {
    	if (storeId != null) {
    		return reviewDao.getAllReview(storeId);
        } else {
        	return null;    
        }
    }
    
    //리뷰등록
    @Transactional
	public int insertReview(ReviewDTO review) {
		int result = reviewDao.insertReview(review);
		return result;
	}
    //리뷰수정
    @Transactional
	public int modifyReview(ReviewDTO review) {
		int result = reviewDao.modifyReview(review);
		return result;
	}

	public List getReviewList(Object parameter, String type) {
		List list = reviewDao.getReviewList(parameter, type);
		System.out.println("닉네임 : "+parameter);
		System.out.println(list);
		return list;
	}


    @Transactional
	public int insertReviewAnswer(ReviewDTO review) {
		return reviewDao.insertReviewAnswer(review);
	}


	public ReviewDTO getReviewNo(int reviewNo) {
		// TODO Auto-generated method stub
		return null;
	}

	public Map reviewReportList(int reqPage) {
		int numPerPage = 12;
		int pageNaviSize = 5;
		int totalCount = reviewDao.totalCount();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = reviewDao.reviewReportList(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int reviewReportComp(ReviewDTO review) {
		int result = reviewDao.reviewReportComp(review);
		NoticeDTO notice = new NoticeDTO();
		notice.setSoEmail(review.getUserNickname());
		notice.setNoticeTitle("[리뷰삭제]"+review.getStoreName()+"매장 리뷰 삭제안내");
		notice.setNoticeContent("매장 요청에 따른 리뷰 신고가 접수되었습니다.<br> 검토 결과 리뷰문제가 있어 삭제처리 진행하였습니다.<br> 리뷰 내용 <br> "+review.getReviewContent()+"<br>");
		notice.setNoticeType(1);
		result += noticeDao.insertNotice(notice);
		return result;
	}
	public ReviewDTO selectOneReview(int reviewNo) {
		ReviewDTO selectReview = reviewDao.selectOneReview(reviewNo);
		return selectReview;
	}
	//리뷰삭제
	@Transactional
	public boolean deleteReview(int reviewNo) {
		int  result = reviewDao.deleteReview(reviewNo);
		return result == 1;
		
	}

	
	// 리뷰 신고 처리
    @Transactional
    public int reportReview(ReviewDTO review) {
        // 리뷰 타입을 2로 업데이트 (신고 상태로 변경)
        int result1 = reviewDao.updateReviewReport(review.getReviewNo());
        
        // 신고 사유 저장
        int result2 = reviewDao.updateReviewReportContent(review);
        
        return result1 + result2; // 둘 다 성공했을 때만 1+1=2
    }
    @Transactional
    public int reportReviewAdmin(ReviewDTO review) {
        int result = reviewDao.updateReviewReportAdmin(review.getReviewNo());
        return result;
    }

}
