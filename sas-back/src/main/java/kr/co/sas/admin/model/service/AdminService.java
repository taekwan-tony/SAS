package kr.co.sas.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.sas.store.model.dao.StoreDao;
import kr.co.sas.store.model.dto.StoreDTO;
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
		System.out.println(store);
		//인증메일 제목 생성
		String emailTitle = "Spoon & Smiles 인증메일입니다.";
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
				+"<h3>인증번호는 [<span style='color:red;'>"
				+sb.toString()
				+"</span>]입니다. </h3>";
		email.sendMail(emailTitle, receiver, emailContent);
		}
		int result = storeDao.approvalStore(store);
		return result;
	}


	public Map storeDetail(int storeNo) {
		StoreDTO store = storeDao.selectOneStoreInfo(storeNo);
		System.out.println(store.getStoreName());
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("store", store);
		return map;
	}


	

}
