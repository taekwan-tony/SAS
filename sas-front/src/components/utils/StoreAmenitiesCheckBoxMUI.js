import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const StoreAmenitiesCheckBoxMUI = (props) => {
  const setStoreAmenities = props.setStoreAmenities;
  const amenity = [
    { name: "주차 가능" },
    { name: "키즈존" },
    { name: "반려동물 동반" },
    { name: "단체석" },
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
    setStoreAmenities(checkedList);
  }, [checkedList, setStoreAmenities]);

  console.log(checkedList);

  return (
    <FormGroup row>
      {amenity.map((item) => (
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
