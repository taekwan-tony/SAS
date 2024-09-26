package kr.co.sas.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.sas.review.model.dto.ReviewDTO;

@Mapper
public interface ReviewDao {

	List<ReviewDTO> getAllReview(String storeId);

	ReviewDTO getReviewNo(int reviewNo);

	List getReviewinfo(int storeNo);

	List<ReviewDTO> getReviewsByStoreNo(int storeNo);

	int insertReview(ReviewDTO review);
	int insertReviewAnswer(ReviewDTO review);
	
}
