package kr.co.sas.store.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "storeFile")
public class StoreFileDTO {
	private int siFileNo;
	private String siFileName;
	private String siFilepath;
	private int storeNo;
	private int[] delStoreFileNo;
}
