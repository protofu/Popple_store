import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MapView({ latitude, longitude, poppleLocations }) {
    const posterURL = import.meta.env.VITE_EXHIBITION_POSTER;
    const navigate = useNavigate();
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
                
                for (let i = 0; i < poppleLocations.length; i ++) {
                    const location = poppleLocations[i].location;

                    if (location && location.length === 2) {
                        const marker = new kakao.maps.Marker({  
                            id: poppleLocations[i].id,
                            map: map,
                            position: new kakao.maps.LatLng(Number(location[1]), Number(location[0])),
                            title: poppleLocations[i].exhibitionName,
                        });
                        markers.push(marker);
                        // 마커에 인포윈도우 추가 (마우스 오버시)
                        const infoWindow = new kakao.maps.InfoWindow({
                            content: `
                                <div class="p-2 bg-white border border-gray-300 rounded shadow-md text-center">
                                    <h4 class="text-sm font-semibold text-gray-700 text-nowrap">${poppleLocations[i].exhibitionName}</h4>
                                    <img class="rounded w-24 h-auto mt-4 mx-auto" alt="팝업/전시 포스터" src=${posterURL + poppleLocations[i].savedImage} />
                                </div>`
                        });

                        kakao.maps.event.addListener(marker, 'click', () => {
                            poppleLocations[i].type === 1
                                ? 
                                navigate(`/popup/detail/${poppleLocations[i].id}`)
                                :
                                navigate(`/exhibition/detail/${poppleLocations[i].id}`)
                        });

                        kakao.maps.event.addListener(marker, 'mouseover', () => {
                            infoWindow.open(map, marker);
                        });

                        kakao.maps.event.addListener(marker, 'mouseout', () => {
                            infoWindow.close();
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
