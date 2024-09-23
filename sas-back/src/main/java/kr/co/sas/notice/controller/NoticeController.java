package kr.co.sas.notice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.sas.notice.model.dto.NoticeDTO;
import kr.co.sas.notice.model.service.NoticeService;
import kr.co.sas.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/notice")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	@Value("${file.root}")
	private String root;
	
	@Autowired
	private FileUtils fileUtil;
	
	@GetMapping(value="/list/{reqPage}/{noticeType}")
	public ResponseEntity<Map> list(@PathVariable int reqPage, @PathVariable int noticeType){
		Map map = noticeService.selectNoticeList(reqPage,noticeType);
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value="/editorImage")
	public ResponseEntity<String> editorImage(@ModelAttribute MultipartFile image){
		String savepath = root + "/editor/";
		String filepath = fileUtil.upload(savepath, image);
		System.out.println(filepath);
		return ResponseEntity.ok("/editor/"+filepath);
	}
	
	@PostMapping(value="/write")
	public ResponseEntity<Integer> insertNotice(@ModelAttribute NoticeDTO notice){
		int result = noticeService.insertNotice(notice);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="/detail/{noticeNo}/{noticeType}")
	public ResponseEntity<Map> view(@PathVariable int noticeNo,@PathVariable int noticeType){
		Map map = noticeService.selectOneNotice(noticeNo,noticeType);
		return ResponseEntity.ok(map);
	}
	
	@DeleteMapping(value="/delete/{noticeNo}")
	public ResponseEntity<Integer> delete(@PathVariable int noticeNo){
		int result = noticeService.deleteNotice(noticeNo);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="/selectOne/{noticeNo}")
	public ResponseEntity<NoticeDTO> selectOneNotice(@PathVariable int noticeNo){
		NoticeDTO notice = noticeService.selectOneNotice(noticeNo);
		return ResponseEntity.ok(notice);
	}

	@PatchMapping(value="/modify")
	public ResponseEntity<Integer> modify(@ModelAttribute NoticeDTO notice){
		int result = noticeService.updateNotice(notice);
		return ResponseEntity.ok(result);
	}
}
