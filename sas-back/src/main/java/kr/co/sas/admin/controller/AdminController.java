package kr.co.sas.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.admin.model.service.AdminService;
import kr.co.sas.store.model.dto.StoreDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	
	@GetMapping(value="/storeList/{reqPage}/{storeType}")
	public ResponseEntity<Map> storeList(@PathVariable int reqPage,@PathVariable int storeType){
		Map map = adminService.selectApprovalStore(reqPage,storeType);
		return ResponseEntity.ok(map);
	}
	
	@PatchMapping(value="/approvalStore")
	public ResponseEntity<Integer> approvalStore(@ModelAttribute StoreDTO store){
		int result = adminService.approvalStore(store);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "/storeDetail/{storeNo}")
	public ResponseEntity<Map> storeDetail(@PathVariable int storeNo){
		Map map = adminService.storeDetail(storeNo);
		return ResponseEntity.ok(map);
	}
	
	@PatchMapping(value="/contractExpire/{storeNo}")
	public ResponseEntity<Integer> contractExpire(@PathVariable int storeNo){
		int result = adminService.contractExpire(storeNo);
		return ResponseEntity.ok(result);
	}

	@GetMapping(value="/storeReportLIst/{reqPage}")
	public ResponseEntity<Map> storeReportList(@PathVariable int reqPage){
		Map map = adminService.selectReportList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	@PatchMapping(value="/storeReportComp/{storeNo}")
	public ResponseEntity<Integer> storeReportComp(@PathVariable int storeNo){
		int result = adminService.storeReportComp(storeNo);
		return ResponseEntity.ok(result);
	}
}
