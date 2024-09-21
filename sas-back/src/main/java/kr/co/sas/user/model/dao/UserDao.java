package kr.co.sas.user.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.user.model.dto.UserDTO;

@Mapper
public interface UserDao {

	UserDTO searchUser(String userId);

	int insertUser(UserDTO user);

	String findId(UserDTO user);

	UserDTO findUserNo(UserDTO user);

	int updatePw(UserDTO user);

}
