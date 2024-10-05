package kr.co.sas.user.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.user.model.dto.UserDTO;
import kr.co.sas.util.PageInfo;

@Mapper
public interface UserDao {

	UserDTO searchUser(String userId);

	int insertUser(UserDTO user);

	String findId(UserDTO user);

	UserDTO findUserNo(UserDTO user);

	int updatePw(UserDTO user);

	UserDTO selectOneUser(int userNo);

	int updateUserPhoto(UserDTO user);

	UserDTO getUserInfoForPay(int userNo);


}
