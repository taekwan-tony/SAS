package kr.co.sas.userReport.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.userReport.model.dao.UserReportDao;
import kr.co.sas.userReport.model.dto.UserReportDTO;

@Service
public class UserReportService {
	@Autowired
	private UserReportDao userReportDao;
	@Transactional
	public int insertUserReport(UserReportDTO report) {
		// TODO Auto-generated method stub
		int result = userReportDao.insertUserReport(report);
		return result;
	}
}
