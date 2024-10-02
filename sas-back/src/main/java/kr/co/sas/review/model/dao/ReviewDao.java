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

	int modifyReview(ReviewDTO review);

	List getReviewList(Object parameter, String type);
	
	int insertReviewAnswer(ReviewDTO review);

<<<<<<< HEAD
	ReviewDTO selectOneReview(int reviewNo);

	int deleteReview(int reviewNo);
=======
	int updateReviewReport(int reviewNo);

	int updateReviewReportContent(ReviewDTO review);
>>>>>>> Testsas2
	

}
