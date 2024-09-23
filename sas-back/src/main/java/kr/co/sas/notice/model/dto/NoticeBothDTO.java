package kr.co.sas.notice.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="noticeBoth")
public class NoticeBothDTO {
	private int noticeNo;
	private int prevNo;
	private String prevTitle;
	private int nextNo;
	private String nextTitle;
}
