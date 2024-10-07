package kr.co.sas.userReport.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.userReport.model.dto.UserReportDTO;
import kr.co.sas.util.PageInfo;

@Mapper
public interface UserReportDao {

	int insertUserReport(UserReportDTO report);

	int totalReportCount();

	List selectReportStore(PageInfo pi);

	List<Integer> storeReportComp(int storeNo);

	int updateReport(int reportNo);
	
}
