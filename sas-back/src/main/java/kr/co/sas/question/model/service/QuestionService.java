package kr.co.sas.question.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.question.model.dao.QuestionDao;
import kr.co.sas.question.model.dto.QuestionDTO;
import kr.co.sas.question.model.dto.QuestionFile;

@Service
public class QuestionService {
	@Autowired
	private QuestionDao questionDao;

	public Map selectAllquestion(int reqPage, int questionWriterType) {
		
		return null;
	}
	
	
}
