import axios from "axios";
import { useEffect, useState } from "react";
import Chart, { chartData } from "../store/Chart";
import AdminAgeBarchart from "./AdminAgeBarchart";
import { Link } from "react-router-dom";
import AdminSalesBarChart from "./AdminSalesBarChart";

const ManagementSaleContent = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const setAdminDetailTitle = props.setAdminDetailTitle;
  setAdminDetailTitle("매출현황");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [currentYearSales, setCurrentYearSales] = useState({});
  const [userGenderPercent, setUserGenderPercent] = useState([]);
  const [newStoreCount, setNewStoreCount] = useState(0);
  const [newCustomerCount, setNewCustomerCount] = useState(0);
  const ageLabels = ["10대", "20대", "30대", "40대", "50대", "60대", "70대"];
  const [ageData, setAgeData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [yearData, setYearData] = useState([]);
  const [updatedChartData, setUpdatedChartData] = useState({
    ...chartData,
    doughnutData: {
      labels: ["남자", "여자"],
      datasets: [{ data: [] }],
    },
    agedata: {
      labels: [],
      datasets: [{ data: [] }],
    },
  });
  useEffect(() => {
    axios
      .get(`${backServer}/admin/yearSalesManagement`)
      .then((res) => {
        setCurrentYearSales(res.data.currentYearSales);
        setUpdatedChartData((prevData) => ({
          ...prevData,
          doughnutData: {
            labels: [
              `남자 : ${res.data.userGenderPercent[0].genderPercent}%`,
              `여자 : ${res.data.userGenderPercent[1].genderPercent}%`,
            ],
            datasets: [
              {
                ...prevData.doughnutData.datasets[0],
                label: "성별 비율",
                data: [
                  res.data.userGenderPercent[0].genderPercent,
                  res.data.userGenderPercent[1].genderPercent,
                ], // 성별 비율 데이터 반영
                backgroundColor: ["#1e90ff", "#ff1493"], // 남성, 여성 색상
                borderColor: ["#1e90ff", "#ff1493"],
                borderWidth: 1,
              },
            ],
          },
        }));
        setNewCustomerCount(res.data.newCustomerCount);
        setNewStoreCount(res.data.newStoreCount);
        const ageGroupData = new Array();
        for (let i = 0; i < ageLabels.length; i++) {
          for (let l = 0; l < res.data.ageGroup.length; l++) {
            if (ageLabels[i] == res.data.ageGroup[l].ageGroup) {
              ageGroupData.push(res.data.ageGroup[l].totalPeople);
            }
          }
          if (ageGroupData.length == i) {
            ageGroupData.push(0);
          }
        }
        setAgeData(ageGroupData);
        setYearData(res.data.yearData);
      })
      .catch((err) => {});
  }, []);
  console.log("dddfasdf", yearData);
  return (
    <>
      <div className="admin-management-sales-wrap">
        <div className="admin-management-sales-title-wrap">
          <span className="material-icons">real_estate_agent</span>
          <span>매출현황</span>
        </div>
      </div>
      <div className="admin-management-sales-content-wrap">
        <div className="admin-management-sales-content-1">
          <div className="admin-management-sales-content-title">
            <span>{currentYear}년 매출</span>
          </div>
          <div className="admin-management-sales-content-content">
            <div>
              <span style={{ fontFamily: "ns-b" }}>
                {currentYearSales.currentYearSales}원
              </span>
            </div>
            <div>
              <span
                style={
                  currentYearSales.yearSalesPercent < 100
                    ? { color: "red" }
                    : { color: "blue" }
                }
              >
                {currentYearSales.yearSalesPercent == 0
                  ? "작년 매출과 비교할 수 없습니다."
                  : `${currentYearSales.yearSalesPercent}%`}
              </span>
            </div>
          </div>
        </div>
        <div className="admin-management-sales-content-2">
          <div className="admin-management-sales-content-title">
            <span>매출 그래프</span>
            <div>
              <Link to="#">
                <span>매출데이터 상세보기</span>
                <span class="material-icons">chevron_right</span>
              </Link>
            </div>
          </div>
          <div className="admin-management-sales-content-salesBarChart">
            <AdminSalesBarChart yearData={yearData} setYearData={setYearData} />
          </div>
        </div>
      </div>
      <div className="admin-management-sales-content-wrap">
        <div className="admin-management-sales-content-1 admin-doughnutChart">
          <div className="admin-management-sales-content-title">
            <span>{currentYear}년 소비자 이용 남/녀 비율</span>
          </div>
          <div className="admin-management-sales-content-doughnutChart">
            {updatedChartData.doughnutData.datasets?.[0]?.data?.length > 0 ? (
              <Chart type="doughnut" data={updatedChartData.doughnutData} />
            ) : (
              <p>성별 데이터가 없습니다.</p>
            )}
          </div>
        </div>
        <div className="admin-management-sales-content-3">
          <div className="admin-management-sales-content-4">
            <div className="admin-management-sales-content-title">
              <span>{currentYear}년 신규 매장 현황</span>
            </div>
            <div className="admin-managemnet-sales-content-count">
              <span>신규 제휴 매장 등록 : </span>
              <span>{newStoreCount} 매장</span>
            </div>
          </div>
          <div className="admin-management-sales-content-4">
            <div className="admin-management-sales-content-title">
              <span>{currentYear}년 신규 이용자 현황</span>
            </div>
            <div className="admin-managemnet-sales-content-count">
              <span>신규 이용자 등록 : </span>
              <span>{newCustomerCount} 명</span>
            </div>
          </div>
        </div>
        <div className="admin-management-sales-content-1">
          <div className="admin-management-sales-content-title">
            <span>{currentYear}년 연령대별 이용현황</span>
          </div>
          <div className="admin-management-sales-content-ageBarChart">
            {ageData ? (
              <AdminAgeBarchart ageData={ageData} ageLabels={ageLabels} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementSaleContent;
