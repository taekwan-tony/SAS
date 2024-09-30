import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./mypage.css";
import { loginUserIdState, loginUserNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

const ReserveContent = () => {
  return (
    <div className="reserve-content round">
      <div className="reserve-img"></div>
      <div className="reserve-info">
        <h4 className="reserve-name">매장 이름</h4>
        <span>인원 수</span>
        <span>예약 시간</span>
        <span className="d-day round">d-day</span>
      </div>
    </div>
  );
};

const Profile = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const user = props.user;
  const setUser = props.setUser;
  // const [userImage, setUserImage] = useState(null); ==>최종적으로 필요없으면 지울거임
  const changeUserPhoto = (e) => {
    const files = e.currentTarget.files;
    // console.log(files);
    console.log(files[0]);
    if (files.length !== 0 && files[0] !== 0) {
      const form = new FormData();
      form.append("userImageFile", files[0]);
      form.append("userNo", user.userNo);
      axios
        .patch(`${backServer}/user/updateUserPhoto`, form, {
          // ajax 와 비슷한 속성들..
          contentType: "multipart/form-data", //보내는 데이터 유형 명시
          processData: false, //보내는 데이터를 쿼리 문자열로 처리할건지 여부(default=true)
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.result) {
            setUser({ ...user, userPhoto: res.data.userPhoto });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="profile-wrap">
      <div className="img">
        <img
          src={
            user.userPhoto
              ? `${backServer}/userProfile/${user.userPhoto}`
              : "/image/프로필 기본.png"
          }
          alt=""
        />
        <label htmlFor="userImage">
          <span class="material-icons">edit</span>
        </label>
        <input
          type="file"
          name=""
          id="userImage"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeUserPhoto}
        />
      </div>
      <div className="user-info">
        <h2 className="user-nickName">{user.userNickname}</h2>
        <h3 className="user-Id">{user.userId}</h3>
        <div className="user-info-other">
          <span>{user.userGender}</span>
          <span>{user.userBirth}</span>
          <span>{user.userPhone}</span>
          <span>{user.userEmail}</span>
        </div>
      </div>
      <div className="user-page-info">
        <div className="info-wrap">
          <div className="info-title">
            <span class="material-icons">bookmark</span>
            즐겨찾기
          </div>
          <h3 className="info-count">
            {user.favoriteFolderList ? user.favoriteFolderList.length : 0}
          </h3>
        </div>
        <div className="info-wrap">
          <div className="info-title">
            <span class="material-icons">schedule</span>
            나의 예약
          </div>
          <h3 className="info-count">
            {user.reservationList ? user.reservationList.length : 0}
          </h3>
        </div>
        <div className="info-wrap">
          <div className="info-title">
            <span class="material-icons">assignment</span>
            나의 리뷰
          </div>
          <h3 className="info-count">
            {user.reviewList ? user.reviewList.length : 0}
          </h3>
        </div>
      </div>
    </section>
  );
};

const FavoriteBox = () => {
  return (
    <div className="favorite-list-content round">
      <div className="img"></div>
      <div className="title">
        <h3>
          즐겨찾기 제목 <span className="count">2</span>
        </h3>
      </div>
    </div>
  );
};
const FavoriteBoxEmpty = () => {
  return (
    <div>
      <div className="favorite-list-content round empty">
        <span class="material-icons">add_circle_outline</span>
      </div>
    </div>
  );
};

const EmptyBox = (props) => {
  const text = props.text;
  return (
    <div className="empty round">
      <p className="text">{text}</p>
    </div>
  );
};
const MypageFavorite = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    className: "slider-content",
  };
  return (
    <div className="slider-container favorite-list-content-wrap">
      <Slider {...settings}>
        <FavoriteBox />
        <FavoriteBox />
        <FavoriteBox />
        <FavoriteBox />
        <FavoriteBox />
        <FavoriteBox />
        <FavoriteBox />
        <FavoriteBox />
        <FavoriteBoxEmpty />
      </Slider>
    </div>
  );
};

const ReviewContent = () => {
  return (
    <div className="review-list-content round">
      <div className="img"></div>
      <div className="review-info">
        <h4>매장 이름</h4>
        <div className="star">
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
          <span class="material-icons">star</span>
        </div>
      </div>
    </div>
  );
};

export {
  ReserveContent,
  Profile,
  MypageFavorite,
  FavoriteBox,
  ReviewContent,
  EmptyBox,
};
