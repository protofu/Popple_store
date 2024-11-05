import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar.css";
import { useEffect, useState } from "react";
import UseInfo from "../components/exhi-details/UseInfo";
import axios from "axios";
import ReviewInDetail from "../components/review/ReviewInDetail";
import Reservation from "../components/exhibition/Reservation";
import { exhibitionAPI } from "../api/services/Exhibition";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeAPI } from "../api/services/Like";
import { FaLink } from "react-icons/fa6";
import KakaoShareButton from "../components/common/KakaoShareButton";
import CateButton from "../components/common/CateButton";
import { reservationAPI } from "../api/services/Reservation";
import DetailsEvent from "../components/exhi-details/DetailsEvent";
import ExhibitionPage from "./ExhibitionPage";
import { useLoginStore } from "../stores/LoginState";

function dateToString(arr) {
  const [y, m, d] = arr;
  return y + "." + m + "." + d;
}

export default function DetailPage() {
  const { isLoggedIn, setIsLoggedIn } = useLoginStore((state) => state);
  const posterURL = import.meta.env.VITE_EXHIBITION_POSTER;
  const navigate = useNavigate();
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(moment(curDate).format("YYYY-MM-DD"));
  const [selectTab, setSelectTab] = useState("이용정보");
  const [likeCount, setLikeCount] = useState(0);
  const { id } = useParams();

  const [reservedDate, setReservedDate] = useState(null);

  const getMyReservation = async () => {
    const res = await reservationAPI.checkMyReservation(id);
    setReservedDate(
      res.data
        .filter((r) => r.deleted == false)
        .map((r) => {
          const [y, m, d] = r.reservationDate;
          return moment(new Date(y, m - 1, d)).format("YYYY-MM-DD");
        })
    );
  };

  // 좋아요
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = async () => {
    if (isLiked) {
      await likeAPI.unlike(id);
    } else {
      await likeAPI.pressLike(id);
    }
    // 좋아요 수 가져오기
    const res = await likeAPI.howManyLikes(id);
    setLikeCount(res.data);
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    // 내가 좋아요를 눌렀나요?
    const likeData = async () => {
      const res = await likeAPI.amILiked(id);
      setIsLiked(res.data);
    };
    // 좋아요 수 가져오기 default 셋팅
    const getLikeCount = async () => {
      const res = await likeAPI.howManyLikes(id);
      setLikeCount(res.data);
    };

    if (isLoggedIn) {
      getLikeCount();
      likeData();
    }
  }, [id]);

  // json데이터 담을 state
  const [exhi, setExhi] = useState(null);
  const [chartData, setChartData] = useState(null);

  // 모달 상태
  const [showReservationModal, setShowReservationModal] = useState(false);

  // 현재 페이지 링크복사
  const copyCurrentLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    } catch (error) {
      console.error("링크 복사에 실패했습니다.", error);
    }
  };

  // 예시 데이터
  useEffect(() => {
    getMyReservation();

    const axiosData = async () => {
      try {
        // axios로 public 폴더에 있는 JSON 파일 불러오기
        const resDetail = await exhibitionAPI.get(id);
        // const resChartData = await axios.get('/jsons/visitors.json');
        // console.log(resChartData.data);
        setExhi(resDetail.data); // 불러온 데이터를 상태에 저장
        // setChartData(resChartData.data);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    axiosData(); // 비동기 함수 호출
  }, []);

  if (!exhi) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  // if (!chartData) {
  //   return <div>Loading...</div>; // 데이터 로딩 중 표시
  // }

  const handleDateChange = (date) => {
    onChange(date);
  };

  const handleTab = (tab) => {
    setSelectTab(tab);
  };

  const openModal = () => {
    // 만약 예약하려는 날짜와 24년 01월 01일랑 다르면 >>> setShowReservationModal(true);
    setShowReservationModal(true);
  };
  const closeModal = () => setShowReservationModal(false);

  const goToReservationListPage = () => {
    navigate("/my-page", { state: { activeItem: "예약 목록" } });
  };

  // 날짜
  const startAt = dateToString(exhi.startAt);
  const endAt = dateToString(exhi.endAt);

  const type = exhi.typeId === 1 ? "팝업" : "전시";
  const infoGridStyle = "col-span-1 w-full font-bold text-xl";
  const infoH1GridStyle = "col-span-2 text-[14px] my-auto";
  const tabStyle = "cursor-pointer mr-4 text-center w-[80px]";
  console.log(exhi);
  const endAtDate = new Date(exhi.endAt[0], exhi.endAt[1] - 1, exhi.endAt[2]);

  return (
    <div className="mt-10 h-full">
      <CateButton text={type} />
      <h1 className="text-2xl m-3 font-bold">
        {exhi.exhibitionName}{" "}
        {exhi.reserve && (
          <span className="text-[12px] text-white bg-popple-light rounded-[12px] px-2 py-1">
            예약 가능
          </span>
        )}{" "}
      </h1>
      <div className="grid grid-cols-7 w-full mt-6">
        {/* 정보 */}
        <div className="col-span-5">
          {/* 타이틀 아래 div들 */}
          <div className="grid grid-cols-2">
            {/* 포스터 */}
            <div className="">
              <img
                src={`${posterURL}${exhi.savedImage}`}
                alt="포스터 이미지"
                className="w-[70%] mx-auto"
              />
            </div>
            {/* <button
              onClick={() => navigate(`/exhibition-update?id=${exhi.id}`)}
            >
              수정
            </button>
            

            {/* 간략 내용 */}
            <div className="grid grid-cols-3 my-auto gap-14">
              <label htmlFor="location" className={infoGridStyle}>
                장소
              </label>
              <h1 id="location" className={infoH1GridStyle}>
                {exhi.address}
              </h1>
              <label htmlFor="location" className={infoGridStyle}>
                기간
              </label>
              <h1 id="location" className={infoH1GridStyle}>
                {startAt + " - " + endAt}
              </h1>
              <label htmlFor="location" className={infoGridStyle}>
                관람연령
              </label>
              <h1 id="location" className={infoH1GridStyle}>
                {exhi.grade ? "전연령" : "청소년 관람 불가"}
              </h1>
              <label htmlFor="location" className={infoGridStyle}>
                입장료
              </label>
              <h1 id="location" className={infoH1GridStyle}>
                {exhi.fee !== "0" ? (
                  <span>{exhi.fee} 원</span>
                ) : (
                  <span className="font-bold">입장료 무료</span>
                )}
              </h1>
            </div>
          </div>
          <div className="mt-10 border-b-2 border-[#868686] flex justify-between items-end">
            <nav className="flex pb-2 ml-4">
              <div
                className={`${tabStyle} ${
                  selectTab === "이용정보" &&
                  "font-bold border-b-2 border-popple-light text-popple-light"
                }`}
                onClick={() => handleTab("이용정보")}
              >
                이용정보
              </div>
              <div
                className={`${tabStyle} ${
                  selectTab === "리뷰" &&
                  "font-bold border-b-2 border-popple-light text-popple-light"
                }`}
                onClick={() => handleTab("리뷰")}
              >
                리뷰
              </div>
              <div
                className={`${tabStyle} ${
                  selectTab === "EVENT" &&
                  "font-bold border-b-2 border-popple-light text-popple-light"
                }`}
                onClick={() => handleTab("EVENT")}
              >
                EVENT
              </div>
            </nav>
            <div className="flex gap-4 mr-5 items-end pb-2">
              <div className="flex flex-col">
                <span className="w-full text-center text-[10px] text-red-400">
                  {likeCount}
                </span>
                <div
                  onClick={() => handleClickLike()}
                  className="cursor-pointer"
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500 text-[24px]" />
                  ) : (
                    <FaRegHeart className="text-red-500 text-[24px]" />
                  )}
                </div>
              </div>
              <div onClick={() => copyCurrentLink()} className="cursor-pointer">
                <FaLink className="text-[24px] text-blue-600" />
              </div>
              <div className="w-[26px]">
                <KakaoShareButton data={exhi} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            {selectTab === "이용정보" && <UseInfo data={exhi} />}
            {selectTab === "리뷰" && <ReviewInDetail />}
            {selectTab === "EVENT" && <DetailsEvent navigate={navigate} />}
          </div>
        </div>
        {/* 캘린더 */}
        {exhi.reserve && (
          <div className="col-span-2 mx-auto">
            {/* <h1>예약하기</h1> */}
            <Calendar
              onChange={(date) => handleDateChange(date)} // 날짜 변경시 저장
              formatDay={(local, date) => moment(date).format("D")} // 요일 형식 변환
              calendarType="gregory" // 그레고리를 통한 토요일 시작
              value={value} // 선택된 value값 (default 오늘)
              showNeighboringMonth={true} // 다음달 날짜도 보이게
              // 활성화 날짜 지정
              minDate={new Date()}
              maxDate={endAtDate}
              // 예약시 보일 스타일
              tileContent={({ date, view }) => {
                let html = [];
                if (
                  reservedDate?.find(
                    (x) => x === moment(date).format("YYYY-MM-DD")
                  )
                ) {
                  html.push(
                    <div
                      key={moment(date).format("YYYY-MM-DD")}
                      className="bg-popple-light text-white rounded-md text-[10px]"
                    >
                      예약
                    </div>
                  );
                }
                return html;
              }}
            />
            <div className="flex flex-col justify-center items-center text-gray-500 mt-4">
              <h1 className="m-2 text-popple-dark">
                {reservedDate?.length > 0 ? "예약된 날짜" : "선택된 날짜"}
              </h1>
              <div className="w-full text-center border-2 rounded-lg py-1">
                {reservedDate?.length > 0
                  ? moment(reservedDate[0]).format("YYYY년 MM월 DD일")
                  : value && moment(value).format("YYYY년 MM월 DD일")}
              </div>
            </div>
            <div
              className="bg-popple-light rounded-lg mx-2 my-3 py-2 shadow-xl cursor-pointer"
              onClick={openModal}
            >
              <p className="text-center text-white text-[1rem]">예약하기</p>
            </div>
            {reservedDate?.length != 0 && (
              <div
                className="bg-popple-light rounded-lg mx-2 my-3 py-2 shadow-xl cursor-pointer"
                onClick={goToReservationListPage}
              >
                <p className="text-center text-white text-[1rem]">마이페이지</p>
              </div>
            )}
            {showReservationModal && (
              <Reservation
                reservation={moment(value).format("YYYY-MM-DD")}
                exhi={exhi}
                onClose={closeModal}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
