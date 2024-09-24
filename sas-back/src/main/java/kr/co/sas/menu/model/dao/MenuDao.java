package kr.co.sas.menu.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuDao {

	List selectMenuList();

}
