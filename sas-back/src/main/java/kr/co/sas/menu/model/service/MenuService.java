package kr.co.sas.menu.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.sas.menu.model.dao.MenuDao;

@Service
public class MenuService {
	@Autowired
	private MenuDao menuDao;

	public List selectMenuList() {
		List list = menuDao.selectMenuList();
		return list;
	}
}
