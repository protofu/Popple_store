import { useEffect, useState } from "react";
import { exhibitionAPI } from "../../api/services/Exhibition";
import { RiContactsBook2Line } from "react-icons/ri";
import { PiAddressBookLight } from "react-icons/pi";
import { VscGraph } from "react-icons/vsc";
import { LiaEditSolid } from "react-icons/lia";
import { IoTrashOutline } from "react-icons/io5";
import { FiPieChart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Statistics from "./Statistics";
import ReservationList from "../company/ReservationList";

export default function PopupList() {
  const navigate = useNavigate();
  // 진행 혹은 예정인 데이터들
  const [popupList, setPopupList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 수

  // 팝업/전시 리스트 가져오기
  const getMyPopupList = async () =>  {
    const res = await exhibitionAPI.my();
    const today = new Date(); // 오늘 날짜 가져오기
    // 진행 혹은 예정인 데이터들
    const filtered = res.data.filter(item => {
        const endAt = new Date(item.endAt); // endAt을 Date 객체로 변환
        return endAt > today; // 오늘보다 후인지 확인
    });
    setPopupList(res.data);
  }
  useEffect(() => {
    getMyPopupList();
  }, [])

  console.log(popupList)

  // 페이지별로 현재 보여줄 항목들 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = popupList.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(popupList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 날짜를 받아서 알맞게 가공해서 반환하는 함수
  function getStatus(start, end) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간을 00:00:00으로 설정
  
    const startAt = new Date(start[0], start[1] - 1, start[2]);
    startAt.setHours(0, 0, 0, 0); // 시작 날짜의 시간을 00:00:00으로 설정
  
    const endAt = new Date(end[0], end[1] - 1, end[2]);
    endAt.setHours(23, 59, 59, 999); // 종료 날짜의 시간을 23:59:59로 설정
  
    if (today < startAt) {
      // 오픈 전 상태
      const diffDays = Math.ceil((startAt - today) / (1000 * 60 * 60 * 24)); // 남은 날짜 계산
      return {
        value: `오픈 D-DAY ${diffDays}`,
        color: "text-red-500 font-bold",
      };
    } else if (today >= startAt && today <= endAt) {
      // 진행 중 상태
      return {
        value: "진행중",
        color: "text-green-600 font-bold",
      };
    } else {
      // 종료된 상태
      return {
        value: "종료",
        color: "text-gray-400 font-bold",
      };
    }
  }
  // 30자가 넘으면 ...으로 줄이는 함수
  function formatExhibitionName(name) {
    return name.length > 30 ? `${name.slice(0, 30)}...` : name;
  }
  

  const trStyle = "grid grid-cols-[4fr_2fr_0.8fr_0.8fr_0.8fr_0.8fr] border-b my-auto";
  const thStyle = "my-auto";

  const [selectedComponent, setSelectedComponent] = useState(null); // 선택된 컴포넌트 상태 추가

  // 아이콘 클릭 핸들러
  const handleIconClick = (action, eventId, event) => {
    if (action === 'reservation') {
      setSelectedComponent(<ReservationList event={event} eventId={eventId} onClose={() => setSelectedComponent(null)} />);
    } else if (action === 'statistics') {
      setSelectedComponent(<Statistics eventId={eventId} onClose={() => setSelectedComponent(null)} />);
    }
    // } else if (action === 'edit') {
    //   setSelectedComponent(<Edit eventId={eventId} onClose={() => setSelectedComponent(null)} />);
    // } else if (action === 'delete') {
    //   setSelectedComponent(<Delete eventId={eventId} onClose={() => setSelectedComponent(null)} />);
    // }
  };
  
  const renderContent = () => {
    if (selectedComponent) {
      return selectedComponent; // 선택된 컴포넌트가 있으면 렌더링
    }

    return (
      <div className="">
        <div className="mt-8 pb-12 mb-12">
          <h2 className="text-[16px]">팝업/전시 목록, 총 <span className="font-bold text-[24px] text-popple-light">{popupList.length}</span>개의 팝업/전시가 있습니다.</h2>
          <hr  className=" border-gray-500"/>
          <table className="w-full mt-3 text-left">
            <thead>
              <tr className={`${trStyle} border-gray-500 h-10`}>
                <th className="text-center">팝업/전시명</th>
                <th>상태</th>
                <th className="text-center">예약</th>
                <th className="text-center">통계</th>
                <th className="text-center">수정</th>
                <th className="text-center">삭제</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((event) => {
                const { value, color } = getStatus(event.startAt, event.endAt);
                return (
                  <tr key={event.id} className={trStyle}>
                    <td className={`${thStyle} h-12 flex items-center`} title={event.exhibitionName} >
                      <span className="cursor-pointer" onClick={() => navigate(event.typeId === 1 ? `/pop-up/detail/${event.id}` : `/exhibition/detail/${event.id}`)}>{formatExhibitionName(event.exhibitionName)}</span>
                    </td>
                    <td className={`${thStyle} ${color}`}>{value}</td>
                    <td className={`${thStyle} m-auto`}><PiAddressBookLight className="size-[36px] cursor-pointer" onClick={() => handleIconClick(`reservation`, event.id, event)}/></td>
                    <td className={`${thStyle} m-auto`}><FiPieChart className="size-[30px] cursor-pointer" onClick={() => handleIconClick(`statistics`, event.id)}/></td>
                    <td className={`${thStyle} m-auto`}><LiaEditSolid className="size-[36px] cursor-pointer" onClick={() => navigate(`/exhibition-update?id=${event.id}`)}/></td>
                    <td className={`${thStyle} m-auto`}><IoTrashOutline className="size-[32px] cursor-pointer" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* 페이지네이션 버튼 10개가 넘지 않으면 페이지네이션 버튼 안보임*/}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-2 py-1 rounded ${currentPage === index + 1 ? "bg-popple-light text-white" : "bg-gray-300 text-black"}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};