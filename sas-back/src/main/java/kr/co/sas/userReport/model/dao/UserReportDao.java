package kr.co.sas.userReport.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.userReport.model.dto.UserReportDTO;

@Mapper
public interface UserReportDao {

	int insertUserReport(UserReportDTO report);
	
}
