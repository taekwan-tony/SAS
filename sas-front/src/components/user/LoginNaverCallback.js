import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  loginUserIdState,
  loginUserNicknameState,
  loginUserNoState,
  userTypeState,
} from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import NicknameData from "./NicknameData.json";
import "./loginNaverCallback.css";

const LoginNaverCallback = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const [loginUserNickname, setLoginUserNickname] = useRecoilState(
    loginUserNicknameState
  );
  const [userType, setUserType] = useRecoilState(userTypeState);
  useEffect(() => {
    // 네이버에서 받아온 코드, state 값 받아오기(에러시 받아올 error, error_description도 받아온다..)
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");

    if (code == null) {
      const error = new URL(window.location.href).searchParams.get("error");
      const error_description = new URL(window.location.href).searchParams.get(
        "error_description"
      );
      // console.log(error);
      // console.log(error_description);
      Swal.fire({
        title: `에러코드 : ${error}`,
        text: error_description,
        icon: "error",
        confirmButtonText: "로그인 화면으로",
        confirmButtonColor: "var(--main1)",
      }).then(() => {
        navigate("/usermain/login");
      });
    } else {
      // console.log(code);
      // console.log(state);
      const clientId = process.env.REACT_APP_NAVER_ID;
      const clientSecret = process.env.REACT_APP_NAVER_SECRET;
      const backServer = process.env.REACT_APP_BACK_SERVER;
      axios
        .post(
          `${backServer}/user/callBack`,
          {
            code: code,
            state: state,
            clientId: clientId,
            clientSecret: clientSecret,
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "http://localhost:3000", //cors 때문에?
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.result === 0) {
            //회원가입해줘야함
            const user = res.data.joinUser;
            user.userNickname =
              NicknameData.determiners[
                Math.floor(Math.random() * NicknameData.determiners.length)
              ] +
              " " +
              NicknameData.animals[
                Math.floor(Math.random() * NicknameData.animals.length)
              ];
            axios
              .post(`${backServer}/user/joinNaver`, user)
              .then((res) => {
                // console.log(res);
                if (res.data.result) {
                  Swal.fire({
                    title: "네이버 아이디와 연동됩니다",
                    icon: "success",
                    confirmButtonColor: "var(--main1)",
                    confirmButtonText: "확인",
                  }).then(() => {
                    setLoginUserId(res.data.loginUser.userId);
                    setUserType(res.data.loginUser.userType);
                    setLoginUserNo(res.data.loginUser.userNo);
                    setLoginUserNickname(res.data.loginUser.userNickname);
                    //로그인 이후 axios 요청 시 발급받은 토큰 값을 자동으로 axios에 추가하는 설정 (이 작업을 하지 않으면 매번 header에 token값을 보내줘야함)==>이제ㅡ Authorization을 키값으로 해서 token값을 받을 수 있음
                    axios.defaults.headers.common["Authorization"] =
                      res.data.loginUser.accessToken;
                    //로그인 이후 상태를 지속적으로 유지시키기 위해 발급받은 refreshToken을 브라우저에 저장==>이제 새로고침을 해도 로그인이 풀리지 않도록 작업할것임 & 자동로그인까지
                    window.localStorage.setItem(
                      "userRefreshToken",
                      res.data.loginUser.refreshToken
                    );
                    navigate("/usermain");
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                Swal.fire({
                  title: "시스템 오류",
                  text: "잠시후 다시 시도해주세요",
                  icon: "error",
                  confirmButtonColor: "var(--main1)",
                  confirmButtonText: "돌아가기",
                }).then(() => {
                  navigate("/usermain/login");
                });
              });
          } else if (res.data.result === 1) {
            //로그인 처리 해줘야함
            setLoginUserId(res.data.loginUser.userId);
            setUserType(res.data.loginUser.userType);
            setLoginUserNo(res.data.loginUser.userNo);
            setLoginUserNickname(res.data.loginUser.userNickname);
            //로그인 이후 axios 요청 시 발급받은 토큰 값을 자동으로 axios에 추가하는 설정 (이 작업을 하지 않으면 매번 header에 token값을 보내줘야함)==>이제ㅡ Authorization을 키값으로 해서 token값을 받을 수 있음
            axios.defaults.headers.common["Authorization"] =
              res.data.loginUser.accessToken;
            //로그인 이후 상태를 지속적으로 유지시키기 위해 발급받은 refreshToken을 브라우저에 저장==>이제 새로고침을 해도 로그인이 풀리지 않도록 작업할것임 & 자동로그인까지
            window.localStorage.setItem(
              "userRefreshToken",
              res.data.loginUser.refreshToken
            );
            navigate("/usermain");
          } else {
            Swal.fire({
              title: "시스템 오류",
              text: "잠시후 다시 시도해주세요",
              icon: "error",
              confirmButtonColor: "var(--main1)",
              confirmButtonText: "돌아가기",
            }).then(() => {
              navigate("/usermain/login");
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "시스템 오류",
            text: "잠시후 다시 시도해주세요",
            icon: "error",
            confirmButtonColor: "var(--main1)",
            confirmButtonText: "돌아가기",
          }).then(() => {
            navigate("/usermain/login");
          });
        });

      //   // 코드 배껴온거 될지 모름
      //   axios
      //     .post(
      //       "https://nid.naver.com/oauth2.0/token",
      //       {
      //         authorizationCode: code,
      //         state: state,
      //       },
      //       {
      //         headers: {
      //           "Content-Type": "application/json;charset=utf-8",
      //           "Access-Control-Allow-Origin": "http://localhost:3000", //cors 때문에?
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       console.log(response);
      //     })
      //     .catch((err) => {
      //       //에러발생 시 경고처리 후 login 페이지로 전환
      //       console.log(err);
      //       //   window.location.href = "/login";
      //     });

      //   //   axios
      //   //     .post(
      //   //       `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&state=${state}`,
      //   //       {
      //   //         headers: {
      //   //           "Content-Type": "application/json;charset=utf-8",
      //   //           "Access-Control-Allow-Origin": "*", //cors 때문에?
      //   //         },
      //   //       }
      //   //     )
      //   //     .then((res) => {
      //   //       console.log(res);
      //   //     })
      //   //     .catch((err) => {
      //   //       console.log(err);
      //   //     });

      //   //post 지랄맞게 안되서 해본거.. 받아오기 하는데 어떻게 redirect 해야할지 모름
      //   // window.location.href = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}&state=${state}`;
      //   // const accessToken = new URL(window.location.href).searchParams.get(
      //   //   "access_token"
      //   // );
      //   // console.log(accessToken);
    }
  }, []);
  return (
    <div className="naver-loading-main">
      <span className="naver-login-loader"></span>
    </div>
  );
};

export default LoginNaverCallback;
