package kr.co.sas.util;

import org.springframework.stereotype.Component;

@Component
public class PageUtil {
	public PageInfo getPageInfo(int reqPage, int numPerPage,int pageNaviSize,int totalCount) {
		int end = numPerPage*reqPage;
		int start = end - numPerPage +1 ;
		int totalPage = (int)Math.ceil(totalCount/(double)numPerPage);
		int pageNo = ((reqPage-1)/pageNaviSize)*pageNaviSize +1;
		PageInfo pi = new PageInfo(start, end, pageNo, pageNaviSize, totalPage);
		return pi;
	}
}
