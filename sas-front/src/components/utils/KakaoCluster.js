import {
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
        {positions.map((pos) => (
          <>
            <MapMarker
              key={`${pos.lat}-${pos.lng}`}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
            />
          </>
        ))}
      </MarkerClusterer>
    </Map>
  );
};

export default KakaoCluster;
