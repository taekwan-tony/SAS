import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";

const QuestionList = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  const questionWriterType = props.questionWriterType;
  const navigate = useNavigate();
  setAdminDetailTitle("1:1문의리스트");
  const [questionList, setQuestionList] = useState([]);
  const [reqPage, setReqPage] = useState(1);

  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/question/list/${reqPage}/${questionWriterType}`)
      .then((res) => {
        setQuestionList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  return (
    <div className="question-list-wrap">
      <div className="question-list-menu">
        <div className="question-menu question-menu-check">
          <span>매장 1:1문의</span>
        </div>
      </div>
      <div className="question-list-main">
        <table className="question-posting-wrap">
          <thead>
            <tr className="question-posting-title">
              <th style={{ width: "15%" }}>번호</th>
              <th style={{ width: "50%" }}>제목</th>
              <th style={{ width: "20%" }}>등록일</th>
              <th style={{ width: "15%" }}>구분</th>
            </tr>
          </thead>
          {questionList.map((question, i) => {
            return <QuestionItem key={"question-" + i} question={question} />;
          })}
        </table>
      </div>
      <div className="question-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
      <div className="question-write-btn">
        <button
          className="btn-main round"
          onClick={() => {
            navigate("/admin/question/write");
          }}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

const QuestionItem = (props) => {
  const question = props.question;
  const navigate = useNavigate();
  return (
    <tr
    //   onClick={() => {
    //     navigate(`/admin/question/detail/${question.questionNo}/${questionType}`);
    //   }}
    >
      {/* <td style={{ width: "15%" }}>{question.questionNo}</td> */}
      {/* <td style={{ width: "50%" }}>{question.questionTitle}</td> */}
      {/* <td style={{ width: "20%" }}>{question.questionEnrollDate}</td> */}
      {/* <td style={{ width: "15%" }}>
        {question.questionType == 1 ? "소비자" : "매장"}
      </td> */}
    </tr>
  );
};
export default QuestionList;
