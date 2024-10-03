import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KaKao from "../utils/Kakao";
import Chart, { chartData, chartOptions } from "../store/Chart";
import Swal from "sweetalert2";

const AdminStoreDetail = (props) => {
  const setAdminDetailTitle = props.setAdminDetailTitle;
  setAdminDetailTitle("제휴 상세페이지");
  const params = useParams();
  const storeNo = params.storeNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [store, setStore] = useState({});
  const [reservation, setReservation] = useState([]);
  const [totalReserve, setTotalReserve] = useState(0);
  const [totalReservedPeople, setTotalReservedPeople] = useState(0);
  const [updatedChartData, setUpdatedChartData] = useState({
    ...chartData,
    agedata: {
      labels: [],
      datasets: [{ data: [] }],
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${backServer}/admin/storeDetail/${storeNo}`)
      .then((res) => {
        setStore(res.data.store);
        setTotalReservedPeople(res.data.totalReservedPeople);
        setTotalReserve(res.data.totalReserved);
        setReservation(res.data.reservation);
        const fetchedData = res.data.ageList;
        const ageLabels = fetchedData.map((item) => item.AGEGROUP);
        const ageCounts = fetchedData.map((item) => item.TOTALPEOPLE);

        if (ageLabels.length > 0 && ageCounts.length > 0) {
          setUpdatedChartData((prevData) => ({
            ...prevData,
            agedata: {
              ...prevData.agedata,
              labels: ["10대", "20대", "30대", "40대", "50대", "60대", "70대"],
              datasets: [
                {
                  label: "연령별 손님",
                  ...prevData.agedata.datasets[0],
                  data: ageCounts,
                  borderColor: "#1e90ff",
                  backgroundColor: "rgba(54, 162, 55, 0.5)",
                },
              ],
            },
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer]);
  const contractExpire = () => {
    Swal.fire({
      title: "계약을 종료하시겠습니까?",
      text: "계약 종료시 재신청해야 계약을 진행할 수 있습니다.",
      showCancelButton: true,
      confirmButtonColor: "#5e9960",
      confirmButtonText: "계약만료",
      cancelButtonColor: "#d33",
      cancelButtonText: "취소",
    }).then(() => {
      axios
        .patch(`${backServer}/admin/contractExpire/${store.storeNo}`)
        .then((res) => {
          navigate("/admin/store/storeList");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <div className="admin-store-detail-wrap">
      <div className="admin-store-detail-info">
        <div className="admin-store-detail-info-wrap">
          <div className="admin-store-detail-info-title">
            <h4>매장 정보</h4>
          </div>
          <div className="admin-store-detail-info-content">
            <div>
              <span>매장 이름 : </span>
              <span>{store.storeName}</span>
            </div>
            <div className="admin-store-detail-business">
              <div>
                <span>사업자 번호 : </span>
                <span>{store.businessNumber}</span>
              </div>
              <div>
                <span>사업자 이름 : </span>
                <span>{store.soName}</span>
              </div>
            </div>
            <div className="admin-store-detail-map-wrap">
              <div>
                <span>매장 주소 : </span>
                <span>{store.storeAddr}</span>
              </div>
              <div className="admin-store-detail-map-data">
                {store.storeAddr ? (
                  <KaKao
                    addr={store.storeAddr}
                    name={store.storeName}
                    level={3}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="admin-store-detail-data-wrap">
          <div className="admin-store-detail-data-title">
            <h4>매장 데이터 정보</h4>
          </div>
          <div className="admin-store-detail-info-card">
            <div className="admin-store-detail-info-text">
              <h3>이번달 총 예약 수</h3>
              <h2>{totalReserve}건</h2>
            </div>
            <div className="admin-store-detail-info-text">
              <h3>방문한 총 고객 수</h3>
              <h2>{totalReservedPeople}명</h2>
            </div>
          </div>
          <div className="admin-store-detail-chart-wrap">
            <Chart
              type="bar"
              data={updatedChartData.agedata}
              options={chartOptions.generalOptions}
            />
          </div>
          <div className="admin-store-contract-btn-box">
            <button className="btn-sub round" onClick={contractExpire}>
              계약만료 처리하기
            </button>
          </div>
        </div>
      </div>
      <div className="admin-store-detail-user-data-wrap">
        <div className="admin-store-detail-user-data-title">
          <h4>최근 5개 이용데이터</h4>
        </div>
        <table className="admin-store-detail-posting-wrap">
          <thead>
            <tr className="admin-store-detail-posting-title">
              <th style={{ width: "15%" }}>예약번호</th>
              <th style={{ width: "30%" }}>예약일</th>
              <th style={{ width: "25%" }}>예약자</th>
              <th style={{ width: "15%" }}>예약인원</th>
              <th style={{ width: "15%" }}>예약금여부</th>
            </tr>
          </thead>
          {reservation.map((reserve, i) => {
            return <ReserveItem key={"admin-store-" + i} reserve={reserve} />;
          })}
        </table>
      </div>
    </div>
  );
};
const ReserveItem = (props) => {
  const reserve = props.reserve;
  return (
    <tr className="admin-store-detail-select-wrap">
      <td style={{ width: "15%" }}>{reserve.reserveNo}</td>
      <td style={{ width: "30%" }}>{reserve.reserveEnrollDate}</td>
      <td style={{ width: "25%" }}>{reserve.userName}</td>
      <td style={{ width: "15%" }}>{reserve.reservePeople}명</td>
      <td style={{ width: "15%" }}>
        {reserve.reservePayStatus === 1 ? "납부" : "미납"}
      </td>
    </tr>
  );
};
export default AdminStoreDetail;
