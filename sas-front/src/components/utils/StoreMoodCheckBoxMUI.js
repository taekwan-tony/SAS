import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const StoreMoodCheckBoxMUI = () => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "#ccc", // 체크박스 기본 색상
              "&.Mui-checked": {
                color: "#518142 !important", // 체크박스 선택 시 색상 (우선순위 높임)
              },
            }}
          />
        }
        label="데이트"
        sx={{
          "& .MuiFormControlLabel-label": {
            color: "#fff", // 라벨 글씨 색상
            fontSize: "20px", // 라벨 폰트 크기
            fontFamily: "ns-r",
          },
          marginRight: "100px",
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "#ccc",
              "&.Mui-checked": {
                color: "#518142 !important",
              },
            }}
          />
        }
        label="단체"
        sx={{
          "& .MuiFormControlLabel-label": {
            color: "#fff",
            fontSize: "20px",
            fontFamily: "ns-r",
          },
          marginRight: "100px",
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "#ccc",
              "&.Mui-checked": {
                color: "#518142 !important",
              },
            }}
          />
        }
        label="조용한"
        sx={{
          "& .MuiFormControlLabel-label": {
            color: "#fff",
            fontSize: "20px",
            fontFamily: "ns-r",
          },
          marginRight: "100px",
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: "#ccc",
              "&.Mui-checked": {
                color: "#518142 !important",
              },
            }}
          />
        }
        label="트렌디한"
        sx={{
          "& .MuiFormControlLabel-label": {
            color: "#fff",
            fontSize: "20px",
            fontFamily: "ns-r",
          },
        }}
      />
    </FormGroup>
  );
};

export default StoreMoodCheckBoxMUI;
