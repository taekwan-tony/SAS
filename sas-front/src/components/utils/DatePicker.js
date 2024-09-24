import { useState } from "react";
import { parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePicker = () => {
  const [selected, setSelected] = useState();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  return (
    <DayPicker
      locale={ko}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  );
};

export default DatePicker;
