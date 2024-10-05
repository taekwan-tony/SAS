import { useEffect, useState } from "react";
import { MypageFavorite } from "./MypageContent";
import { Link } from "react-router-dom";
import axios from "axios";

const FavoriteMain = (props) => {
  const {
    addFolderModalOpen,
    checkAddFolder,
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
        <FavoriteList favoriteFolder={favoriteFolder} />
      </section>
    </div>
  );
};

const FavoriteList = (props) => {
  const favoriteFolder = props.favoriteFolder;
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
          <button className="delete-btn btn-a">목록 삭제</button>
          <Link to="#" className="btn-a">
            즐겨찾기 추가하러 가기
          </Link>
        </div>
      </h3>
      <div className="favorite-list-content-wrap">
        {favoriteFolder.favoriteList &&
        favoriteFolder.favoriteList.length > 0 ? (
          favoriteFolder.favoriteList.map((favorite, index) => {
            return <Favorite key={"favorite" + index} favorite={favorite} />;
          })
        ) : (
          <div className="empty-msg">
            <span>즐겨찾기가 존재하지 않습니다.</span>
          </div>
        )}
      </div>
    </>
  );
};

const Favorite = (props) => {
  const favorite = props.favorite;
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
    <div className="favorite-one-content-wrap">
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
        <button>
          <span class="material-icons favorite-star">bookmark</span>
        </button>
      </div>
    </div>
  );
};

export default FavoriteMain;
