package kr.co.sas.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.reservation.model.dao.ReservationDao;
import kr.co.sas.reservation.model.dto.ReservationDTO;
import kr.co.sas.store.model.dao.StoreDao;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.store.model.dto.StorePaymentDTO;
import kr.co.sas.user.model.dao.UserDao;
import kr.co.sas.user.model.dto.UserDTO;
import kr.co.sas.userReport.model.dao.UserReportDao;
import kr.co.sas.util.EmailSender;
import kr.co.sas.util.PageInfo;
import kr.co.sas.util.PageUtil;


@Service
public class AdminService {

	@Autowired
	private StoreDao storeDao;
	@Autowired
	private PageUtil pageUtil;
	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	private EmailSender email;
	@Autowired
	private ReservationDao reservationDao;
	@Autowired
	private UserReportDao userReportDao;
	@Autowired
	private UserDao userDao;
	
	public Map selectApprovalStore(int reqPage,int storeType) {
		int numPerPage = 12;
		int pageNaviSize = 5;
		int totalCount = storeDao.totalCount(storeType); 
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = storeDao.selectApprovalStore(pi,storeType);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi",pi);
		return map;
	}


	@Transactional
	public int approvalStore(StoreDTO store) {
		String receiver = store.getSoEmail();
		//인증메일 제목 생성
		String emailTitle = "Spoon & Smiles 제휴승인 메일입니다.";
		if(store.getRegistType()==1) {
		//인증메일 인증코드 생성
		Random r = new Random();
		StringBuffer sb = new StringBuffer();
			for(int i=0; i<6; i++) {
				//0~9 : r.nextInt(10);
				//A~Z : r.nextInt(26)+65;
				//a~z : r.nextInt(26)+97;
				
				int flag = r.nextInt(3); //0,1,2=>숫자쓸지, 대문자 쓸지, 소문자쓸지 결정
				
				if(flag==0) {
					int randomCode = r.nextInt(10);
					sb.append(randomCode);
				}else if(flag==1) {
					char randomCode = (char)(r.nextInt(26)+65);
					sb.append(randomCode);
				}else if(flag==2) {
					char randomCode = (char)(r.nextInt(26)+97);
					sb.append(randomCode);
				}
			}
		String encPw = encoder.encode(sb.toString());
		store.setSoPw(encPw);
		String emailContent = "<h1>안녕하세요. Spoon & Smiles 입니다 </h1>"
				+"<h3>매장 제휴 신청이 승인되었습니다.</h3>"
				+"<h3>임시비밀번호는 [<span style='color:red;'>"
				+sb.toString()
				+"</span>]입니다. </h3>"
				+"<h3>아이디는 이메일을 사용부탁드리며, 비밀번호는 바로 수정 부탁드립니다.</h3>";
		email.sendMail(emailTitle, receiver, emailContent);
		}
		int result = storeDao.approvalStore(store);
		return result;
	}


	public Map storeDetail(int storeNo) {
		StoreDTO store = storeDao.selectOneStoreInfo(storeNo);
		List<Map<String, Object>> ageList = reservationDao.selectAgeReservation(storeNo);
		int totalReservedPeople = reservationDao.selectTotalReservedPeople(storeNo);
		int totalReserved = reservationDao.selectTotalReserve(storeNo);
		List<ReservationDTO> reservation =  reservationDao.selectReservationList(storeNo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("store", store);
		map.put("ageList",ageList);
		map.put("totalReservedPeople", totalReservedPeople);
		map.put("totalReserved", totalReserved);
		map.put("reservation", reservation);
		return map;
	}

	@Transactional
	public int contractExpire(int storeNo) {
		int result = storeDao.contractExpire(storeNo);
		return result;
	}


	public Map selectReportList(int reqPage) {
		int numPerPage = 12;
		int pageNaviSize = 5;
		int totalCount = userReportDao.totalReportCount(); 
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = userReportDao.selectReportStore(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi",pi);
		return map;
	}


	@Transactional
	public int storeReportComp(int storeNo) {
		List<Integer> list = userReportDao.storeReportComp(storeNo);
		int result = 0;
		for(int reportNo : list) {
			result += userReportDao.updateReport(reportNo);
		}
		if(result == list.size()) {
			StoreDTO store = storeDao.selectOneSoEmail(storeNo);
			String receiver = store.getSoEmail();
			//인증메일 제목 생성
			String emailTitle = "Spoon & Smiles 매장관리 요청의 건";
			String emailContent = "<h1>안녕하세요. Spoon & Smiles 입니다 </h1>"
					+"<h3>매장 이용 신고가 지속 접수되어 연락드립니다.</h3>"
					+"<h3>매장관리 요청드리며, 지속 신고 발생시 매장 제휴 제재 처리 예정입니다.</h3>"
					+"<h3>감사합니다.</h3>"
					+"<h3>Spoon & Smiles를 이용해주셔서 감사합니다.</h3>";
			email.sendMail(emailTitle, receiver, emailContent);
		}
		return result;
	}


	public Map yearSalesManagement() {
		StorePaymentDTO currentSales = storeDao.currentYearSales();
		List<UserDTO> userGender = userDao.selectUserGenderPercent();
		int newStoreCount = storeDao.selectNewStoreCount();
		int newCustomerCount = userDao.selectNewCustomerCount();
		List<String> yearData = storeDao.yearData();
		List<ReservationDTO> ageGroup = reservationDao.selectYearAgrGroup();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("currentYearSales", currentSales);
		map.put("userGenderPercent",userGender);
		map.put("newStoreCount", newStoreCount);
		map.put("newCustomerCount", newCustomerCount);
		map.put("ageGroup",ageGroup);
		map.put("yearData", yearData);
		return map;
	}


	public List yearSalesBarChart(int salesValue, String yearValue) {
		List<String> list = storeDao.yearSalesBarChart(salesValue,yearValue);
		return list;
	}


	public Map salesDetailList(String startDateValue, String endDateValue, String keyword, int orderBy) {
		List detailList = storeDao.salesDetailList(startDateValue,endDateValue,keyword,orderBy);
		Map<String, Object> totalMap = storeDao.totalSales(startDateValue,endDateValue,keyword);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", detailList);
		map.put("total", totalMap);
		return map;
	}


	

}
