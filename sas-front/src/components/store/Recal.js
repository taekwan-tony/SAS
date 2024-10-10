import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./recal.css"; // 달력 스타일을 추가할 수 있는 CSS 파일

function Recal({ events }) {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth" // 기본적으로 월간 달력 뷰로 설정
        events={events} // 부모 컴포넌트로부터 받은 events를 사용
        timeZone="local"
        dayMaxEventRows={3} // 한 셀에 최대 3개의 이벤트만 표시
        moreLinkText="더 보기" // 더 보기 링크 텍스트
      />
    </div>
  );
}

export default Recal;
