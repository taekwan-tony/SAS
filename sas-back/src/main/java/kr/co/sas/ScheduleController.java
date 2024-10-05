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


	}
}
