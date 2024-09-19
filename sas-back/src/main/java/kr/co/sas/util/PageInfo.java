package kr.co.sas.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



//page가 필요하면 가져다 쓰기 위해 pageUtil,pageInfo 클래스 생성
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PageInfo {
	private int start;
	private int end;
	private int pageNo;
	private int pageNaviSize;
	private int totalPage;
}
