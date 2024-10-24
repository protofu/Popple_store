import { useEffect } from "react";

export default function MapView({ latitude, longitude }) {

    useEffect(() => {
        // Kakao Maps API 스크립트 태그 생성
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_CLIENT_ID}&autoload=false`;
        script.async = true;
        script.onload = () => {
            // kakao 객체가 제대로 로드되었는지 확인
            if (window.kakao && window.kakao.maps) {
                // kakao.maps.load()를 사용하여 API가 완전히 로드된 후 콜백 함수 실행
                window.kakao.maps.load(() => {
                    // 지도를 담을 영역의 DOM 레퍼런스
                    const container = document.getElementById('map');
                    // 지도 생성 기본 옵션
                    const options = {
                        center: new window.kakao.maps.LatLng(longitude, latitude), // 경도, 위도
                        level: 3 // 지도의 확대 레벨
                    };
                    // 지도 생성 및 객체 리턴
                    const map = new window.kakao.maps.Map(container, options);

                    // 마커가 표시될 위치
                    const markerPosition = new window.kakao.maps.LatLng(longitude, latitude); 

                    // 마커를 생성
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition
                    });

                    // 마커가 지도 위에 표시
                    marker.setMap(map);

                    var iwContent = '인포윈도우', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능
                    iwPosition = new window.kakao.maps.LatLng(longitude, latitude); //인포윈도우 표시 위치

                    // 인포윈도우를 생성
                    var infowindow = new window.kakao.maps.InfoWindow({
                        position : iwPosition, 
                        content : iwContent 
                    });

                    infowindow.open(map, marker); 
                });
            } else {
                console.error('Kakao Maps API가 로드되지 않았습니다.');
            }
        };
        script.onerror = () => {
            console.error('Kakao Maps API 스크립트 로드 중 오류가 발생했습니다.');
        };
        // 문서의 head 태그에 스크립트 태그를 추가하여 로드 시작
        document.head.appendChild(script);
    }, [longitude, latitude]);

    return (
        <div id="map" className="w-full h-full border border-gray-300 rounded-r-lg shadow-lg]"></div>
    );
}
