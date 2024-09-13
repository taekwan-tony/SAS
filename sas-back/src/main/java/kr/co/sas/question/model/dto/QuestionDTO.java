package kr.co.sas.question.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "question")
public class QuestionDTO {
	private int questionNo;
	private String questionType;
	private String questionTitle;
	private String questionContent;
	private String questionAnswer;
	private String questionEmail;
	private String questionWriter;
	private int questionWriterType;
}
