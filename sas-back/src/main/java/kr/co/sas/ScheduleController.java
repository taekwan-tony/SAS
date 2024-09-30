package kr.co.sas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import kr.co.sas.notice.model.service.NoticeService;
import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.store.model.service.StoreService;
import kr.co.sas.util.EmailSender;

@EnableScheduling
@Controller
public class ScheduleController {
	
	@Autowired
	private StoreService storeService;
	@Autowired
	private NoticeService noticeService;
	@Autowired
	private EmailSender emailSender;
	
	@Scheduled(cron="0 0 20 * * *")
	public void requestPayStore() {
		List<StoreDTO> list = storeService.selectAllPayStore();
		int result = noticeService.storePayNotice(list);
//		for(StoreDTO store : list) {
//			String emailTitle = "Spoon&Smiles 결제 안내 메일입니다.";
//					String emailContent = "<h1>안녕하세요. Spoon & Smiles 입니다. </h1>"
//							+"<h3> <span style='color:red;'>사이트에 결제 내용 참고 바라며, 결제일 5일 이후 미결제시 계약 종료 예정입니다.</span> </h3>";
//					emailSender.sendMail(emailTitle, store.getSoEmail(), emailContent);
//		}
	}
}
