package kr.co.sas.user.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.user.model.dao.UserDao;
import kr.co.sas.user.model.dto.UserDTO;

@Service
public class UserService {
	@Autowired
	private UserDao userDao;

	public int insertUser(UserDTO user) {
		// TODO Auto-generated method stub
		return 0;
	}
	
}
