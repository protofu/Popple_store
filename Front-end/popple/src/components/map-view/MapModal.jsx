import MapView from "./MapView";
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useState } from "react";
import LocationSearch from "./LocationSearch";
import SearchByLocation from "./SearchByLocation";
import { exhibitionAPI } from "../../api/services/Exhibition";
import moment from "moment";

export default function MapModal({ onClose }) {
  const posterURL = import.meta.env.VITE_EXHIBITION_POSTER;
  const [exhibitions, setExhibitions] = useState([]);
  //latitude and longitude
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [keyword, setKeyword] = useState('');
  const [inputKeyword, setInputKeyword] = useState('');

  // 모달이 처음 열릴 때 기본 위경도로 내 위치로 표시되도록 useEffect 추가
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLatitude(37.5697034972222);
          setLongitude(126.984281413033);
        }
      );
    } else {
      setLatitude(37.5697034972222);
      setLongitude(126.984281413033);
    }
  }, []);

  // 전시팝업 타입 선택시 상태 설정
  const [type, setType] = useState(0);

  // 찾기
  const handleLocationSearch = async () => {
    // inputKeyword & typeId로 팝업/전시 검색
    const res = await exhibitionAPI.search(inputKeyword, type);
    setExhibitions(res.data);
  };

  // onClick
  const handleClick = (exhibition) => {
    setLongitude(Number(exhibition.location[0])); 
    setLatitude(Number(exhibition.location[1]));
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
        <div className="flex flex-1 h-[80vh]">
          {/* 왼쪽 컨테이너 */}
          <div className="w-[25%] min-w-[400px] p-2 m-3 overflow-scroll overflow-x-hidden">
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
                    onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
                    placeholder="검색할 키워드를 입력하세요"
                    className="keyword-input rounded--r-[0.75rem] p-2 w-full border border-1 border-r-0"
                />
                <button id="searchBtn" className="search-button min-w-fit px-3 rounded-r-[0.75rem] text-white bg-popple-light" onClick={() => handleLocationSearch()}>검색</button>
              </div>
            </div>
            <div className="search-result flex flex-col gap-2 p-4">
              {exhibitions?.map((exhibition, key) => {
                const diff = moment(new Date(exhibition.endAt[0], exhibition.endAt[1] - 1, exhibition.endAt[2])).diff(moment(), 'days');
                const typeName = exhibition.typeId === 1 ? "팝업" : "전시";
                return (
                  <div 
                    key={key}
                    onClick={() => handleClick(exhibition)}
                    className="cursor-pointer rounded-lg shadow-lg p-4 bg-white hover:bg-gray-100 transition duration-200"
                  >
                    <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">{typeName}</span>
                    <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      {diff === 0 ? "오늘이 마지막" : `${diff}일 후에 ${typeName} 종료` }
                    </span>
                    <div className="text-lg font-semibold text-gray-800 my-3 overflow-hidden whitespace-nowrap truncate">
                      <img className="w-10 h-10 rounded-full inline mr-3" src={posterURL + exhibition.savedImage} alt={`${exhibition.exhibitionName} 이미지`} />
                      {exhibition.exhibitionName}
                    </div>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      {exhibition.address} {exhibition.detailAddress}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          {/* 오른쪽 컨테이너 */}
          <div className="flex-1 m-3"> 
            <MapView latitude={latitude} longitude={longitude} poppleLocations={exhibitions} keyword={keyword} />
          </div>  
        </div>
      </div>
    </div>

  );
}
