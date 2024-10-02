package kr.co.sas.review.model.dto;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "review")
public class ReviewDTO {
	private int reviewNo;
	private String reviewContent;
	private Date reviewDate;
	private int reviewScore;
	private String userNickname;
	private int storeNo;
	private String reviewAnswer;
	private String reviewAnswerDate;
	private int reserveNo;
<<<<<<< HEAD
	private List<String> filepathList;
=======
	private int reviewType;
	private String reviewReportContent;
>>>>>>> Testsas2
}
