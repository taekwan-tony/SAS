package kr.co.sas.review.model.dto;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
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
	private String storeName;
	private String reviewAnswer;
	private String reviewAnswerDate;
	private int reserveNo;
	private int reviewType;
	private String reviewReportContent;
	private String soName;
	private List<String> filepathList;
	@Schema(description = "매장 사진", type="string")
	private String storeImage;
	private String userPhoto;
}
