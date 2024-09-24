package kr.co.sas.favorite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.sas.favorite.model.service.FavoriteService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/favorite")
@Tag(name="FAVORITE", description = "FAVORITE API")
public class FavoriteController {
	@Autowired
	private FavoriteService favoriteService;
}
