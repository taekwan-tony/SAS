package kr.co.sas.question.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.question.model.service.QuestionService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/question")
public class QuestionController {
	@Autowired
	private QuestionService questionService;
}
