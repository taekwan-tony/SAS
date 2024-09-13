package kr.co.sas.menu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.menu.model.service.MenuService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/menu")
public class MenuController {
	@Autowired
	private MenuService menuService;

}
