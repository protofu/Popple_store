import MapView from "./MapView";
import { MdOutlineClose } from "react-icons/md";
import { searchAddress } from "../../api/services/KakaoAPI";
import { useState } from "react";

export default function MapModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  //latitude and longitude
  const [latitude, setLatitude] = useState(126.984281413033);
  const [longitude, setLongitude] = useState(37.5697034972222);

  const handleSearch = async () => {
    const searchResults = await searchAddress(query);
    setResults(searchResults);
    setLatitude(searchResults[0].x)
    setLongitude(searchResults[0].y)
    console.log(searchResults);
  };

  const inputStyle =
    "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  const typeButtionStyle = "border border-2 border-popple-light text-center py-2 cursor-pointer";
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
              <div className={`${typeButtionStyle} border-r-[1px] rounded-l-lg`}>전체</div>
              <div className={`${typeButtionStyle} border-x-1`}>팝업</div>
              <div className={`${typeButtionStyle} border-l-[1px] rounded-r-lg`}>전시</div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="m-3 ml-10 text-[1.4rem] font-bold w-full">검색</h1>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색할 주소 입력"
                className={`${inputStyle} mx-auto`}
              />
              <button onClick={handleSearch}>검색</button>
            </div>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <p>{result.address_name}</p>
                  {result.road_address && <p>도로명 주소: {result.road_address.address_name}</p>}
                  <p>좌표: ({result.x}, {result.y})</p>
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
