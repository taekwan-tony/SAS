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
    
    @Transactional
	public int insertReview(ReviewDTO review) {
		int result = reviewDao.insertReview(review);
		return result;
	}


    @Transactional
	public int insertReviewAnswer(ReviewDTO review) {
		return reviewDao.insertReviewAnswer(review);
	}
}
