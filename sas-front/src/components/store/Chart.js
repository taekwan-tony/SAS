import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// 차트 데이터와 옵션을 정의한 객체
export const chartData = {
  lineData: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "이번달 매출",
        data: [200, 300, 400, 500, 400, 350, 450, 500, 350, 450, 250, 330],
        borderColor: "#1e90ff",
        backgroundColor: "rgba(30, 144, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "지난달 매출",
        data: [150, 250, 350, 450, 300, 320, 400, 470, 300, 400, 280, 320],
        borderColor: "#20c997",
        backgroundColor: "rgba(32, 201, 151, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  },

  //매장직원
  employeedata: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "홀직원",
        data: [15, 25, 35, 40, 45, 60, 80, 60, 65, 70, 75, 85],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "주방직원",
        data: [5, 15, 25, 35, 50, 65, 70, 75, 70, 65, 63, 66],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  },
};

export const chartOptions = {
  employeeOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "매장 내 직원 수",
        color: "white",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  },

  generalOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  },
};

// 차트 컴포넌트
function Chart({ type, data, options }) {
  if (type === "bar") {
    return <Bar data={data} options={options} />;
  } else if (type === "line") {
    return <Line data={data} options={options} />;
  } else if (type === "doughnut") {
    return <Doughnut data={data} options={options} />; // 도넛 차트 처리
  } else {
    return <div>올바른 차트 타입을 입력하세요.</div>; // 올바른 타입이 아닌 경우 처리
  }
}

export default Chart;
