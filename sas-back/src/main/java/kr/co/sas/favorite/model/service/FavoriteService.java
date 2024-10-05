package kr.co.sas.favorite.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.favorite.model.dao.FavoriteDao;
import kr.co.sas.favorite.model.dto.FavoriteDTO;
import kr.co.sas.favorite.model.dto.FavoriteFolderDTO;

@Service
public class FavoriteService {
	@Autowired
	private FavoriteDao favoriteDao;
	@Transactional
	public int deleteFavorite(int storeNo, int userNo) {
		// TODO Auto-generated method stub
		int result = favoriteDao.deleteFavorite(storeNo, userNo);
		return result;
	}
	

	@Transactional
	public int insertFavorite(FavoriteDTO favorite) {
		int result = favoriteDao.insertFavorite(favorite);
		return result;
	}


	public List selectFavoriteFolder(int userNo) {
		List list = favoriteDao.selectFavoriteFolder(userNo);
		return list;
	}




	@Transactional
	public int insertFavoriteFolder(FavoriteFolderDTO addFolder) {
		int result = favoriteDao.insertFavoriteFolder(addFolder);
		return result;
	}

	@Transactional
	public int updateFolderNo(FavoriteDTO changeFolder) {
		int favoriteNo = favoriteDao.getFavoriteNo(changeFolder);
		System.out.println(favoriteNo);
		changeFolder.setFavoriteNo(favoriteNo);
		int result = favoriteDao.updateFolderNo(changeFolder);
		return result;
	}


	public boolean checkDuplicate(int userNo, String favoriteFolderName) {
		int favoriteFolderCount = favoriteDao.countSameName(userNo, favoriteFolderName);
		return favoriteFolderCount==0;
	}
}
