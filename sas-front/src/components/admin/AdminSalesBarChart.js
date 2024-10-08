import axios from "axios";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Bar } from "react-chartjs-2";

const AdminSalesBarChart = (props) => {
  const [salesValue, setSalesValue] = useState(0);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const yearData = props.yearData; // select 사용 value 값
  const setYearData = props.setYearData;
  //바차트 연간 사용 라벨
  const [yearValue, setYearValue] = useState(null); // 쿼리 조건절 값
  const [barChartData, setBarChartData] = useState([]);
  const monthLabels = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const [labels, setLabels] = useState([]);
  const handleChange = (event) => {
    setYearValue(event.target.value);
  };
  const handleSalesChange = (e) => {
    setSalesValue(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`${backServer}/admin/yearSalesBarChart/${salesValue}/${yearValue}`)
      .then((res) => {
        console.log(res);
        setBarChartData(res.data);
        if (salesValue == 0) {
          setLabels(yearData);
          setYearValue(yearData[0]);
        } else {
          setLabels(monthLabels);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [salesValue, yearValue, yearData, backServer]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "매출 그래프",
        data: barChartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="admin-management-sales-salesBarChart-select">
        {salesValue != 0 ? (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select value={yearValue} onChange={handleChange} displayEmpty>
              {yearData.map((year, index) => {
                return (
                  <MenuItem key={"year-" + index} value={year}>
                    {year}년
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : (
          ""
        )}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={salesValue} onChange={handleSalesChange} displayEmpty>
            <MenuItem value={0}>년도별</MenuItem>
            <MenuItem value={1}>월별</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="admin-management-sales-salesBarChart-chart">
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default AdminSalesBarChart;
