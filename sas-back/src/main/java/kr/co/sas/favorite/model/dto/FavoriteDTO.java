package kr.co.sas.favorite.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="favorite")
@Schema(description="일반 회원 즐겨찾기")
public class FavoriteDTO {
	@Schema(description = "즐겨찾기 번호", type="int")
	private int favoriteNo;
	@Schema(description = "즐겨찾기 폴더 번호", type="int")
	private int favoriteFolderNo;
	@Schema(description="매장 번호", type="int")
	private int storeNo;
}
