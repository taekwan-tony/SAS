package kr.co.sas.favorite.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.favorite.model.dao.FavoriteDao;
import kr.co.sas.favorite.model.dto.FavoriteDTO;

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
}
