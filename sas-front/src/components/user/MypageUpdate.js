import { Route, Routes } from "react-router-dom";
import { loginStoreNoState } from "../utils/RecoilData";
import { useState } from "react";
import { useRecoilState } from "recoil";
import "./mypageUpdate.css";
const MypageUpdate = () => {
  return (
    <div className="update-main">
      <div className="update-content round">
        <h1>회원 정보 수정</h1>
        <Routes>
          <Route path="checkPw" element={<CheckPw />}></Route>
          <Route path="updateForm" element={<Update />}></Route>
        </Routes>
      </div>
    </div>
  );
};

const CheckPw = () => {
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginStoreNoState);
  const [checkPw, setCheckPw] = useState("");
  return (
    <div className="checkPw-wrap">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="checkPw">회원 비밀번호 : </label>
        <input
          type="password"
          id="checkPw"
          value={checkPw}
          onChange={(e) => {
            setCheckPw(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

const Update = () => {
  return (
    <div className="update-frm">
      <div className="update-content">
        <div className="input-box">
          <label htmlFor="userId">아이디</label>
          <input type="text" id="userId" />
        </div>
        <div className="input-box">
          <label htmlFor="userNickname">닉네임</label>
          <input type="text" id="userNickname" />
        </div>
        <div className="input-box">
          <label htmlFor="userPw">비밀번호</label>
          <input type="text" id="userPw" />
        </div>
        <div className="input-box">
          <label htmlFor="userName">이름</label>
          <input type="text" id="userName" />
        </div>
        <div className="input-box">
          <label htmlFor="userGender">성별</label>
          <input type="text" id="userGender" />
        </div>
        <div className="input-box">
          <label htmlFor="userBirth">생년월일</label>
          <input type="text" id="userBirth" />
        </div>
        <div className="input-box">
          <label htmlFor="userPhone">전화번호</label>
          <input type="text" id="userPhone" />
        </div>
        <div className="input-box">
          <label htmlFor="userEmail">이메일</label>
          <input type="text" id="userEmail" />
        </div>
      </div>
      <div className="update-footer">
        <button className="btn-sub round">취소</button>
        <button className="btn-main round">수정</button>
      </div>
    </div>
  );
};

export default MypageUpdate;
