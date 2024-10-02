package kr.co.sas.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.sas.review.model.dto.ReviewDTO;
import kr.co.sas.util.PageInfo;

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

	int totalCount();

	List reviewReportList(PageInfo pi);

	int reviewReportComp(ReviewDTO review);
	
}
