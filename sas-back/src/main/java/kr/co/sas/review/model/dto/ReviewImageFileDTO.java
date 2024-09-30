package kr.co.sas.review.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="reviewImage")
public class ReviewImageFileDTO {
	private  int reviewImageNo;
	private String reviewImageFilename;
	private String reviewImageFilepath;
	private int reviewNo;

}
