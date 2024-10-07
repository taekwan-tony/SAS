package kr.co.sas.review.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.sas.review.model.dto.ReviewDTO;
import kr.co.sas.review.model.service.ReviewService;
import kr.co.sas.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/review")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	@Value("${file.root}")
	private String root;
	@Autowired
	private FileUtils fileUtil;
	// 모든 리뷰 가져오기
    @GetMapping(value="/allList/{storeId}")
    public List<ReviewDTO> getAllReview(@PathVariable String storeId) {
    	System.out.println(storeId);
        return reviewService.getAllReview(storeId);
    }
    @PatchMapping
    public int insertReviewAnswer(@RequestBody ReviewDTO review) {
    	return reviewService.insertReviewAnswer(review);
    }

    // 리뷰 번호로 특정 리뷰 가져오기 (관리자용)
//    @GetMapping("/{reviewNo}")
//    public ReviewDTO getReviewNo(@PathVariable int reviewNo) {
//        return reviewService.getReviewNo(reviewNo);
//    }
    //소비자리뷰등록
    @PostMapping("/usermain/mypage/myreview")
    public ResponseEntity<Integer> insertReview(@RequestBody ReviewDTO review){    	
    	int result = reviewService.insertReview(review);
    	return ResponseEntity.ok(result);
    }
    //소비자리뷰수정
    @PatchMapping("/usermain/mypage/updateReview")
    public ResponseEntity<Integer> modifyReview(@ModelAttribute ReviewDTO review){
    	System.out.println("리뷰로직 : " +review);
    	int result = reviewService.modifyReview(review);
    	return ResponseEntity.ok(result);
    }
    @DeleteMapping("/{reviewNo}")
    public ResponseEntity<Boolean> deleteReview(@PathVariable int reviewNo){
    	System.out.println(reviewNo);
    	boolean result = reviewService.deleteReview(reviewNo);
    	return ResponseEntity.ok(result);
    	
    }
    @GetMapping("/usermain/mypage/myreview/{reviewNo}")
    public ResponseEntity<ReviewDTO> selectOneReview(@PathVariable int reviewNo){
    	ReviewDTO selectReview = reviewService.selectOneReview(reviewNo);
    	//System.out.println("하나가져오는거"+reviewNo);
    	return ResponseEntity.ok(selectReview);
    }
    
    @PostMapping(value="/editorImage")
    public ResponseEntity<String> editorImage(@ModelAttribute MultipartFile image){
    	String savepath = root+"/editor";
    	String filepath = fileUtil.upload(savepath, image);
    	
    	return ResponseEntity.ok("/editor/"+filepath);
    }
    
	@GetMapping("/storeNo/{storeNo}/getReviewList")
	public ResponseEntity<List> getReviewList(@PathVariable int storeNo){
		String type = "store";
		List list = reviewService.getReviewList(storeNo, type);
//		System.out.println(list);
		return ResponseEntity.ok(list);
	}
	@GetMapping("/userNickname/{userNickname}/getReviewList")
	public ResponseEntity<List> getReviewList(@PathVariable String userNickname){
		String type = "user";
		List list = reviewService.getReviewList(userNickname, type);
		System.out.println("스토어이름찾기"+list);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value="/reviewReportList/{reqPage}")
	public ResponseEntity<Map> reviewReportList(@PathVariable int reqPage){
		Map map = reviewService.reviewReportList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	@PatchMapping(value="/reviewReportComp")
	public ResponseEntity<Integer> reviewReportComp(@RequestBody ReviewDTO review){
		int result = reviewService.reviewReportComp(review);
		return ResponseEntity.ok(result);
	}
 
	// 리뷰 신고 처리
	@PatchMapping("/report")
    public ResponseEntity<String> reportReview(@RequestBody ReviewDTO review) {
        int result = reviewService.reportReview(review);
        if (result > 0) {
            return ResponseEntity.ok("리뷰가 성공적으로 신고되었습니다.");
        } else {
            return ResponseEntity.status(500).body("리뷰 신고 처리 중 오류가 발생했습니다.");
        }
    }
	@PatchMapping("/adminReport")
	public ResponseEntity<String> reportReviewAdmin(@RequestBody ReviewDTO review) {
	    int result = reviewService.reportReviewAdmin(review);
	    if (result > 0) {
	        return ResponseEntity.ok("관리자 리뷰를 블러 처리했습니다.");
	    } else {
	        return ResponseEntity.status(500).body("리뷰 블러 처리 중 오류가 발생했습니다.");
	    }
	}
	

}

