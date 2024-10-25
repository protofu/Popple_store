import { useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

export default function MapComp({ latitude, longitude, keyword }) {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_CLIENT_ID, // 발급 받은 APPKEY
    autoload: true, // 자동 로드 여부
    libraries: ['services', 'clusterer'], // 필요한 라이브러리
  });

  const [info, setInfo] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map || !window.kakao) return; // kakao가 로드되었는지 확인

    if (!keyword) return; // keyword가 없으면 검색을 건너뜁니다.

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers = []; // 새로운 마커 배열

        for (const place of data) {
          const markerPosition = {
            lat: place.y,
            lng: place.x,
          };

          newMarkers.push({
            position: markerPosition,
            content: place.place_name,
          });

          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
        }

        setMarkers(newMarkers);
        map.setBounds(bounds); // 검색된 장소 위치를 기준으로 지도 범위 재설정
      } else {
        console.error("Place search error:", status); // 오류 처리
      }
    });
  }, [latitude, longitude, keyword, map]);

  if (loading) return <div>Loading...</div>; // 로딩 상태 표시
  if (error) return <div>Error loading map</div>; // 오류 상태 표시

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      className="w-full h-full border border-gray-300 rounded-lg shadow-lg"
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && (
            <div style={{ color: "#000" }}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
}
