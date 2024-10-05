import { useRef, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapInfoWindow,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import { Link, useNavigate } from "react-router-dom";

const KakaoCluster = (props) => {
  const positions = props.positions;
  const setStoreNo = props.setStoreNo;
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 37.5338151,
        lng: 126.8969784,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={10} // 지도의 확대 레벨
    >
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={8} // 클러스터 할 최소 지도 레벨
      >
        {positions.map((pos, index) => {
          return (
            <>
              <KakaoMapMakrker
                pos={pos}
                setStoreNo={setStoreNo}
                key={`kakaoMap-index+${index}`}
              />
            </>
          );
        })}
      </MarkerClusterer>
    </Map>
  );
};

const KakaoMapMakrker = (props) => {
  const pos = props.pos;
  const setStoreNo = props.setStoreNo;
  const [isVisible, setIsVisible] = useState(false);
  console.log(isVisible);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  return (
    <>
      <MapMarker
        position={{
          lat: pos.mapX,
          lng: pos.mapY,
        }}
        onClick={() => setIsVisible(true)}
      />
      {isVisible ? ( //isVisible이 true이면 렌더링
        <CustomOverlayMap
          position={{
            lat: pos.mapX,
            lng: pos.mapY,
          }} // 커스텀 오버레이가 나타날 위치
        >
          <div
            className="map-cluster-wrap"
            style={{
              minWidth: "400px",
              transform: "translate(-20px, -200px)",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0px 1px 2px #888",
            }}
          >
            <div className="map-cluster-info">
              <div className="map-cluster-info-title">
                <span>{pos.storeName}</span>
                <span
                  className="material-icons"
                  onClick={() => setIsVisible(false)}
                >
                  close
                </span>
              </div>
              <div className="map-cluster-info-content">
                <div className="map-cluster-info-content-img">
                  <div>
                    {pos.piFilepath ? (
                      <img src={`${backServer}/store/${pos.piFilepath}`} />
                    ) : (
                      <img src="/image/IMG_3238.jpg" />
                    )}
                  </div>
                </div>
                <div className="map-cluster-info-content-detail">
                  <div>
                    <span>주소 : {pos.storeAddr}</span>
                  </div>
                  <div>
                    <span>대표자 : {pos.soName}</span>
                  </div>
                  <div>
                    <span>매장번호 : {pos.storePhone}</span>
                  </div>
                  <div>
                    <span
                      onClick={() => {
                        setStoreNo(pos.storeNo);
                      }}
                    >
                      상세내역 보기
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CustomOverlayMap>
      ) : (
        ""
      )}
    </>
  );
};

export default KakaoCluster;
