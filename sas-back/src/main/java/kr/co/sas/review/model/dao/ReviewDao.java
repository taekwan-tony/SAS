package kr.co.sas.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReviewDao {

	List getReviewinfo(int storeNo);

}
