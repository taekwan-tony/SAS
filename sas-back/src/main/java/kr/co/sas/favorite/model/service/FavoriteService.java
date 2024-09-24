package kr.co.sas.favorite.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.favorite.model.dao.FavoriteDao;

@Service
public class FavoriteService {
	@Autowired
	private FavoriteDao favoriteDao;
}
