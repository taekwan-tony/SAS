package kr.co.sas.favorite.model.service;

import java.util.List;

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
	public int updateFolderNo(int favoriteFolderNo) {
		int result = favoriteDao.updateFolderNo(favoriteFolderNo);
		return result;
	}

	@Transactional
	public int insertFavoriteFolder(FavoriteFolderDTO addFolder) {
		int result = favoriteDao.insertFavoriteFolder(addFolder);
		return result;
	}
}
