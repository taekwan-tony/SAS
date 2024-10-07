import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "./storedetail.css";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginStoreNoState } from "../utils/RecoilData";

// 날씨 API 호출 함수 (OpenWeather API)
const fetchWeather = async () => {
  const apiKey = process.env.REACT_APP_WEATHER_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&units=metric&lang=kr`
  );
  const data = await response.json();
  return data;
};

// 요일별 예보 API 호출 함수 (OpenWeather API)
const fetchForecast = async () => {
  const apiKey = process.env.REACT_APP_WEATHER_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${apiKey}&units=metric&lang=kr`
  );
  const data = await response.json();
  return data;
};

// 요일 계산 함수
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  return days[date.getDay()];
};

function StoreDetail(props) {
  const setActiveIndex = props.setActiveIndex;
  const storeNo = useRecoilValue(loginStoreNoState);
  const [weather, setWeather] = useState(null);
  const [videoUrl, setVideoUrl] = useState(""); // 배경 비디오 URL 상태
  const [dailyTemperatures, setDailyTemperatures] = useState([]); // 요일별 온도 상태
  const [reservation, setReservation] = useState([]);
  const [todayCustomer, setTodayCumstomer] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const getWeatherIconUrl = (iconCode) =>
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  useEffect(() => {
    setActiveIndex(0);
    if (storeNo !== 0) {
      axios
        .get(`${backServer}/reservation/todayReservation/${storeNo}`)
        .then((response) => {
          console.log("예약 데이터: ", response.data);
          setReservation(response.data);
        })
        .catch((error) => {
          if (error.response) {
            // 서버 응답이 있고 에러 발생
            console.error("서버 응답 에러: ", error.response);
          } else if (error.request) {
            // 요청은 보내졌으나 응답을 받지 못함
            console.error("응답을 받지 못했습니다.", error.request);
          } else {
            // 기타 에러
            console.error("예약을 불러오지 못했습니다.: ", error.message);
          }
        });
    } else {
      console.error("storeNo가 정의되지 않았습니다.");
    }
  }, [storeNo]);
  // 날씨 상태에 따라 배경 비디오 URL 선택 함수
  const updateVideoUrl = (mainWeather) => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
      // 저녁 시간에 다른 링크를 사용
      setVideoUrl(
        "https://videos.pexels.com/video-files/26690702/11987721_2560_1440_60fps.mp4"
      );
      return;
    }
    switch (mainWeather) {
      case "Clear":
        setVideoUrl(
          "https://videos.pexels.com/video-files/2605326/2605326-uhd_2560_1440_30fps.mp4"
        );
        break;
      case "Clouds":
        setVideoUrl(
          "https://videos.pexels.com/video-files/14117658/14117658-uhd_2560_1440_30fps.mp4"
        );
        break;
      case "Rain":
        setVideoUrl(
          "https://videos.pexels.com/video-files/8549580/8549580-uhd_2560_1440_25fps.mp4"
        );
        break;
      case "Snow":
        setVideoUrl(
          "https://videos.pexels.com/video-files/6620470/6620470-uhd_2732_1440_25fps.mp4"
        );
        break;
      case "Thunderstorm":
        setVideoUrl(
          "https://videos.pexels.com/video-files/5908584/5908584-hd_1920_1080_25fps.mp4"
        );
        break;
      default:
        setVideoUrl("https://example.com/weather-videos/default.mp4");
        break;
    }
  };

  useEffect(() => {
    if (storeNo !== 0) {
      const getWeather = async () => {
        const weatherData = await fetchWeather();
        setWeather(weatherData);
        updateVideoUrl(weatherData.weather[0].main); // 날씨 상태에 따라 비디오 URL 업데이트
      };

      const getForecast = async () => {
        const forecastData = await fetchForecast();
        const dailyTempMap = {};

        // 5일간의 예보 데이터를 그룹화하여 요일별 평균 온도 계산
        forecastData.list.forEach((forecast) => {
          const day = getDayOfWeek(forecast.dt_txt);
          if (!dailyTempMap[day]) {
            dailyTempMap[day] = { tempSum: 0, count: 0 };
          }
          dailyTempMap[day].tempSum += forecast.main.temp;
          dailyTempMap[day].count += 1;
        });

        // 요일별 평균 온도 계산하여 배열로 변환
        const dailyTempArray = Object.keys(dailyTempMap).map((day) => {
          return {
            day,
            avgTemp: Math.round(
              dailyTempMap[day].tempSum / dailyTempMap[day].count
            ),
          };
        });

        setDailyTemperatures(dailyTempArray);
      };

      getWeather();
      getForecast();
    }
  }, []);

  // 요일별 온도를 선 그래프로 시각화하기 위한 데이터
  const data = {
    labels: dailyTemperatures.map((temp) => temp.day),
    datasets: [
      {
        label: "평균 기온 (°C)",
        data: dailyTemperatures.map((temp) => temp.avgTemp),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // 선의 부드러움을 조절하는 값 (0.4로 설정하여 부드럽게)
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // X축 격자선 제거
          drawBorder: false, // X축의 가로선 제거
        },
        position: "top", // X축 레이블을 상단으로 이동
        ticks: {
          color: "#fff", // X축 레이블 색상 설정
        },
      },
      x2: {
        grid: {
          display: false, // 추가된 X축 격자선 제거
          drawBorder: false, // 추가된 X축의 가로선 제거
        },
        position: "bottom", // 추가된 X축을 하단에 배치
        labels: dailyTemperatures.map((temp) => `${temp.avgTemp}°C`), // 하단 X축 레이블을 온도로 표시
        ticks: {
          color: "#fff", // 추가된 X축 레이블 색상 설정
        },
      },
      y: {
        display: false, // Y축 제거
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top", // 범례를 위쪽으로 이동
        labels: {
          color: "#fff", // 범례의 레이블 색상을 흰색으로 설정
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y}°C`; // 툴팁 값 온도로 표시
          },
        },
      },
    },
  };
  useEffect(() => {
    axios
      .get(`${backServer}/reservation/todaycustomer/${storeNo}`)
      .then((res) => {
        console.log(res.data);
        setTodayCumstomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storeNo]);
  return (
    <div className="dashboard-body">
      <header className="dashboard-head">
        <h1>금일 매장</h1>
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

      <div className="dashboard">
        <div className="owner-background">
          <img src="/image/200.jpg" alt="back" />
        </div>
        <div className="weather-section">
          {videoUrl && (
            <video className="weather-video" autoPlay loop muted>
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}

          <div className="sm-weather-container">
            <div className="sm-weather-info">
              {weather ? (
                <>
                  <div className="sm-weather-header">
                    <h2>서울날씨</h2>
                    <div className="sm-weather-temp">
                      {Math.round(weather.main.temp)}°C
                    </div>
                    <img
                      src={getWeatherIconUrl(weather.weather[0].icon)}
                      alt={weather.weather[0].description}
                      className="sm-weather-icon"
                    />
                  </div>
                  <div className="sm-weather-details">
                    <p>최고온도: {Math.round(weather.main.temp_max)}°C</p>
                    <p>최저온도: {Math.round(weather.main.temp_min)}°C</p>
                    <p>습도: {weather.main.humidity}%</p>
                    <p>바람: {weather.wind.speed} m/s</p>
                    <p>{weather.weather[0].description}</p>
                  </div>
                  <div className="sm-weather-description">
                    {weather.weather[0].main === "Clear" && (
                      <p>하루종일 구름없는 화창한 날씨가 예상됩니다.</p>
                    )}
                    {weather.weather[0].main === "Clouds" && (
                      <p>부분적으로 구름이 끼는 날씨가 예상됩니다.</p>
                    )}
                    {weather.weather[0].main === "Rain" && (
                      <p>비가 내릴 예정입니다. 우산을 잊지 마세요!</p>
                    )}
                    {weather.weather[0].main === "Thunderstorm" && (
                      <p>천둥번개가 예상됩니다. 주의하세요!</p>
                    )}
                    {weather.weather[0].main === "Snow" && (
                      <p>눈이 올 예정입니다. 따뜻하게 입으세요!</p>
                    )}
                    {weather.weather[0].main === "Mist" && (
                      <p>안개가 끼어 시야가 흐릴 수 있습니다. 조심하세요!</p>
                    )}
                  </div>
                  {/* 요일별 온도 선형 그래프 */}
                  <div className="sm-weather-graph">
                    <Line data={data} options={options} />
                  </div>
                </>
              ) : (
                <p>날씨 정보를 불러오는 중...</p>
              )}
            </div>
          </div>
        </div>

        <div className="sm-bottom-sections">
          {/* 고객관리 컴포넌트 */}
          <div className="sm-customer-management">
            <h2>금일 주요 고객</h2>
            <table>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>방문횟수</th>
                  <th>금일 방문여부</th>
                  <th>등급</th>
                  <th>노쇼횟수</th>
                </tr>
              </thead>
              <tbody>
                {todayCustomer.map((customer, index) => (
                  <tr key={customer.userId}>
                    <td>{customer.userId}</td>
                    <td>{customer.totalReservations}</td>
                    <td>{customer.todayVisit}</td>
                    <td>{customer.grade}</td>
                    <td>{customer.noShow}번</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 금일 예약건 컴포넌트 */}
          <div className="sm-reservations">
            <h2>금일 예약건</h2>
            {reservation.length > 0 ? (
              <table className="sm-table">
                <thead>
                  <tr>
                    <th>순번</th>
                    <th>시간</th>
                    <th>인원수</th>
                    <th>좌석번호</th>
                    <th>아이디</th>
                  </tr>
                </thead>
                <tbody>
                  {reservation.map((reservation, index) => (
                    <tr key={reservation.reserveNo}>
                      <td>{index + 1}</td>
                      <td>{reservation.reserveTime}</td>
                      <td>{reservation.reservePeople}명</td>
                      <td>{reservation.seatNo}번</td>
                      <td>{reservation.userId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>금일 예약된 건이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreDetail;
