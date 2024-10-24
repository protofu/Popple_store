import MapView from "../MapView";
import { MdOutlineClose } from "react-icons/md";

export default function MapModal({ onClose }) {

  const inputStyle =
    "w-[300px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  const typeButtionStyle = "border border-2 border-popple-light text-center py-2";
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"> {/* 어두운 배경 추가 */}
      <div className="flex flex-col m-auto w-[95%] h-[85%] z-50 bg-white rounded-[0.75rem] relative"> 
        {/* 상단 바 추가 */}
        <div className="flex items-center p-3 border-b">
          <button onClick={onClose} className="mr-3"> {/* 닫기 버튼 오른쪽 여백 */}
            <MdOutlineClose className="size-8" />
          </button>
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
              <input className={`${inputStyle} mx-auto`} />
            </div>
          </div>

          {/* 오른쪽 컨테이너 */}
          <div className="flex-1"> 
            <MapView />
          </div>
        </div>
      </div>
    </div>
  );
}
