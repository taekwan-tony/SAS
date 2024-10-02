package kr.co.sas.menu.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.menu.model.dto.MenuDTO;

@Mapper
public interface MenuDao {

	List getMenuinfo(int storeNo);

	int insertStoreMenu(MenuDTO menu);

	List allMenuList(int loginStoreNo);

	int deleteStoreMenu(int menuNo);

}
