package kr.co.sas.question.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuestionFile {
	private int QuestionFileNo;
	private String filename;
	private String filepath;
	private int questionNo;
}
