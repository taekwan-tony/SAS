package kr.co.sas.menu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.sas.menu.model.service.MenuService;
import kr.co.sas.store.model.dto.StoreDTO;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/menu")
public class MenuController {
	@Autowired
	private MenuService menuService;

}

