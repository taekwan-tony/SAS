package kr.co.sas.favorite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.sas.favorite.model.dto.FavoriteDTO;
import kr.co.sas.favorite.model.dto.FavoriteFolderDTO;
import kr.co.sas.favorite.model.service.FavoriteService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/favorite")
@Tag(name="FAVORITE", description = "FAVORITE API")
public class FavoriteController {
	@Autowired
	private FavoriteService favoriteService;
	
	@Operation(summary = "즐겨찾기 삭제1", description = "매장에서 즐겨찾기 삭제-즐겨찾기 번호가 없으므로 매장번호와 유저번호를 받아서 해당하는 즐겨찾기 목록을 찾아서 삭제")
	@DeleteMapping(value="/storeNo/{storeNo}/userNo/{userNo}")
	public ResponseEntity<Boolean> deleteFavorite(@PathVariable int storeNo, @PathVariable int userNo){
		int result = favoriteService.deleteFavorite(storeNo, userNo);
		return ResponseEntity.ok(result>0);
	}
	
	@Operation(summary = "즐겨찾기 등록", description = "매장에서 즐겨찾기 등록-우선 즐겨찾기 목록을 '기본 폴더'로 받고 등록")
	@PostMapping(value="/storeNo/{storeNo}/userNo/{userNo}")
	public ResponseEntity<Boolean> insertFavorite(@RequestBody FavoriteDTO favorite){
		int result = favoriteService.insertFavorite(favorite);
		return ResponseEntity.ok(result>0);
	}
	
	@Operation(summary = "즐겨찾기 목록 가져오기", description = "유저번호를 받아 즐겨찾기 목록 폴더 리스트 가져오기")
	@GetMapping(value="/userNo/{userNo}/getFavoriteFolder")
	public ResponseEntity<List> selectFavoriteFolder(@PathVariable int userNo){
		List list = favoriteService.selectFavoriteFolder(userNo);
		return ResponseEntity.ok(list);
	}
	@Operation(summary = "즐겨찾기 목록 이동", description = "즐겨찾기 등록 직후 즐겨찾기 폴더를 이동시킬 경우 폴더 번호만 받아서 업데이트")
	@PatchMapping(value="/favoriteFolderNo/{favoriteFolderNo}/changeFolder")
	public ResponseEntity<Boolean> updateFolderNo(@PathVariable int favoriteFolderNo){
		int result = favoriteService.updateFolderNo(favoriteFolderNo);
		return ResponseEntity.ok(result>0);
	}
	
	@Operation(summary="즐겨찾기 목록 추가", description = "즐겨찾기 목록 이름과 회원 번호를 객체로 받아 즐겨찾기 폴더 추가")
	@PostMapping(value="/insertFavoriteFolder")
	public ResponseEntity<Boolean> insertFavoriteFolder(@RequestBody FavoriteFolderDTO addFolder){
		System.out.println(addFolder);
		int result = favoriteService.insertFavoriteFolder(addFolder);
		return ResponseEntity.ok(result>0);
	}
}
