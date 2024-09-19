package kr.co.sas.notice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.notice.model.service.NoticeService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/notice")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	@GetMapping(value="/list/{reqPage}/{noticeType}")
	public ResponseEntity<Map> list(@PathVariable int reqPage, @PathVariable int noticeType){
		Map map = noticeService.selectNoticeList(reqPage,noticeType);
		return ResponseEntity.ok(map);
	}

}
