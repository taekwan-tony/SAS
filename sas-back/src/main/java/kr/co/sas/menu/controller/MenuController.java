package kr.co.sas.menu.controller;

import java.util.List;

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
	@PostMapping(value = "/insertStoreMenu/{storeNo}")
	public ResponseEntity<Boolean> insertStoreMenu (@ModelAttribute MenuDTO storeMenu, @ModelAttribute MultipartFile menuThumbnail) {
			
		// 기본 이미지 경로 설정
	    String defaultImagePath = "/image/s&s로고.png";
	    
	    if (menuThumbnail != null && !menuThumbnail.isEmpty()) {
	        // 사용자 업로드 이미지가 있을 때
	        String savepath = root + "/store/storeMenu/";
	        String filepath = fileUtil.upload(savepath, menuThumbnail);
	        storeMenu.setMenuPhoto(filepath);
	    } else {
	        // 업로드 이미지가 없을 때 기본 이미지로 설정
	        storeMenu.setMenuPhoto(defaultImagePath);
	    }
	    System.out.println("메뉴 등록 : " + storeMenu);
	    System.out.println("메뉴 사진 등록 : " + menuThumbnail);
	    // 메뉴 등록
	    int result = menuService.insertStoreMenu(storeMenu);
		return ResponseEntity.ok(result > 0);
	}//insertStoreMenu
	
	
	@Operation(summary = "매장 메뉴 삭제")
	@DeleteMapping(value = "/deleteStoreMenu/{menuNo}")
	public ResponseEntity<Integer> deleteStoreMenu(@PathVariable int menuNo) {
		int result = menuService.deleteStoreMenu(menuNo);
		return ResponseEntity.ok(result);
	}//deleteStornMenu
	
	
	@Operation(summary = "매장 메뉴 수정")
	@PatchMapping(value = "/updateStoreMenu/{menuNo}")
	public ResponseEntity<Boolean> updateStoreMenu(@ModelAttribute MenuDTO storeMenu, @ModelAttribute MultipartFile menuThumbnail) {
	    System.out.println("기존 메뉴 : " + storeMenu);
	    System.out.println("기존 메뉴 사진 : " + menuThumbnail);

	    // 새로운 메뉴 사진이 있으면 업데이트, 없으면 기존 사진 유지
	    if (menuThumbnail != null && !menuThumbnail.isEmpty()) {
	        String savepath = root + "/store/storeMenu/";
	        String filepath = fileUtil.upload(savepath, menuThumbnail);
	        storeMenu.setMenuPhoto(filepath); // 새로운 사진 경로 설정
	    } else {
	        // 메뉴 사진이 없으면 기존 경로 유지
	        MenuDTO existingMenu = menuService.getStoreMenuById(storeMenu.getMenuNo());
	        if (existingMenu != null) {
	            storeMenu.setMenuPhoto(existingMenu.getMenuPhoto()); // 기존 사진 경로 유지
	        }
	    }

	    System.out.println("메뉴 수정 : " + storeMenu);
	    System.out.println("메뉴 사진 수정 : " + menuThumbnail);

	    int result = menuService.updateStoreMenu(storeMenu);
	    return ResponseEntity.ok(result > 0);
	}


}

