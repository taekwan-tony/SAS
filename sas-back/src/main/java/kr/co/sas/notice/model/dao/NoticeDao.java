package kr.co.sas.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.notice.model.dto.NoticeBothDTO;
import kr.co.sas.notice.model.dto.NoticeDTO;
import kr.co.sas.util.PageInfo;

@Mapper
public interface NoticeDao {

	int totalCount(int noticeType);

	List selectNoticeList(PageInfo pi, int noticeType);

	int insertNotice(NoticeDTO notice);

	NoticeDTO selectOneNotice(int noticeNo);

	NoticeBothDTO selectBothNotice(NoticeDTO notice);

	int deleteNotice(int noticeNo);

	int updateNotice(NoticeDTO notice);

}
