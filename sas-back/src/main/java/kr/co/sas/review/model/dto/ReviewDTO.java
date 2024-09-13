package kr.co.sas.review.model.dto;

import java.util.Date;

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
	private String userNickName;
	private int storeNo;
	private String reviewAnswer;
	private String reviewAnswerDate;
	private int reserveNo;
}
