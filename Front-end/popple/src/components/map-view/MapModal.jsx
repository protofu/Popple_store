import MapView from "./MapView";
import { MdOutlineClose } from "react-icons/md";
import { searchAddress } from "../../api/services/KakaoAPI";
import { FaSearchLocation } from "react-icons/fa";
import { useEffect, useState } from "react";
import LocationSearch from "./LocationSearch";
import MapComp from "./MapComp";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import SearchByLocation from "./SearchByLocation";

export default function MapModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [locations, setLocations] = useState([]);
  //latitude and longitude
  const [coordinates, setCoordinates] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // 모달이 처음 열릴 때 기본 위경도로 지도가 표시되도록 useEffect 추가
  useEffect(() => {
    // 초기 지도가 제대로 뜨도록 기본 위경도를 설정
    setLatitude(37.5697034972222);
    setLongitude(126.984281413033);
  }, []);

  // 전시팝업 타입 선택시 상태 설정
  const [type, setType] = useState(0);

  // 키워드로 검색한 결과 가져오기
  const handleLocationUpdate = (newLocations) => {
    setLocations(newLocations); // Set the fetched locations
  };

  // 검색 드롭다운 상태 저장
  const [showResults, setShowResults] = useState(false);

  const [keyword, setKeyword] = useState('');
  // 장소로 찾기
  const handleLocationSearch = (searchKeyword) => {
    setKeyword(searchKeyword); // 검색어를 상태로 저장
  };

  // onClick
  const handleClick = (result) => {
    console.log("클릭시", result);
    setQuery(result.address_name); 
    setLongitude(result.x); 
    setLatitude(result.y);
    setShowResults(false);
  };


  // 해야할 것
  // 3. 마커 색상 변경하기
  // -> MapView 컴포넌트에 마커 색상 변경하는 props 전달
  // 4. 인포 윈도우 알맞게 꾸미기
  // -> MapView 내 인포 윈도우 커스터마이징 (title, content 등 추가)
  // 5. 해당 마커를 중심으로 약 1Km? or 500m 반경으로 모든 전시 찾아서 리스트로 나타내기
  // -> 새로운 API 호출 필요 (마커 좌표 기반의 반경 검색 API)
  // 6. 팝업/전시 리스트는 검색 시 왼쪽 컨테이너에서 나오기(열고 닫기 가능)
  // -> 검색 결과 리스트를 토글할 수 있는 UI 추가 (열고 닫기 가능하도록 상태 관리)

  const typeButtionStyle = "border border-1 text-center py-2 cursor-pointer";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"> {/* 어두운 배경 추가 */}
      <div className="flex flex-col m-auto w-[95%] h-[85%] z-50 bg-white rounded-[0.75rem] relative"> 
        {/* 상단 바 추가 */}
        <div className="flex items-center p-3 border-b">
          <MdOutlineClose className="size-8 mr-3 cursor-pointer" onClick={onClose} />
          <h2 className="text-lg font-bold text-center flex-1">지도 보기</h2> {/* 중앙 정렬을 위한 flex-1 추가 */}
        </div>
        {/* 본문 */}
        <div className="flex flex-1">
          {/* 왼쪽 컨테이너 */}
          <div className="w-[20%] p-2">
            {/* 종류 선택 버튼 */}
            <div className="grid grid-cols-3 m-6 mb-3">
              <div className={`${typeButtionStyle} border-r-[1px] rounded-l-lg ${type === 0 ? "border-popple-light border-2 bg-popple-light text-white" : "border-[#b6b6b6]"}`} onClick={() => setType(0)}>전체</div>
              <div className={`${typeButtionStyle} border-x-1 ${type === 1 ? "border-popple-light border-2 bg-popple-light text-white" : "border-[#b6b6b6]"}`} onClick={() => setType(1)}>팝업</div>
              <div className={`${typeButtionStyle} border-l-[1px] rounded-r-lg ${type === 2 ? "border-popple-light border-2 bg-popple-light text-white" : "border-[#b6b6b6]"}`} onClick={() => setType(2)}>전시</div>
            </div>
            {/* 주소로 찾기 */}
            <SearchByLocation handleClick={handleClick} handleClose={onClose}/>
            {/* 이름으로 찾기 */}
            <LocationSearch onSearch={handleLocationSearch} locations={locations} />
          </div>
          {/* 오른쪽 컨테이너 */}
          <div className="flex-1"> 
            <MapView latitude={latitude} longitude={longitude} keyword={keyword} onResultsUpdate={handleLocationUpdate} />
          </div>  
        </div>
      </div>
    </div>

  );
}
