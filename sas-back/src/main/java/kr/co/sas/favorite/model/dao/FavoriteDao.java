package kr.co.sas.favorite.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.favorite.model.dto.FavoriteDTO;
import kr.co.sas.favorite.model.dto.FavoriteFolderDTO;

@Mapper
public interface FavoriteDao {

	int deleteFavorite(int storeNo, int userNo);

	int insertStandardFavorieFolder();

	int insertFavorite(FavoriteDTO favorite);

	List selectFavoriteFolder(int userNo);


	int insertFavoriteFolder(FavoriteFolderDTO addFolder);

	int getFavoriteNo(FavoriteDTO changeFolder);

	int updateFolderNo(FavoriteDTO changeFolder);

}
