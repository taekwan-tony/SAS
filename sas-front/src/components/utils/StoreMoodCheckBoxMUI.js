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
              color: "#ccc",
              "&.Mui-checked": {
                color: "#518142 !important",
              },
            }}
          />
        }
        label="데이트"
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
          marginRight: "100px",
        }}
      />
    </FormGroup>
  );
};

export default StoreMoodCheckBoxMUI;
