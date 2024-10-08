import { useEffect, useState } from "react";
import { MypageFavorite } from "./MypageContent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { loginUserNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const FavoriteMain = (props) => {
  const {
    addFolderModalOpen,
    checkAddFolder,
    setCheckUpdate,
    favoriteFolderList,
    favoriteCount,
    setFavoriteFolder,
    favoriteFolder,
  } = props;

  return (
    <div className="favorite-main-wrap">
      <section className="mypage-list-wrap favorite-list">
        <h3 className="title">
          즐겨찾기 목록{" "}
          <span className="count">
            {favoriteFolderList ? favoriteFolderList.length : 0}
          </span>
        </h3>
        <MypageFavorite
          favoriteFolderList={favoriteFolderList}
          addFolderModalOpen={addFolderModalOpen}
          setFavoriteFolder={setFavoriteFolder}
        />
      </section>
      <section className="favorite-contents-list-wrap mypage-list-wrap">
        <FavoriteList
          favoriteFolder={favoriteFolder}
          checkUpdate={checkAddFolder}
          setCheckUpdate={setCheckUpdate}
          setFavoriteFolder={setFavoriteFolder}
        />
      </section>
    </div>
  );
};

const FavoriteList = (props) => {
  const [loginUserNo, setLoginUserNo] = useRecoilState(loginUserNoState);
  const { favoriteFolder, setCheckUpdate, checkUpdate, setFavoriteFolder } =
    props;
  // 더보기 버튼?
  const [favoriteFolderIndex, setFavoriteFolderIndex] = useState([]);
  const [favoriteIndex, setFavoriteIndex] = useState(5);
  useEffect(() => {
    //폴더가 바뀌었을때 인덱스 초기화
    setFavoriteIndex(5);
  }, [favoriteFolder]);
  useEffect(() => {
    //인덱스나 폴더 바뀔때 보여질 폴더리스트 초기화
    setFavoriteFolderIndex(
      favoriteFolder.favoriteList
        ? favoriteFolder.favoriteList.filter((favorite, index) => {
            return index < favoriteIndex;
          })
        : []
    );
  }, [favoriteIndex, favoriteFolder]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const deleteFolder = () => {
    Swal.fire({
      title: "즐겨찾기 목록을 삭제하시겠습니까?",
      text: "즐겨찾기는 기본폴더로 들어갑니다.",
      icon: "question",
      iconColor: "var(--main1)",
      showCancelButton: true,
      cancelButtonColor: "var(--font2)",
      cancelButtonText: "취소",
      confirmButtonText: "모두 삭제",
      confirmButtonColor: "var(--main1)",
      showDenyButton: true,
      denyButtonText: "기본 폴더로 이동",
      denyButtonColor: "var(--font3)",
      customClass: {
        cancelButton: "swal-btn-favorite",
        denyButton: "swal-btn-favorite",
        confirmButton: "swal-btn-favorite",
      },
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `${backServer}/favorite/favoriteFolderNo/${favoriteFolder.favoriteFolderNo}`
          )
          .then((res) => {
            if (res.data) {
              Swal.fire({
                title: "삭제 완료",
                icon: "success",
                confirmButtonColor: "var(--main1)",
                confirmButtonText: "확인",
              }).then(() => {
                setCheckUpdate(!checkUpdate);
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (res.isDenied) {
        console.log(loginUserNo);
        axios
          .delete(
            `${backServer}/favorite/favoriteFolderNo/${favoriteFolder.favoriteFolderNo}/userNo/${loginUserNo}/moveFavorite`
          )
          .then((res) => {
            if (res.data) {
              Swal.fire({
                title: "삭제 완료",
                icon: "success",
                confirmButtonColor: "var(--main1)",
                confirmButtonText: "확인",
              }).then(() => {
                setCheckUpdate(!checkUpdate);
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <>
      <h3 className="title">
        {favoriteFolder.favoriteFolderName
          ? favoriteFolder.favoriteFolderName
          : ""}{" "}
        <span className="count">
          {favoriteFolder.favoriteList ? favoriteFolder.favoriteList.length : 0}
        </span>
        <div className="folder-btn-box">
          {favoriteFolder.favoriteFolderName &&
          favoriteFolder.favoriteFolderName === "기본폴더" ? (
            ""
          ) : (
            <button className="delete-btn btn-a" onClick={deleteFolder}>
              목록 삭제
            </button>
          )}

          <Link to="/usermain/searchList" className="btn-a">
            즐겨찾기 추가하러 가기
          </Link>
        </div>
      </h3>
      <div className="favorite-list-content-wrap">
        {favoriteFolder.favoriteList &&
        favoriteFolder.favoriteList.length > 0 ? (
          favoriteFolderIndex.map((favorite, index) => {
            const deleteFavorite = () => {
              axios
                .delete(
                  `${backServer}/favorite/favoriteNo/${favorite.favoriteNo}`
                )
                .then((res) => {
                  if (res.data) {
                    setCheckUpdate(!checkUpdate);
                    setFavoriteFolder(favoriteFolder);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            };
            return (
              <Favorite
                key={"favorite" + index}
                favorite={favorite}
                deleteFavorite={deleteFavorite}
              />
            );
          })
        ) : (
          <div className="empty-msg">
            <span>즐겨찾기가 존재하지 않습니다.</span>
          </div>
        )}
        {favoriteFolder.favoriteList &&
        favoriteFolder.favoriteList.length > favoriteIndex ? (
          <div className="btn-box more">
            <button
              className="btn-a round"
              onClick={() => {
                setFavoriteIndex(favoriteIndex + 5);
              }}
            >
              더보기
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const Favorite = (props) => {
  const navigate = useNavigate();
  const favorite = props.favorite;
  const deleteFavorite = props.deleteFavorite;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [store, setStore] = useState({});
  useEffect(() => {
    axios
      .get(
        `${backServer}/store/storeNo/${favorite.storeNo}/getStoreInfoFavorite`
      )
      .then((res) => {
        // console.log(res);
        setStore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [favorite]);
  return (
    <div
      className="favorite-one-content-wrap"
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/usermain/menuview/${favorite.storeNo}/menuview`);
      }}
    >
      <div className="img">
        <img
          src={
            favorite.storeImage
              ? `${backServer}/store/${favorite.storeImage}`
              : "/image/s&s로고.png"
          }
          alt=""
        />
      </div>
      <div className="favorite-info">
        <h3 className="info">{store.storeName}</h3>
        <h4 className="info">
          <span class="material-icons favorite-star">star</span>
          {` (${store.reviewScoreAvg})`}
        </h4>
        <span className="info">{store.storeTime}</span>
        <span className="info">{store.storeAddr}</span>
        <span className="info introduce">{store.storeIntroduce}</span>
      </div>
      <div className="favorite-btn-box">
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteFavorite();
          }}
        >
          <span class="material-icons favorite-star">bookmark</span>
        </button>
      </div>
    </div>
  );
};

export default FavoriteMain;
