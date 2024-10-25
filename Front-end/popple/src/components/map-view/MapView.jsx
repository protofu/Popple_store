import { useEffect, useState } from "react";

export default function MapView({ latitude, longitude, keyword, onResultsUpdate }) {
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
    }, [longitude, latitude, keyword]);

    const initializeMap = () => {
        if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
                let markers = [];
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    level: 3
                };
                const map = new window.kakao.maps.Map(container, options);
                const ps = new window.kakao.maps.services.Places();
                let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

                if (keyword) {
                    searchPlaces(keyword);
                }

                function searchPlaces(keyword) {
                    if (!keyword.trim()) {
                        alert('키워드를 입력해주세요');
                        return;
                    }
                    ps.keywordSearch(keyword, placesSearchCB);
                }

                function placesSearchCB(data, status, pagination) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        displayPlaces(data);
                        displayPagination(pagination);
                        setResults(data);
                        onResultsUpdate(data);
                    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                        alert('검색 결과가 없습니다.');
                    } else if (status === window.kakao.maps.services.Status.ERROR) {
                        alert('검색 중 오류가 발생했습니다.');
                    }
                }

                function displayPlaces(places) {
                    const listEl = document.getElementById('placesList');
                    const bounds = new window.kakao.maps.LatLngBounds();

                    removeAllChildNods(listEl);
                    removeMarker();

                    places.forEach((place, i) => {
                        const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
                        const marker = addMarker(placePosition, i);
                        const itemEl = getListItem(i, place);

                        bounds.extend(placePosition);

                        (function(marker, title) {
                            window.kakao.maps.event.addListener(marker, 'mouseover', function() {
                                displayInfowindow(marker, title);
                            });
                            window.kakao.maps.event.addListener(marker, 'mouseout', function() {
                                infowindow.close();
                            });
                            itemEl.onmouseover = function () {
                                displayInfowindow(marker, title);
                            };
                            itemEl.onmouseout = function () {
                                infowindow.close();
                            };
                        })(marker, place.place_name);

                        listEl.appendChild(itemEl);
                    });

                    map.setBounds(bounds);
                }

                function getListItem(index, place) {
                    const el = document.createElement('li');
                    el.className = 'item';
                    el.innerHTML = `
                        <span class="markerbg marker_${index + 1}"></span>
                        <div class="info">
                            <h5>${place.place_name}</h5>
                            ${place.road_address_name ? `<span>${place.road_address_name}</span><span class="jibun gray">${place.address_name}</span>` : `<span>${place.address_name}</span>`}
                            <span class="tel">${place.phone}</span>
                        </div>`;
                    return el;
                }

                function addMarker(position, idx) {
                    const markerImage = new window.kakao.maps.MarkerImage(
                        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
                        new window.kakao.maps.Size(36, 37),
                        {
                            spriteSize: new window.kakao.maps.Size(36, 691),
                            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
                            offset: new window.kakao.maps.Point(13, 37)
                        }
                    );
                    const marker = new window.kakao.maps.Marker({ position, image: markerImage });
                    marker.setMap(map);
                    markers.push(marker);
                    return marker;
                }

                function removeMarker() {
                    markers.forEach(marker => marker.setMap(null));
                    markers = [];
                }

                function displayPagination(pagination) {
                    const paginationEl = document.getElementById('pagination');
                    removeAllChildNods(paginationEl);

                    for (let i = 1; i <= pagination.last; i++) {
                        const el = document.createElement('a');
                        el.href = "#";
                        el.innerHTML = i;
                        el.className = i === pagination.current ? 'on' : '';
                        el.onclick = () => pagination.gotoPage(i);
                        paginationEl.appendChild(el);
                    }
                }

                function displayInfowindow(marker, title) {
                    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }

                function removeAllChildNods(el) {
                    if (el) {
                        while (el.hasChildNodes()) {
                            el.removeChild(el.lastChild);
                        }
                    } else {
                        console.warn('removeAllChildNods: 전달된 요소가 null입니다.'); // 디버깅용 로그
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
