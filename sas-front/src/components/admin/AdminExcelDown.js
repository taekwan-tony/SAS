import Swal from "sweetalert2";
import XLSX from "xlsx-js-style";

const AdminExcelDown = (props) => {
  const salesDetailList = props.salesDetailList;
  const totalUser = props.totalUser;
  const totalPrice = props.totalPrice;
  const prohibitDown = (e) => {
    Swal.fire({
      icon: "info",
      title: "엑셀다운불가",
      text: "다운로드할 정보가 없습니다.",
    });
  };

  const excelDown = () => {
    try {
      console.log("excelDown 호출");

      // Excel 파일 생성 및 다운로드
      const wb = XLSX.utils.book_new();
      const headerStyle = {
        font: {
          bold: true,
          color: { rgb: "000000" },
          name: "함초롱바탕",
          sz: 13,
        },
        fill: { fgColor: { rgb: "BC8F8F" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          left: { style: "thin", color: { auto: 1 } },
          right: { style: "thin", color: { auto: 1 } },
          top: { style: "thin", color: { auto: 1 } },
          bottom: { style: "thin", color: { auto: 1 } },
        },
      };
      const dataStyle = {
        font: { color: { rgb: "000000" }, name: "함초롱바탕", sz: 11 },
        fill: { fgColor: { rgb: "FFFAFA" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          left: { style: "thin", color: { auto: 1 } },
          right: { style: "thin", color: { auto: 1 } },
          top: { style: "thin", color: { auto: 1 } },
          bottom: { style: "thin", color: { auto: 1 } },
        },
      };

      // 열의 폭을 정의
      const colWidths = [80, 120, 80, 80, 130];

      // cols 속성을 사용하여 각 열의 폭을 조절
      const cols = colWidths.map((width) => ({ wpx: width }));

      const headerRow = [
        { v: "순서", t: "s", s: headerStyle },
        { v: "고유번호", t: "s", s: headerStyle },
        { v: "매장", t: "s", s: headerStyle },
        { v: "주소", t: "s", s: headerStyle },
        { v: "사업자명", t: "s", s: headerStyle },
        { v: "사업자번호", t: "s", s: headerStyle },
        { v: "금액", t: "s", s: headerStyle },
        { v: "이용자수", t: "s", s: headerStyle },
        { v: "이용료", t: "s", s: headerStyle },
        { v: "등록일", t: "s", s: headerStyle },
      ];

      const dataRows = salesDetailList.map((detail) => [
        { v: detail.rnum, t: "s", s: dataStyle }, // 순서
        { v: detail.storeNo, t: "s", s: dataStyle }, // 고유번호
        { v: detail.storeName, t: "s", s: dataStyle }, // 매장
        { v: detail.storeAddr, t: "s", s: dataStyle }, // 주소
        { v: detail.soName, t: "s", s: dataStyle }, // 사업자명
        { v: detail.businessNumber, t: "s", s: dataStyle }, // 사업자번호
        { v: detail.storeTotalPrice, t: "s", s: dataStyle }, // 금액
        { v: detail.storeTotalUsingCount, t: "s", s: dataStyle }, // 이용자수
        { v: detail.servicePrice, t: "s", s: dataStyle }, // 이용료
        { v: detail.storeEnrollDate, t: "s", s: dataStyle }, // 등록일
      ]);

      dataRows.push([
        { v: "" }, // 순서
        { v: "" }, // 고유번호
        { v: "" }, // 매장
        { v: "" }, // 주소
        { v: "" }, // 사업자명
        { v: "" }, // 사업자번호
        { v: totalPrice }, // 금액
        { v: totalUser }, // 이용자수
        { v: "" }, // 이용료
        { v: "" }, // 등록일
      ]);

      const rows = [headerRow, ...dataRows];

      // 새로운 Sheet 객체 생성
      const ws = XLSX.utils.aoa_to_sheet(rows);

      // cols 속성 적용
      ws["!cols"] = cols;

      // workbook에 추가
      XLSX.utils.book_append_sheet(wb, ws, "매출 상세 정보");

      // 파일 다운로드
      XLSX.writeFile(wb, "Sales_detail_list.xlsx");

      console.log("Excel 파일 생성 및 다운로드 완료");
    } catch (error) {
      console.error("Error occurred while downloading Excel", error);
    }
  };
  return (
    <button
      className="btn-main round"
      onClick={salesDetailList.length != 0 ? excelDown : prohibitDown}
    >
      엑셀 다운로드
    </button>
  );
};

export default AdminExcelDown;
