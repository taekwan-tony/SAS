import { useRef, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapInfoWindow,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";

const KakaoCluster = (props) => {
  const positions = props.positions;
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 36.2683,
        lng: 127.6358,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={14} // 지도의 확대 레벨
    >
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={10} // 클러스터 할 최소 지도 레벨
      >
        {positions.map((pos) => {
          return (
            <>
              <KakaoMapMakrker pos={pos} key={"index-" + pos.lat} />
            </>
          );
        })}
      </MarkerClusterer>
    </Map>
  );
};

const KakaoMapMakrker = (props) => {
  const pos = props.pos;
  const [isVisible, setIsVisible] = useState(false);
  console.log(pos.title);
  return (
    <>
      <MapMarker
        position={{
          lat: pos.lat,
          lng: pos.lng,
        }}
        onClick={() => setIsVisible(true)}
      />
      {isVisible ? ( //isVisible이 true이면 렌더링
        <CustomOverlayMap
          position={{
            lat: pos.lat,
            lng: pos.lng,
          }} // 커스텀 오버레이가 나타날 위치
        >
          <div
            className="map-cluster-wrap"
            style={{
              width: "300px",
              transform: "translate(-20px, -100px)",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0px 1px 2px #888",
            }}
          >
            <div className="map-cluster-info">
              <div className="map-cluster-info-title">
                <span>{pos.title}</span>
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
