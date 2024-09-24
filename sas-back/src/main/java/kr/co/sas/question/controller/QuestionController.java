package kr.co.sas.question.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import kr.co.sas.question.model.dto.QuestionDTO;
import kr.co.sas.question.model.dto.QuestionFile;
import kr.co.sas.question.model.service.QuestionService;
import kr.co.sas.user.model.dto.UserDTO;
import kr.co.sas.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/question")
public class QuestionController {
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private FileUtils fileUtils;
	@Value("${file.root}")
	private String root;
	
	
	@GetMapping(value="/list/{reqPage}/{questionWriterType}")
	public ResponseEntity<Map> questionList(@PathVariable int reqPage,@PathVariable int questionWriterType){
		Map map = questionService.selectAllquestion(reqPage,questionWriterType);
		
		return ResponseEntity.ok(map);
	}
	
}
