package kr.co.sas.question.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.sas.util.PageInfo;

@Mapper
public interface QuestionDao {

	int totalCount(int questionWriterType);

	List selectQuestionList(PageInfo pi, int questionWriterType);

}
