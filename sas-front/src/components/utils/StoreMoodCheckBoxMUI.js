import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const StoreMoodCheckBoxMUI = ({ onMoodChange }) => {
  const [selectedMoods, setSelectedMoods] = React.useState([]);

  const handleMoodChange = (event) => {
    const { value, checked } = event.target;
    setSelectedMoods((prev) =>
      checked ? [...prev, value] : prev.filter((mood) => mood !== value)
    );
    onMoodChange(event); // 부모 컴포넌트에 상태 전달
  };

  return (
    <FormGroup row>
      {["데이트", "단체", "조용한", "트렌디한"].map((mood) => (
        <FormControlLabel
          key={mood}
          control={
            <Checkbox
              value={mood}
              checked={selectedMoods.includes(mood)}
              onChange={handleMoodChange}
              sx={{
                color: "#ccc",
                "&.Mui-checked": {
                  color: "#518142 !important",
                },
              }}
            />
          }
          label={mood}
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

export default StoreMoodCheckBoxMUI;
