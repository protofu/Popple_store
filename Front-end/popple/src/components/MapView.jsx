import { useEffect } from "react";
import styles from "./MapView.module.css";

export default function MapView() {
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
                        center: new window.kakao.maps.LatLng(37.569697009503514, 126.9842772261843), // 위도, 경도
                        level: 3 // 지도의 확대 레벨
                    };
                    // 지도 생성 및 객체 리턴
                    new window.kakao.maps.Map(container, options);
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
    }, []);

    return (
        <div id="map" className="w-full h-full border border-gray-300 rounded-r-lg shadow-lg]"></div>
    );
}
