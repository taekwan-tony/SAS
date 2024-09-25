import { useState } from "react";
import { parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePicker = (props) => {
  const selected = props.selected;
  const setSelected = props.setSelected;
  const dayNow = props.dayNow;
  let footer = "";
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  const css = `

  button[class^="rdp"] {
  outline: none;
}
  .rdp-root{
    --rdp-accent-color: var(--main1);
    --rdp-font-family-accent: LeeSeoyun;
    --rdp-month_caption-font: bold larger var(--rdp-font-family-accent); /* The font of the month caption. */
    --rdp-weekday-font: 500 smaller var(--rdp-font-family-accent);
    font-size: 20px;
    --rdp-day-height: 3.5rem;
    --rdp-day-width: 3.5rem;
  }
  .rdp-today:not(.rdp-outside) {
    color: var(--main1);
}
    .rdp-chevron {
      fill: var(--main1);
    }
    .rdp-caption {
        display:none;
    }
    .rdp-cell {
// 일자에 마우스올렸을때 변화감지
        cursor: default;
        font-size:18px;
    }
    .rdp-head_cell{
// 요일 폰트 스타일 변경
        font-size:17px;
        font-weight:700;
    }
    .rdp-day.rdp-day_selected{
// 선택일자 스타일변경
        background:#FFC9F4;
  `;
  return (
    <div className="day-picker">
      <style>{css}</style>
      <DayPicker
        locale={ko}
        mode="single" //한개만 선택할 수 있도록
        selected={selected}
        required={true} //필수로 날짜 선택하게
        onSelect={setSelected}
        showOutsideDays={true}
        //오늘 전 날짜는 선택 불가능
        disabled={{ before: new Date() }}
        // 처음 시작할 달 설정, 달력 위에 뜨는 연 월 선택여부
        captionLayout="label"
        defaultMonth={new Date(dayNow)}
        startMonth={new Date(dayNow)}
        endMonth={new Date(dayNow.getFullYear(), dayNow.getMonth() + 3)}
      />
    </div>
  );
};

export default DatePicker;
