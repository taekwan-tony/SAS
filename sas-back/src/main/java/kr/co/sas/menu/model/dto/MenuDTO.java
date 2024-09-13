package kr.co.sas.menu.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "menu")
public class MenuDTO {
	private int menuNo;
	private String menuName;
	private String menuPhoto;
	private String menuInfo;
	private int menuPrice;
	private int storeNo;
}
