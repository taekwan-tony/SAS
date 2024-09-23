import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const NoticeDetail = (props) => {
  const params = useParams();
  const setNoticeDetailTitle = props.setNoticeDetailTitle;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const noticeNo = params.noticeNo;
  const noticeType = params.noticeType;
  const navigate = useNavigate();
  const [notice, setNotice] = useState({
    noticeNo: "",
    noticeContent: "",
    noticeTitle: "",
    noticeEnrollDate: "",
    noticeType: 0,
  });
  const [noticeBoth, setNoticeBoth] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/notice/detail/${noticeNo}/${noticeType}`)
      .then((res) => {
        console.log(res);
        setNotice(res.data.notice);
        setNoticeBoth(res.data.noticeBoth);
      })
      .catch((err) => {
        console.log(err);
      });
    setNoticeDetailTitle("상세보기");
  }, [noticeNo]);

  const deleteNotice = () => {
    axios
      .delete(`${backServer}/notice/delete/${noticeNo}`)
      .then((res) => {
        if (res.data > 0) {
          Swal.fire({
            title: "삭제 성공",
            text: "게시물를 삭제했습니다.",
            icon: "success",
          })
            .then(() => {
              navigate("/admin/notice/list");
            })
            .catch((err) => {
              Swal.fire({
                title: "삭제된 게시물",
                text: "삭제처리된 게시물입니다.",
                icon: "warning",
              });
            });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "삭제 실패",
          text: "예기치 못한 이유로 삭제를 실패했습니다.",
          icon: "error",
        });
      });
  };
  return (
    <div className="notice-detail-wrap">
      <table className="notice-detail-table">
        <thead>
          <tr>
            <th>제목</th>
            <td>{notice.noticeTitle}</td>
          </tr>
          <tr>
            <th style={{ width: "10%" }}>유형</th>
            <td colSpan={2} style={{ width: "20%" }}>
              {notice.noticeType === 1 ? "소비자" : "매장"}
            </td>
            <th style={{ width: "10%" }}>등록일</th>
            <td style={{ width: "60%" }}>{notice.noticeEnrollDate}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={5}
              className="notice-detail-table-td"
              dangerouslySetInnerHTML={{
                __html: notice.noticeContent,
              }}
            ></td>
          </tr>
          {noticeBoth.prevNo ? (
            <tr
              className="notice-both-wrap"
              onClick={() => {
                navigate(
                  `/admin/notice/detail/${noticeBoth.prevNo}/${noticeType}`
                );
              }}
            >
              <th>
                {noticeType == 0 ? "전체" : noticeType == 1 ? "소비자" : "매장"}
              </th>
              <th>
                <span>이전글</span>
                <span className="material-icons">expand_less</span>
              </th>
              <td colSpan={3}>{noticeBoth.prevTitle}</td>
            </tr>
          ) : (
            ""
          )}
          {noticeBoth.nextNo ? (
            <tr
              className="notice-both-wrap"
              onClick={() => {
                navigate(
                  `/admin/notice/detail/${noticeBoth.nextNo}/${noticeType}`
                );
              }}
            >
              <th>
                {noticeType == 0 ? "전체" : noticeType == 1 ? "소비자" : "매장"}
              </th>
              <th>
                <span>다음글</span>
                <span className="material-icons">keyboard_arrow_down</span>
              </th>

              <td colSpan={3}>{noticeBoth.nextTitle}</td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
      <div className="notice-write-button-zone">
        <button
          type="button"
          className="btn-sub round notice-back"
          onClick={() => {
            navigate("/admin/notice/list");
          }}
        >
          공지사항 목록
        </button>
      </div>
      <div className="notice-write-button-zone">
        <button
          type="button"
          className="btn-main round"
          onClick={() => {
            navigate(`/admin/notice/modify/${noticeNo}/${noticeType}`);
          }}
        >
          수정하기
        </button>
        <button
          type="button"
          className="btn-sub round"
          onClick={() => {
            Swal.fire({
              title: "글을 삭제하시겠습니까?",
              text: "삭제하시면 다시 복구시킬 수 없습니다.",
              showCancelButton: true,
              confirmButtonColor: "#5e9960",
              confirmButtonText: "삭제",
              cancelButtonColor: "#d33",
              cancelButtonText: "취소",
            }).then(() => {
              deleteNotice();
            });
          }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default NoticeDetail;
