package kr.co.sas.favorite.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.favorite.model.dto.FavoriteDTO;

@Mapper
public interface FavoriteDao {

	int deleteFavorite(int storeNo, int userNo);

	int insertStandardFavorieFolder();

	int insertFavorite(FavoriteDTO favorite);

}
