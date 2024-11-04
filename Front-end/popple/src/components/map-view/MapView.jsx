import { useEffect, useState } from "react";

export default function MapView({ latitude, longitude, keyword, poppleLocations, onResultsUpdate }) {
    const [results, setResults] = useState([]);
    console.log(keyword);
    
    useEffect(() => {
        if (!window.kakao) {
            const script = document.createElement('script');
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_CLIENT_ID}&libraries=services`;
            script.async = true;
            script.onload = initializeMap;
            document.head.appendChild(script);

            script.onerror = () => {
                console.error('Kakao Maps API 스크립트 로드 중 오류가 발생했습니다.');
            };
        } else {
            initializeMap();
        }
    }, [longitude, latitude, poppleLocations]);

    const initializeMap = () => {
        if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
                let markers = [];
                const container = document.getElementById('map');
                const options = {
                    // 최초 지도 중심 위치
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    // 지도 확대 레벨
                    level: 3
                };
                const map = new window.kakao.maps.Map(container, options);

                const location = poppleLocations[0]?.location;
                if (location && location.length === 2) {
                    const firstPlacePosition = new kakao.maps.LatLng(Number(location[1]), Number(location[0]));
                    map.setCenter(firstPlacePosition);
                }
                
                for (let i = 0; i < poppleLocations.length; i ++) {
                    const location = poppleLocations[i].location;

                    if (location && location.length === 2) {
                        const marker = new kakao.maps.Marker({  
                            id: poppleLocations[i].id,
                            map: map,
                            position: new kakao.maps.LatLng(Number(location[1]), Number(location[0])),
                            title: poppleLocations[i].exhibitionName,
                        });
                    } else {
                        console.log(`${poppleLocations[i].title} 은 위치 확인 불가능`);
                    }
                }
            });
        } else {
            console.error('Kakao Maps API가 로드되지 않았습니다.');
        }
    };

    return (
        <div id="map" className="w-full h-full border border-gray-300 rounded-r-lg shadow-lg"></div>
    );
}
