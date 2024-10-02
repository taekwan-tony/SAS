package kr.co.sas.review.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.review.model.dao.ReviewDao;
import kr.co.sas.review.model.dto.ReviewDTO;

@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;
	
	
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
}
