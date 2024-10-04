package kr.co.sas.userReport.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="userReport")
@Schema(description = "일반회원 매장 신고")
public class UserReportDTO {
	@Schema(description = "신고 번호", type="int")
	private int reportNo;
	@Schema(description = "신고 사유", type="string")
	private String reportReason;
	@Schema(description = "예약 번호", type="int")
	private int reserveNo;	
}
