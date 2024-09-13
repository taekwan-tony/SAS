package kr.co.sas.question.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.question.model.dao.QuestionDao;

@Service
public class QuestionService {
	@Autowired
	private QuestionDao questionDao;
}
