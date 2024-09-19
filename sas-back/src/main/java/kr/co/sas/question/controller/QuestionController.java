package kr.co.sas.question.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping(value="/writeQuestionFrm")
	public String writeQuestionForm() {
		return "question/onebyoneFrm";
	}
	
	@PostMapping(value="/insertQuestion")
	public String insertQuestion(QuestionDTO q,MultipartFile[] upfile ,Model model) {
		String savepath = root+"/question/";
		List<QuestionFile> fileList = new ArrayList<QuestionFile>();
		if(!upfile[0].isEmpty()) {
			for(MultipartFile file : upfile) {
				QuestionFile qf = new QuestionFile();
				String filename = file.getOriginalFilename();
				String filepath = fileUtils.upload(savepath, file);
				qf.setFilename(filename);
				qf.setFilepath(filepath);
				fileList.add(qf);
			}
		}
		//int result = questionService.insertQuestion(q,fileList); 
		
		return "redirect:/Question/questionList?type=1&reqPage=1";
	}
	
	@ResponseBody
	@PostMapping(value="/editorImage" ,produces = "plain/text;charset=utf-8")
	public String editorImg(MultipartFile upfile) {
		String savepath = root+"/upload/editor/";
		String filepath = fileUtils.upload(savepath, upfile);
		return "/upload/editor/"+filepath;
	}
	
	@GetMapping(value="/questionList")
	public String questionList(@SessionAttribute(required=false) UserDTO user,int type,int reqPage,Model model) {
		int memberNo =41;
		
		String click =null;
		switch(type) {
		case 1 :
			click = "전체";
			break;
		case 2 : 
			click = "처리중";
			break;
		case 3 :
			click = "완료";
			break;
		}
		//QuestionListData qld = questionService.selectAllQuestion(memberNo,type,reqPage);
		
		return "question/questionList";
	}
	
	@GetMapping(value="/updateQuestionFrm")
	public String updateQuestionFrm(int questionNo,Model model) {
		
		return "question/updateQuestionFrm";
		
	}
	
	@PostMapping(value="/updateQuestion")
	public String updateQuestion(QuestionDTO q,MultipartFile[] upfile,int[] delFileNo,Model model) {
		List<QuestionFile> fileList = new ArrayList<QuestionFile>();
		String savepath = root+"/question/";
		if(!upfile[0].isEmpty()) {
			for(MultipartFile file : upfile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtils.upload(savepath, file);
				QuestionFile qf = new QuestionFile();
				qf.setFilename(filename);
				qf.setFilepath(filepath);
				qf.setQuestionNo(q.getQuestionNo());
				fileList.add(qf);
			}			
		}
		//q.setFileList(fileList);
		//List<QuestionFile> delFileList = questionService.updateQuestion(q,delFileNo);

		return null;
	}
	
	@GetMapping(value="/deleteQuestion")
	public String deleteQuestion(int questionNo,Model model) {
//		List<QuestionFile> delFileList = questionService.deleteQuestion(questionNo);
//		String savepath = root+"/question/";
//		if(delFileList ==null) {
//			model.addAttribute("title","삭제 실패");
//			model.addAttribute("msg","처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요");
//			model.addAttribute("icon","error");
//			model.addAttribute("loc","/Question/questionList?type=1&reqPage=1");
//			return "common/msg";
//		}else {
//			for(QuestionFile questionFile : delFileList) {
//				File delFile = new File(savepath+questionFile.getFilepath());
//				delFile.delete();
//			}
//			return "redirect:/Question/questionList?type=1&reqPage=1";
//		}
		return null;
	}
}
