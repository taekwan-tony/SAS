import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

const PostCodeApi = ({ setStore, setIsModalOpen }) => {
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailedAddress] = useState("");
  const [isOpen, setIsOpen] = useState("false");

  const themeObj = {
    bgColor: "", // 바탕 배경색
    searchBgColor: "", // 검색창 배경색
    contentBgColor: "", // 본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
    pageBgColor: "", // 페이지 배경색
    textColor: "", // 기본 글자색
    queryTextColor: "", // 검색창 글자색
    postcodeTextColor: "", // 우편번호 글자색
    emphTextColor: "#5e9960", // 강조 글자색
    outlineColor: "", // 테두리
  };

  const style = {
    width: "400px",
    height: "600px",
    border: "1.4px solid #333333",
  };

  const completeHandler = (data) => {
    const fullAddress = data.address;
    const zonecode = data.zonecode;

    // 선택된 주소를 StorePartnership으로 전달
    setStore((prevStore) => ({
      ...prevStore,
      storeAddr: `${zonecode} ${fullAddress}`,
    }));

    // 모달 닫기
    setIsModalOpen(false);
  };

  const closeHandler = (state) => {
    if (state === "FORCE_CLOSE") {
      setIsOpen(false);
    } else if (state === "COMPLETE_CLOSE") {
      setIsOpen(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <div>
          <DaumPostcode
            theme={themeObj}
            style={style}
            onComplete={completeHandler}
            onClose={closeHandler}
          />
        </div>
      )}
    </div>
  );
};

export default PostCodeApi;
