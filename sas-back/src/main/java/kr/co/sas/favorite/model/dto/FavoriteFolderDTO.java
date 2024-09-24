package kr.co.sas.favorite.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="favoriteFolder")
@Schema(description = "즐겨찾기 폴더")
public class FavoriteFolderDTO {
	@Schema(description = "즐겨찾기 폴더 번호", type="int")
	private int favoriteFolderNo;
	@Schema(description="해당 즐겨찾기를 가지고 있는 유저 번호",type="int")
	private int userNo;
	@Schema(description = "즐겨찾기 폴더 이름", type="string")
	private String favoriteFolderName;
	@Schema(description = "즐겨찾기 폴더안에 있는 즐겨찾기 목록", type="list")
	private List<FavoriteDTO> favoriteList;
}
