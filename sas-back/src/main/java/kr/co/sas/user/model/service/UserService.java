package kr.co.sas.user.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.user.model.dao.UserDao;
import kr.co.sas.user.model.dto.UserDTO;

@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	private BCryptPasswordEncoder encoder;

	@Transactional
	public int insertUser(UserDTO user) {
		System.out.println(user.getUserPw());
		user.setUserPw(encoder.encode(user.getUserPw()));
		System.out.println(user.getUserPw());
		int result = userDao.insertUser(user);
		return result;
	}

	public boolean checkId(String userId) {
		UserDTO user = userDao.searchUser(userId);
		return (user==null);
	}
	
}
