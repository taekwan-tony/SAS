package kr.co.sas.review.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.review.model.dao.ReviewDao;
import kr.co.sas.review.model.dto.ReviewDTO;

@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;
	
	// 모든 리뷰 가져오기 (관리자용)
    public List<ReviewDTO> getAllReview() {
        return reviewDao.getAllReview();
    }

    // 리뷰 번호로 특정 리뷰 가져오기 (관리자용)
    public ReviewDTO getReviewNo(int reviewNo) {
        return reviewDao.getReviewNo(reviewNo);
    }
}
