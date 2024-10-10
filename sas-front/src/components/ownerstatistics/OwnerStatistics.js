import React, { useEffect, useState } from "react";
import "./ownerstatistics.css";
import { RiReservedFill } from "react-icons/ri";
import { FaPersonHalfDress, FaSackDollar } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import axios from "axios";
import Chart, { chartData, chartOptions } from "../store/Chart";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil"; // Recoil에서 상태 가져오기
import {
  storeNameState,
  loginStoreNoState,
  loginStoreNameState,
} from "../utils/RecoilData"; // 로그인된 점주의 storeNo 상태

function Ownerstatistics(props) {
  const setActiveIndex = props.setActiveIndex;
  const [totalReserve, setTotalReserve] = useState(0); // 이번달 예약 건수 상태
  const [totalReservedPeople, setTotalReservedPeople] = useState(0); // 이번달 예약된 총 인원수 상태
  const [lastMonthReserve, setLastMonthReserve] = useState(0); // 지난달 예약 건수 상태
  const [lastMonthReservedPeople, setLastMonthReservedPeople] = useState(0); // 지난달 예약된 총 인원수 상태
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
    barData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "손님수",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    },
  });

  const storeNo = useRecoilValue(loginStoreNoState); // Recoil에서 로그인된 점주의 storeNo 가져오기

  const [storeName, setStoreName] = useRecoilState(loginStoreNameState);
  console.log("현재 storeName 값:", storeName);
  const backServer = process.env.REACT_APP_BACK_SERVER;

  // 변동률 계산 함수
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 100; // 지난달 데이터가 0일 때 100% 증가
    return ((current - previous) / previous) * 100;
  };
  // 총 예약 수와 예약된 인원수 가져오기
  useEffect(() => {
    setActiveIndex(5);
    // 이번달 예약 데이터 가져오기
    if (storeNo !== 0) {
      const CurrentData = async () => {
        try {
          const totalReserveResponse = await axios.get(
            `${backServer}/reservation/totalreservation/storeNo/${storeNo}`
          );
          setTotalReserve(totalReserveResponse.data);

          const totalReservedPeopleResponse = await axios.get(
            `${backServer}/reservation/totalreservedpeople/storeNo/${storeNo}`
          );
          setTotalReservedPeople(totalReservedPeopleResponse.data);
        } catch (error) {
          console.error("이번달 예약 데이터 가져오기 실패:", error);
        }
      };

      // 지난달 예약 데이터 가져오기
      const LastMonthData = async () => {
        try {
          const lastMonthReserveResponse = await axios.get(
            `${backServer}/reservation/lastMonthTotalReservation/storeNo/${storeNo}`
          );
          setLastMonthReserve(lastMonthReserveResponse.data);

          const lastMonthReservedPeopleResponse = await axios.get(
            `${backServer}/reservation/lastMonthTotalReservedPeople/storeNo/${storeNo}`
          );
          setLastMonthReservedPeople(lastMonthReservedPeopleResponse.data);
        } catch (error) {
          console.error("지난달 예약 데이터 가져오기 실패:", error);
        }
      };

      CurrentData();
      LastMonthData();
    }
  }, [storeNo, backServer]);

  // 변동률 계산
  const reserveChange = calculatePercentageChange(
    totalReserve,
    lastMonthReserve
  );
  const reservedPeopleChange = calculatePercentageChange(
    totalReservedPeople,
    lastMonthReservedPeople
  );

  useEffect(() => {
    if (storeNo !== 0) {
      axios
        .get(`${backServer}/reservation/totalreservation/storeNo/${storeNo}`)
        .then((response) => {
          console.log("이번달 예약 데이터:", response.data);
          setTotalReserve(response.data);
        })
        .catch((error) => {
          console.error("예약 데이터 가져오기 실패:", error);
        });
    }
  }, [storeNo, backServer]);

  // 예약된 총 인원수 가져오기
  useEffect(() => {
    if (storeNo !== 0) {
      axios
        .get(`${backServer}/reservation/totalreservedpeople/storeNo/${storeNo}`)
        .then((response) => {
          setTotalReservedPeople(response.data);
        })
        .catch((error) => {
          console.error("예약된 총 인원수 데이터 가져오기 실패:", error);
        });

      // 연령대 데이터 가져와서 차트 업데이트
      axios
        .get(`${backServer}/reservation/agereservation/storeNo/${storeNo}`)
        .then((response) => {
          const fetchedData = response.data;

          // 모든 연령대(10대~70대)에 대한 데이터가 없는 경우 0으로 채워줌
          const fullAgeGroups = [
            "10대",
            "20대",
            "30대",
            "40대",
            "50대",
            "60대",
            "그 외",
          ];
          const filledAgeCounts = fullAgeGroups.map((ageGroup) => {
            const found = fetchedData.find(
              (item) => item.AGEGROUP === ageGroup
            );
            return found ? found.TOTALPEOPLE : 0; // 해당 연령대가 없으면 0으로 채움
          });

          // 차트 데이터 업데이트
          setUpdatedChartData((prevData) => ({
            ...prevData,
            agedata: {
              ...prevData.agedata,
              labels: fullAgeGroups, // 모든 연령대를 라벨에 반영
              datasets: [
                {
                  ...prevData.agedata.datasets[0],
                  data: filledAgeCounts, // 연령대별 데이터 반영
                  label: "연령별 손님",
                  backgroundColor: "rgba(54, 162, 235, 0.5)",
                },
              ],
            },
          }));
        })
        .catch((error) => {
          console.error("연령대 데이터 가져오기 실패:", error);
        });
    }
  }, [storeNo, backServer]);
  useEffect(() => {
    // 성별 데이터를 가져와 차트 업데이트
    if (storeNo !== 0) {
      axios
        .get(`${backServer}/reservation/genderdata/storeNo/${storeNo}`)
        .then((response) => {
          const genderData = response.data;
          let maleCount = 0;
          let femaleCount = 0;

          // genderData를 반복하면서 성별에 따라 카운트 추가
          genderData.forEach((item) => {
            if (item.USER_GENDER === "남") {
              maleCount += item.COUNT;
            } else if (item.USER_GENDER === "여") {
              femaleCount += item.COUNT;
            }
          });

          // 도넛 차트 데이터 업데이트
          setUpdatedChartData((prevData) => ({
            ...prevData,
            doughnutData: {
              labels: ["남자", "여자"],
              datasets: [
                {
                  ...prevData.doughnutData.datasets[0],
                  label: "성별 비율",
                  data: [maleCount, femaleCount], // 성별 비율 데이터 반영
                  backgroundColor: ["#1e90ff", "#ff1493"], // 남성, 여성 색상
                  borderColor: ["#1e90ff", "#ff1493"],
                  borderWidth: 1,
                },
              ],
            },
          }));
        })
        .catch((error) => {
          console.error("성별 데이터 가져오기 실패:", error);
        });
    }
  }, [storeNo, backServer]);

  // 이번주 손님 수 가져오기
  useEffect(() => {
    if (storeNo !== 0) {
      const WeekCustomer = async () => {
        try {
          const response = await axios.get(
            `${backServer}/reservation/weekcustomer/storeNo/${storeNo}`
          );
          const visitorsData = response.data;

          // 요일별 데이터를 차트에 반영
          const daysOfWeekMap = {
            월요일: "Mon",
            화요일: "Tue",
            수요일: "Wed",
            목요일: "Thu",
            금요일: "Fri",
            토요일: "Sat",
            일요일: "Sun",
          };
          const visitorsPerDay = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ].map((day) => {
            const dayData = visitorsData.find(
              (item) => daysOfWeekMap[item.DAYOFWEEK] === day
            );
            return dayData ? dayData.CUSTOMERCOUNT : 0;
          });

          // 차트 데이터 업데이트
          setUpdatedChartData((prevData) => ({
            ...prevData,
            barData: {
              ...prevData.barData,
              datasets: [
                {
                  ...prevData.barData.datasets[0],
                  data: visitorsPerDay, // 백엔드에서 받아온 요일별 손님 수 반영
                },
              ],
            },
          }));
        } catch (error) {
          console.error(
            "이번주 손님 수 데이터를 가져오는 중 오류 발생:",
            error
          );
        }
      };

      WeekCustomer();
    }
  }, [storeNo, backServer, storeName]);
  return (
    <>
      <div className="dashboard-body">
        <header className="dashboard-head">
          <h1>통계관리</h1>
          <Link to="/storecheck/storeNoticeList">
            <button className="button-bell">
              <div className="user-box-bell">
                <div className="user-page-box">
                  <div className="bellWrapper">
                    <i className="fas fa-bell my-bell"></i>
                  </div>

                  <div className="circle first"></div>
                  <div className="circle second"></div>
                  <div className="circle third"></div>
                </div>
              </div>
            </button>
          </Link>
        </header>
      </div>
      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/200.jpg" alt="back" />
        </div>
        {/* 상단 섹션 */}
        <div className="top-section">
          <div className="info-card">
            <div className="info-text">
              <h3>이번달 총 예약 수</h3>
              <h2>
                {totalReserve}건{" "}
                <span className={reserveChange >= 0 ? "positive" : "negative"}>
                  {reserveChange.toFixed(1)}%
                </span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <RiReservedFill />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>방문한 총 고객 수</h3>
              <h2>
                {totalReservedPeople}명{" "}
                <span
                  className={
                    reservedPeopleChange >= 0 ? "positive" : "negative"
                  }
                >
                  {reservedPeopleChange.toFixed(1)}%
                </span>
              </h2>{" "}
              {/* 상태를 표시 */}
            </div>
            <div className="info-card-icon-bg">
              <FaPersonHalfDress />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>이번달 배달/포장 수</h3>
              <h2>
                120건 <span className="negative">-5%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <MdDeliveryDining />
            </div>
          </div>

          <div className="info-card">
            <div className="info-text">
              <h3>금일 매출</h3>
              <h2>
                7,500,000원 <span className="positive">+5%</span>
              </h2>
            </div>
            <div className="info-card-icon-bg">
              <FaSackDollar />
            </div>
          </div>
        </div>

        {/* 중단 섹션 */}
        <div className="middle-section">
          <div className="main-info">
            <div className="main-info-text">
              <h3>환영합니다</h3>
              <h1>{storeName} 점주님</h1>
              <p>
                이곳에서 각종 통계자료를 볼 수 있습니다.
                <br />
                좋은 하루되세요
              </p>
            </div>
            <div className="main-info-image">
              <img src="/image/translogo.png" alt="main-info-image" />
            </div>
          </div>

          <div className="mf-ratio">
            <h3>남녀 비율</h3>
            {updatedChartData.doughnutData.datasets?.[0]?.data?.length > 0 ? (
              <Chart type="doughnut" data={updatedChartData.doughnutData} />
            ) : (
              <p>성별 데이터가 없습니다.</p>
            )}
          </div>

          <div className="age-distribution">
            <h3>연령대 분포</h3>
            <Chart
              type="bar"
              data={updatedChartData.agedata}
              options={chartOptions.generalOptions}
            />
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="bottom-section">
          {/* 그래프 섹션 */}
          <div className="chart-empl-container">
            <h3>매장 내 직원 수</h3>
            <Chart
              type="bar"
              data={chartData.employeedata}
              options={chartOptions.employeeOptions}
            />
          </div>

          <div className="orders-overview">
            <h3>가장 많이 주문한 음식</h3>
            <ul>
              <li>
                <img
                  src="/image/IMG_3238.jpg"
                  alt="Food 1"
                  className="order-image"
                />
                <span>$2400 알 깨고 나온 윤태구</span>
              </li>
              <li>
                <img
                  src="/image/IMG_3238.jpg"
                  alt="Food 2"
                  className="order-image"
                />
                <span>$2400 알 깨고 나온 윤태구</span>
              </li>
              {/* 다른 주문 아이템 추가 */}
            </ul>
          </div>
        </div>

        {/* 하단 테이블 영역에 차트 추가 */}
        <div className="charts-section">
          <div className="chart-container">
            <h3>매출 그래프</h3>
            <Chart type="line" data={chartData.lineData} />
          </div>

          <div className="chart-container">
            <h3>이번주 손님 수</h3>
            <Chart
              type="bar"
              data={updatedChartData.barData}
              options={chartOptions.generalOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Ownerstatistics;
