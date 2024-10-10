import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const StoreMoodCheckBoxMUI = (props) => {
  const setStoreMood = props.setStoreMood;
  const moods = [
    { name: "데이트" },
    { name: "단체" },
    { name: "조용한" },
    { name: "트렌디한" },
  ];

  const [checkedList, setCheckedList] = React.useState([]); // 배열로 초기화

  const onCheckedItem = React.useCallback(
    (checked, item) => {
      setCheckedList((prev) => {
        // 상태를 안전하게 업데이트하기 위해 prev 사용
        if (checked) {
          return [...prev, item]; // 체크된 항목을 추가
        } else {
          return prev.filter((el) => el !== item); // 체크 해제된 항목을 제거
        }
      });
    },
    [checkedList]
  );

  React.useEffect(() => {
    setStoreMood(checkedList);
  }, [checkedList, setStoreMood]);

  return (
    <FormGroup row>
      {moods.map((item) => (
        <FormControlLabel
          key={item.name}
          control={
            <Checkbox
              id={item.name}
              onChange={(e) => {
                onCheckedItem(e.target.checked, e.target.id);
              }}
              sx={{
                color: "#ccc",
                "&.Mui-checked": {
                  color: "#518142 !important",
                },
              }}
            />
          }
          label={item.name}
          sx={{
            "& .MuiFormControlLabel-label": {
              color: "#fff",
              fontSize: "24px",
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
