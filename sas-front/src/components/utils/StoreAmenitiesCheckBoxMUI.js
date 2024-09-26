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
      {["주차 여부", "키즈존", "반려동물 동반", "단체석"].map((amenity) => (
        <FormControlLabel
          key={amenity}
          control={
            <Checkbox
              value={amenity}
              checked={selectedAmenities.includes(amenity)}
              onChange={handleAmenitiesChange}
              sx={{
                color: "#ccc",
                "&.Mui-checked": {
                  color: "#518142 !important",
                },
              }}
            />
          }
          label={amenity}
          sx={{
            "& .MuiFormControlLabel-label": {
              color: "#fff",
              fontSize: "20px",
              fontFamily: "ns-r",
            },
            marginRight: "100px",
          }}
        />
      ))}
    </FormGroup>
  );
};

export default StoreAmenitiesCheckBoxMUI;
