import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./recal.css"; // 달력 스타일을 추가할 수 있는 CSS 파일

function CalendarComponent() {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth" // 기본적으로 월간 달력 뷰로 설정
        events={[
          // 예시로 표시할 이벤트들
          { title: "이벤트 1", date: "2024-10-01" },
          { title: "이벤트 2", date: "2024-10-07" },
        ]}
      />
    </div>
  );
}

export default CalendarComponent;
