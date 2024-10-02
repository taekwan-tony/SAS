package kr.co.sas.menu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import kr.co.sas.menu.model.dto.MenuDTO;
import kr.co.sas.menu.model.service.MenuService;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/menu")
public class MenuController {
	@Autowired
	private MenuService menuService;
	
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	@Operation(summary = "매장 메뉴 등록 리스트")
	@GetMapping(value = "/allMenuList/{loginStoreNo}")
	public ResponseEntity<List> allMenuList(@PathVariable int loginStoreNo){
		List list = menuService.allMenuList(loginStoreNo);
		return ResponseEntity.ok(list);
	}
	
	@Operation(summary = "매장 메뉴 등록")
	@PostMapping(value = "insertStoreMenu/{storeNo}")
	public ResponseEntity<Boolean> insertStoreMenu (@ModelAttribute MenuDTO storeMenu, @ModelAttribute MultipartFile menuThumbnail) {
		
		System.out.println(storeMenu);
		System.out.println(menuThumbnail);
		
		if(menuThumbnail != null) {
			String savepath = root + "/store/storeMenu/";
			String filepath = fileUtil.upload(savepath, menuThumbnail);
			storeMenu.setMenuPhoto(filepath);
		}//if
		
		System.out.println(storeMenu);
		System.out.println(menuThumbnail);
		
		int result = menuService.insertStoreMenu(storeMenu);
		return ResponseEntity.ok(result > 0);
	}//insertStoreMenu

}

