package kr.co.sas.notice.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "notice")
public class NoticeDTO {
	private int noticeNo;
	private String noticeTitle;
	private String noticeEnrollDate;
	private String noticeContent;
	private int noticeType;
}
