package kr.co.sas.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.admin.model.service.AdminService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@GetMapping(value="/storeList/{reqPage}/{storeType}")
	public ResponseEntity<Map> list(@PathVariable int reqPage,@PathVariable int storeType){
		Map map = adminService.selectApprovalStore(reqPage,storeType);
		return ResponseEntity.ok(map);
	}

}
