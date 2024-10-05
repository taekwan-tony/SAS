import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./mypage.css";
import { loginUserIdState, loginUserNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

const ReserveContent = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const reserve = props.reserve;
  const [reserveDate, setReserveDate] = useState(
    reserve.reserveDate
      ? new Date(reserve.reserveDate).getTime()
      : new Date().getTime()
  );
  const today = new Date().getTime();
  const dDay = Math.ceil((reserveDate - today) / (1000 * 60 * 60 * 24));
  return (
    <div className="reserve-content round mypage-class-for-img">
      <div className="reserve-img">
        {reserve.storeImage ? (
          <img src={`${backServer}/store/${reserve.storeImage}`} alt="" />
        ) : (
          <img src={"/image/s&s로고.png"} alt="" />
        )}
      </div>
      <div className="reserve-info">
        <h4 className="reserve-name">{reserve.storeName}</h4>
        <span>{reserve.reservePeople + " 명"}</span>
        <span>{`${reserve.reserveDateString} ${reserve.reserveTime}`}</span>
        <span className={dDay > 0 ? "round d-day" : "round d-day ok"}>
          {dDay > 0 ? `d-${dDay}` : "d-day"}
        </span>
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
          <h3 className="info-count">{user.favoriteCount}</h3>
        </div>
        <div className="info-wrap">
          <div className="info-title">
            <span class="material-icons">schedule</span>
            나의 예약
          </div>
          <h3 className="info-count">{user.reservationCount}</h3>
        </div>
        <div className="info-wrap">
          <div className="info-title">
            <span class="material-icons">assignment</span>
            나의 리뷰
          </div>
          <h3 className="info-count">{user.reviewCount}</h3>
        </div>
      </div>
    </section>
  );
};

const FavoriteBox = (props) => {
  const favorite = props.favorite;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [favoriteList, setFavoriteList] = useState(
    favorite.favoriteList
      ? favorite.favoriteList.filter((favoriteBox) => {
          return favoriteBox.storeImage != null;
        })
      : []
  );
  return (
    <div className="favorite-list-content round mypage-class-for-img">
      <div className="img favorite-list">
        <img src={"/image/s&s로고.png"} alt="" />
        <div className="img-list">
          {favoriteList.map((favoriteBox, index) => {
            if (index < 5) {
              return (
                <img
                  src={`${backServer}/store/${favoriteBox.storeImage}`}
                  style={{ left: `${(index + 1) * 20}px` }}
                  alt=""
                />
              );
            }
          })}
        </div>
      </div>
      <div className="title">
        <h3>
          {favorite ? favorite.favoriteFolderName : ""}{" "}
          <span className="count">{favorite.favoriteList.length}</span>
        </h3>
      </div>
    </div>
  );
};
const FavoriteBoxEmpty = (props) => {
  const addFolderModalOpen = props.addFolderModalOpen;
  return (
    <div>
      <div className="favorite-list-content round empty">
        <span class="material-icons" onClick={addFolderModalOpen}>
          add_circle_outline
        </span>
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
const MypageFavorite = (props) => {
  const favoriteFolderList = props.favoriteFolderList;
  const addFolderModalOpen = props.addFolderModalOpen;
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
      {favoriteFolderList != null && favoriteFolderList.length > 1 ? (
        <Slider {...settings}>
          {favoriteFolderList
            ? favoriteFolderList.map((favorite, index) => {
                return <FavoriteBox favorite={favorite} />;
              })
            : ""}

          <FavoriteBoxEmpty addFolderModalOpen={addFolderModalOpen} />
        </Slider>
      ) : (
        <>
          {favoriteFolderList
            ? favoriteFolderList.map((favorite, index) => {
                return <FavoriteBox favorite={favorite} />;
              })
            : ""}
          <FavoriteBoxEmpty addFolderModalOpen={addFolderModalOpen} />
        </>
      )}
    </div>
  );
};

const ReviewContent = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const review = props.review;
  const [starArr, setStarArr] = useState([]);
  useEffect(() => {
    starArr.splice(0, starArr.length);
    for (let i = 0; i < review.reviewScore; i++) {
      starArr.push("star");
    }
    setStarArr(starArr);
  }, []);

  return (
    <div className="review-list-content round mypage-class-for-img">
      <div className="img">
        {review.storeImage ? (
          <img src={`${backServer}/store/${review.storeImage}`} alt="" />
        ) : (
          <img src={"/image/s&s로고.png"} alt="" />
        )}
      </div>
      <div className="review-info">
        <h4>{review.storeName}</h4>
        <div className="star">
          {starArr.map((star) => {
            return <span class="material-icons">{star}</span>;
          })}
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
