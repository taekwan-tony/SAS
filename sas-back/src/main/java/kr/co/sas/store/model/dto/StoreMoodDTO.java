package kr.co.sas.store.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "storeMood")
public class StoreMoodDTO {
private int smNo;
private String mood;
private int storeNo;
}
