import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";
import Swal from "sweetalert2";

const AdminStoreReview = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  const navigate = useNavigate();

  setAdminDetailTitle("리뷰 신고 리스트");
  const [reviewList, setReviewList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [changeData, setChangeData] = useState(0);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/review/reviewReportList/${reqPage}`)
      .then((res) => {
        setReviewList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, changeData]);

  return (
    <div className="admin-store-list-wrap">
      <div className="admin-store-list-menu">
        <div className="admin-store-menu admin-store-menu-check">
          <span>승인전</span>
        </div>
      </div>
      <div className="admin-store-list-main">
        <table className="admin-store-posting-wrap">
          <thead>
            <tr className="admin-store-posting-title">
              <th style={{ width: "15%" }}>리뷰등록일</th>
              <th style={{ width: "15%" }}>유저닉네임</th>
              <th style={{ width: "15%" }}>매장이름</th>
              <th style={{ width: "10%" }}>점주이름</th>
              <th style={{ width: "35%" }}>신고사유</th>
              <th style={{ width: "10%" }}>리뷰삭제</th>
            </tr>
          </thead>
          {reviewList.map((review, i) => {
            return (
              <StoreItem
                key={"admin-store-" + i}
                review={review}
                setChangeData={setChangeData}
              />
            );
          })}
        </table>
      </div>
      <div className="admin-store-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </div>
  );
};

const StoreItem = (props) => {
  const review = props.review;
  const setChangeData = props.setChangeData;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const reviewDate = new Date(review.reviewDate);
  const formatDate = `${reviewDate.getFullYear()}-${
    reviewDate.getMonth() + 1 < 10
      ? "0" + (reviewDate.getMonth() + 1)
      : reviewDate.getMonth() + 1
  }-${
    reviewDate.getDate() < 9 ? "0" + reviewDate.getDate() : reviewDate.getDate()
  }`;
  const reviewReport = (e) => {
    Swal.fire({
      title: "리뷰 삭제 처리",
      text: "신고된 리뷰를 삭제 처리하시겠습니까?",
      showCancelButton: true,
      icon: "info",
      confirmButtonColor: "#5e9960",
      confirmButtonText: "삭제",
      cancelButtonColor: "#d33",
      cancelButtonText: "취소",
    }).then(() => {
      axios
        .patch(`${backServer}/review/reviewReportComp`, review)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "리뷰 삭제 완료",
            text: "리뷰를 삭제했습니다.",
            icon: "success",
          }).then(() => {
            setChangeData(review.reviewNo);
          });
        })
        .catch((err) => {});
    });
  };
  return (
    <tr>
      <td style={{ width: "10%" }}>{formatDate}</td>
      <td style={{ width: "10%" }}>{review.userNickname}</td>
      <td style={{ width: "10%" }}>{review.storeName}</td>
      <td style={{ width: "10%" }}>{review.soName}</td>
      <td style={{ width: "50%" }}>{review.reviewReportContent}</td>
      <td style={{ width: "10%" }}>
        <div className="admin-store-button-zone">
          <button className="btn-main round" value={1} onClick={reviewReport}>
            리뷰삭제
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminStoreReview;
