import MapView from "./MapView";
import { MdOutlineClose } from "react-icons/md";
import { searchAddress } from "../../api/services/KakaoAPI";
import { FaSearchLocation } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function MapModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  //latitude and longitude
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // 전시팝업 타입 선택시 상태 설정
  const [type, setType] = useState(0);


  // 모달이 처음 열릴 때 기본 위경도로 지도가 표시되도록 useEffect 추가
  useEffect(() => {
    // 초기 지도가 제대로 뜨도록 기본 위경도를 설정
    setLatitude(37.5697034972222);
    setLongitude(126.984281413033);
  }, []);

  // 1. 검색시 뜨는 리스트 onChange 이벤트로 전환해서 검색전 리스트 먼저 보여주기
  const handleChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // query가 빈 문자열일 경우 검색 요청을 보내지 않음
    if (!newQuery.trim()) {
      setResults([]);  // 빈 결과 리스트를 설정
      return;
    }
    
    try {
      const searchResults = await searchAddress(newQuery);
      setResults(searchResults);
    } catch (error) {
      console.error("Failed to fetch address data:", error);
    }
  };
  
  // 위경도 셋팅
  const handleSearch = async () => {
    if (results.length > 0) {
      setLongitude(results[0].x) // 경도 Longitude
      setLatitude(results[0].y) // 위도 Latitude
    }
  };

  console.log(type);

  // 해야할 것
  // 1-1. 리스트는 일반적인 div로 보여지는게 아니라 검색과 동시에 자동완성 느낌으로 드롭다운되기
  // -> results.length > 0 일 때 ul 태그를 absolute로 지정해서 input 하단에 배치. CSS로 자동완성 스타일 설정
  // 2. 리스트 요소 클릭 시 해당 text로 바뀌고 검색을 눌렀을 때 마커 이동 (지도 이동)
  // -> 각 리스트 항목에 onClick 이벤트 추가, 클릭된 항목의 주소를 setQuery로 설정, 좌표 업데이트 필요
  // 3. 마커 색상 변경하기
  // -> MapView 컴포넌트에 마커 색상 변경하는 props 전달
  // 4. 인포 윈도우 알맞게 꾸미기
  // -> MapView 내 인포 윈도우 커스터마이징 (title, content 등 추가)
  // 5. 해당 마커를 중심으로 약 1Km? or 500m 반경으로 모든 전시 찾아서 리스트로 나타내기
  // -> 새로운 API 호출 필요 (마커 좌표 기반의 반경 검색 API)
  // 6. 팝업/전시 리스트는 검색 시 왼쪽 컨테이너에서 나오기(열고 닫기 가능)
  // -> 검색 결과 리스트를 토글할 수 있는 UI 추가 (열고 닫기 가능하도록 상태 관리)

  const inputStyle =
    "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  const typeButtionStyle = "border border-1 text-center py-2 cursor-pointer";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"> {/* 어두운 배경 추가 */}
      <div className="flex flex-col m-auto w-[95%] h-[85%] z-50 bg-white rounded-[0.75rem] relative"> 
        {/* 상단 바 추가 */}
        <div className="flex items-center p-3 border-b">
          <MdOutlineClose className="size-8 mr-3 cursor-pointer" onClick={onClose} />
          <h2 className="text-lg font-bold text-center flex-1">지도 보기</h2> {/* 중앙 정렬을 위한 flex-1 추가 */}
        </div>

        <div className="flex flex-1"> {/* 왼쪽 및 오른쪽 컨테이너가 함께 flex하여 전체 높이를 차지하도록 설정 */}
          {/* 왼쪽 컨테이너 */}
          <div className="w-[20%] p-2">
            {/* 종류 선택 버튼 */}
            <div className="grid grid-cols-3 m-6 mb-3">
              <div className={`${typeButtionStyle} border-r-[1px] rounded-l-lg ${type === 0 ? "border-popple-light border-2 bg-popple-light text-white" : "border-[#b6b6b6]"}`} onClick={() => setType(0)}>전체</div>
              <div className={`${typeButtionStyle} border-x-1 ${type === 1 ? "border-popple-light border-2 bg-popple-light text-white" : "border-[#b6b6b6]"}`} onClick={() => setType(1)}>팝업</div>
              <div className={`${typeButtionStyle} border-l-[1px] rounded-r-lg ${type === 2 ? "border-popple-light border-2 bg-popple-light text-white" : "border-[#b6b6b6]"}`} onClick={() => setType(2)}>전시</div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="m-3 ml-10 text-[1.4rem] font-bold w-full">검색</h1>
              <div className={`${inputStyle} mx-auto flex focus-within:border-popple-light focus-within:border-2`}>
                <input
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="검색할 주소 입력"
                  className="w-full border-none focus:outline-none"
                />
                <FaSearchLocation className="text-[#6b6b6b] onClick={handleSearch} m-auto cursor-pointer" onClick={handleSearch} />
              </div>
            </div>
            {/* 검색결과 리스트 */}
            <ul>
              {results.map((result, index) => (
                <li 
                  key={index} 
                  className="border-2 p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => { 
                    setQuery(result.address_name); 
                    setLongitude(result.x); 
                    setLatitude(result.y);
                  }}
                >
                <p>{result.address_name}</p>
                {result.road_address && <p>도로명 주소: {result.road_address.address_name}</p>}
                </li>
              ))}
            </ul>
          </div>

          {/* 오른쪽 컨테이너 */}
          <div className="flex-1"> 
            <MapView latitude={latitude} longitude={longitude} />
          </div>
        </div>
      </div>
    </div>
  );
}
