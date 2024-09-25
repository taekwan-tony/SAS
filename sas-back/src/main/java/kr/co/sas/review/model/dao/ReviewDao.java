package kr.co.sas.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.review.model.dto.ReviewDTO;

@Mapper
public interface ReviewDao {

	List<ReviewDTO> getAllReview();

	ReviewDTO getReviewNo(int reviewNo);

}
