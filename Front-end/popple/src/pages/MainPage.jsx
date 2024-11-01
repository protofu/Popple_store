import { useNavigate } from "react-router-dom";
import CateButton from "../components/common/CateButton";
import PostCarousel from "../components/poster-card/PostCarousel";
import styles from "./styles/MainPage.module.css";
import EventCard from "../components/EventCard";
import eventImg from "../assets/img1.png";
import eventImg2 from "../assets/img2.png";
import eventImg3 from "../assets/img3.png";
import eventImg4 from "../assets/img4.png";
import PostCard from "../components/poster-card/PostCard";
import { useEffect, useState } from "react";
import { exhibitionAPI } from "../api/services/Exhibition";

export default function MainPage() {
  const postURL = import.meta.env.VITE_EXHIBITION_POSTER;
  // 초기 상태는 팝업(true)을 보여주도록 설정
  const [isPop, setIsPop] = useState(1);
  // 팝업/전시 배열
  const [exData, setExData] = useState([]);

  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  //  팝업 -> 전시 클릭시 상태 변환 메서드 (확장성이 너무 안좋음)
  const handlePopToEx = () => {
    setIsPop(2);
  };
  //  전시 -> 팝업 클릭시 상태 변환 메서드
  const handleExToPop = () => {
    setIsPop(1);
  };

  const example = [
    {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg2
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg3
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg4
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg
    }, {
      slogun: "DIALOGUE IN THE DARK",
      title: "어둠속의대화",
      duration: "오픈런",
      img: eventImg2
    }
  ];

  // 현재 페이지에 따라 아이템 인덱스 계산
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = exData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(exData.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  // 팝업/전시 입력에 따른 목록 보여주기
  const getExhibitionByType = async () => {
    const res = await exhibitionAPI.getlist(isPop);
    const today = new Date(); // 오늘 날짜 가져오기
    // 종료된것은 제외
    const filtered = res.data.filter(item => {
        const endAt = new Date(item.endAt); // endAt을 Date 객체로 변환
        return endAt > today; // 오늘보다 후인지 확인
    });
    setExData(filtered);
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(4);
      } else if (width < 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(12);
      }
    };

    getExhibitionByType();
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage); // 리사이즈 이벤트 리스너 추가

    return () => {
      window.removeEventListener("resize", updateItemsPerPage); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [isPop])

  return (
    <div className="flex flex-col items-center mt-4">
      <div className={styles.cateButton}>
        <CateButton text={"NEW"} />
      </div>
      {/* 포스터 캐러셀 */}
      <div className={styles.carouselContainer}>
        {/* <PostCarousel /> */}
      </div>
      {/* 이벤트 섹션 */}
      <div className="mt-10">
        <h1 className="text-center text-2xl mb-5">EVENT</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {example.map((item, index) => (
              <EventCard key={index} slogun={item.slogun} title={item.title} duration={item.duration} img={item.img}/>
          ))}
        </div>
      </div>
      {/* 전시 혹은 이벤트 섹션 */}
      <div className="mt-10">
        <div className="text-center text-2xl mb-5">
        {isPop == 1 ? (
          <div>
            <p onClick={() => handleExToPop()} className="inline font-bold text-slate-900 cursor-pointer">팝업</p><span> | </span>
            <p onClick={() => handlePopToEx()} className="inline cursor-pointer">전시</p>
          </div>
        ) : (
          <div>
            <p onClick={() => handleExToPop()} className="inline cursor-pointer">팝업</p><span> | </span>
            <p onClick={() => handlePopToEx()} className="inline font-bold text-slate-900 cursor-pointer">전시</p>
          </div>
        )}
        </div>
        {/* 전시 팝업에 따른 변화 */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {currentItems.map((item, index) => (
            <PostCard key={index} id={item.id} img={`${postURL}${item.savedImage}`} title={item.exhibitionName} addr={item.address} duration={dateToString(item.startAt) + " - " + dateToString(item.endAt)} styles={"w-full h-auto"} typeId={isPop}/>
          ))}
        </div>
        <div className="flex justify-center my-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-2 p-2 border rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-black"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


function dateToString(arr) {
  const [y,m,d] = arr;
  return y+"."+m+"."+d;
}
