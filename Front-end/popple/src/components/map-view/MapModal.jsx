import MapView from "./MapView";
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useState } from "react";
import LocationSearch from "./LocationSearch";
import SearchByLocation from "./SearchByLocation";
import { exhibitionAPI } from "../../api/services/Exhibition";

export default function MapModal({ onClose }) {
  const [locations, setLocations] = useState([]);
  //latitude and longitude
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // 검색 타입
  const [searchType, setSearchType] = useState();
  
  const [keyword, setKeyword] = useState('');
  const [inputKeyword, setInputKeyword] = useState('');

  // 모달이 처음 열릴 때 기본 위경도로 지도가 표시되도록 useEffect 추가
  useEffect(() => {
    // 초기 지도가 제대로 뜨도록 기본 위경도를 설정
    setLatitude(37.5697034972222);
    setLongitude(126.984281413033);

    
    // 검색어가 변경될 때마다 검색 결과를 가져오도록 설정
    // if (keyword) {
    //   fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`, {
    //     headers: {
    //       Authorization
    //     }
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // 검색 결과를 가져온 후 상태로 설정
    //     setLocations(data.documents);
    //   });
    // }
  }, []);

  // 전시팝업 타입 선택시 상태 설정
  const [type, setType] = useState(0);

  // 키워드로 검색한 결과 가져오기
  const handleLocationUpdate = (newLocations) => {
    // console.log(newLocations);
    // setLocations(newLocations); // Set the fetched locations
  };

  // console.log(locations);
  // 장소로 찾기
  const handleLocationSearch = async () => {
    // inputKeyword로 팝업/전시 검색
    const res = await exhibitionAPI.search(inputKeyword);
    console.log(res.data);  
    setLocations(res.data);
  };

  // onClick
  const handleClick = (result) => {
    setLongitude(result.x); 
    setLatitude(result.y);
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

  // 필수
  // 검색은 DB내에서 검색가능(장소(시 구 동), 팝업이름) 2가지

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
          <div className="w-[20%] p-2 m-3">
            {/* 종류 선택 버튼 */}
            <div className="grid grid-cols-3 mb-3">
              <div className={`${typeButtionStyle} border-r-[1px] rounded-l-lg ${type === 0 ? "border-popple-light border-2 bg-popple-light text-white" : "border-[#b6b6b6]"}`} onClick={() => setType(0)}>전체</div>
              <div className={`${typeButtionStyle} border-x-1 ${type === 1 ? "border-popple-light border-2 bg-popple-light text-white" : "border-[#b6b6b6]"}`} onClick={() => setType(1)}>팝업</div>
              <div className={`${typeButtionStyle} border-l-[1px] rounded-r-lg ${type === 2 ? "border-popple-light border-2 bg-popple-light text-white" : "border-[#b6b6b6]"}`} onClick={() => setType(2)}>전시</div>
            </div>
            {/* 주소로 찾기 */}
            {/* <SearchByLocation handleClick={handleClick} handleClose={onClose}/> */}
            {/* 이름으로 찾기 */}
            {/* <LocationSearch onSearch={handleLocationSearch} locations={locations} /> */}
            {/* 검색 */}
            <div className="search-bar">
              <div className="flex">
                <input
                    type="text"
                    value={inputKeyword}
                    onChange={(e) => setInputKeyword(e.target.value)}
                    placeholder="검색할 키워드를 입력하세요"
                    className="keyword-input rounded--r-[0.75rem] p-2 w-full border border-1 border-r-0"
                />
                <button id="searchBtn" className="search-button min-w-fit px-3 rounded-r-[0.75rem] text-white bg-popple-light" onClick={() => handleLocationSearch()}>검색</button>
              </div>
            </div>
            <div className="search-result flex flex-col">
            {
              locations?.map((location, key) => (
                <div>
                  <div>{location.title}</div>
                  <div>{location.address}</div>
                  <div>{location.savedImage}</div>
                </div>
              ))
            }
            </div>
          </div>
          {/* 오른쪽 컨테이너 */}
          <div className="flex-1"> 
            <MapView latitude={latitude} longitude={longitude} poppleLocations={locations} keyword={keyword} onResultsUpdate={handleLocationUpdate} />
          </div>  
        </div>
      </div>
    </div>

  );
}
