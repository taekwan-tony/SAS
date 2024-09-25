package kr.co.sas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import kr.co.sas.store.model.dto.StoreDTO;
import kr.co.sas.store.model.service.StoreService;

@EnableScheduling
@Controller
public class ScheduleController {
	
	@Autowired
	private StoreService storeService;
	
	@Scheduled(cron="10 * * * * *")
	public void requestPayStore() {
		System.out.println("스케줄 확인용");
		List<StoreDTO> list = storeService.selectAllPayStore();
		System.out.println("List 길이"+list.size());
	}
}
