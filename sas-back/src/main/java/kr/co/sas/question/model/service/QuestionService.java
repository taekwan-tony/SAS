package kr.co.sas.question.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.question.model.dao.QuestionDao;
import kr.co.sas.question.model.dto.QuestionDTO;
import kr.co.sas.question.model.dto.QuestionFile;
import kr.co.sas.util.PageInfo;
import kr.co.sas.util.PageUtil;

@Service
public class QuestionService {
	@Autowired
	private QuestionDao questionDao;
	@Autowired
	private PageUtil pageUtil;
	
	public Map selectAllquestion(int reqPage, int questionWriterType) {
		int numPerPage = 12;
		int pageNaviSize = 5;
		int totalCount = questionDao.totalCount(questionWriterType);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = questionDao.selectQuestionList(pi,questionWriterType);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi",pi);
		return map;
	}
	
	
}
