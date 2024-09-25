package kr.co.sas.review.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.review.model.dto.ReviewDTO;
import kr.co.sas.review.model.service.ReviewService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/review")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	// 모든 리뷰 가져오기
    @GetMapping(value="/allList")
    public List<ReviewDTO> getAllReview() {
        return reviewService.getAllReview();
    }

    // 리뷰 번호로 특정 리뷰 가져오기 (관리자용)
//    @GetMapping("/{reviewNo}")
//    public ReviewDTO getReviewNo(@PathVariable int reviewNo) {
//        return reviewService.getReviewNo(reviewNo);
//    }
    //소비자리뷰등록
    @PostMapping("/usermain/mypage/myreview")
    public ResponseEntity<Integer> insertReview(@ModelAttribute ReviewDTO review){
    	int result = reviewService.insertReview(review);
    	return ResponseEntity.ok(result);
    }
  }
 

