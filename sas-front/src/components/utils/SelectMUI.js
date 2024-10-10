import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const selectMUI = ({ value, onChange }) => {
  return (
    <Box sx={{ minWidth: "130px" }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color: "#544f4f", // 기본 상태에서의 색상
            fontFamily: "ns-r",
            "&.Mui-focused": {
              color: "#fff", // 선택(포커스) 상태에서의 색상
              fontSize: "24px",
            },
          }}
        >
          유형
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="매장 유형"
          onChange={onChange}
          sx={{
            fontFamily: "ns-r",
            fontSize: "24px",
            color: "#544f4f",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff", // 보더 색상
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff", // 선택된 상태일 때의 보더 색상
            },
            borderRadius: "8px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff", // Hover 상태에서 보더 색상
            },
            "&.Mui-focused": {
              color: "#fff", // 선택(포커스) 상태에서의 색상
            },
          }}
        >
          <MenuItem value={1}>한식</MenuItem>
          <MenuItem value={2}>중식</MenuItem>
          <MenuItem value={3}>양식</MenuItem>
          <MenuItem value={4}>일식</MenuItem>
          <MenuItem value={5}>분식</MenuItem>
          <MenuItem value={0}>기타</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default selectMUI;
