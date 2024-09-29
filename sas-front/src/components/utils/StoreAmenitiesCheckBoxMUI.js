import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const StoreAmenitiesCheckBoxMUI = ({ onAmenitiesChange }) => {
  const [selectedAmenities, setSelectedAmenities] = React.useState([]);

  const handleAmenitiesChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((amenity) => amenity !== value)
    );
    onAmenitiesChange(event); // 부모 컴포넌트에 상태 전달
  };

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
        label="주차 여부"
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
        label="키즈존"
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
        label="반려동물 동반"
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
        label="단체석"
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

export default StoreAmenitiesCheckBoxMUI;
