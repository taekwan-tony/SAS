package kr.co.sas.review.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.review.model.dao.ReviewDao;

@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;
	
}
