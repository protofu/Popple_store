// import { useParams } from "react-router-dom";
// import momentTZ from "moment-timezone";
import "react-calendar/dist/Calendar.css";
import "../../pages/styles/calendar.css";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import ExStep3Info from "./ExStep3Info";
import KakaoShareButton from "../common/KakaoShareButton";
export default function ExStep3({ information }) {
  const [selectTab, setSelectTab] = useState("이용정보");

  const handleTab = (tab) => {
    setSelectTab(tab);
  };

  if (!information) {
    return <div>로딩중..</div>;
  }

  const infoGridStyle = "col-span-1 w-full font-bold text-xl";
  const infoH1GridStyle = "col-span-2 text-[14px] my-auto";
  const tabStyle = "cursor-pointer mr-4 text-center w-[80px]";

  // 날짜
  function dateToString(arr) {
    const [y,m,d] = arr;
    return y+"."+m+"."+d;
  }
  const startAt = dateToString(information.startAt);
  const endAt = dateToString(information.endAt);


  return (
    <div className="h-full">
      <h1 className="text-2xl m-10 font-bold">{information.exhibitionName}</h1>
      <div className="grid grid-cols-7 w-full mt-6">
        {/* 정보 */}
        <div className="col-span-5">
          {/* 타이틀 아래 div들 */}
          <div className="grid grid-cols-2">
            {/* 포스터 */}
            <div className="">
              <img
                src={URL.createObjectURL(information.poster)}
                alt="포스터 이미지"
                className="w-[70%] mx-auto"
              />
            </div>

            {/* 간략 내용 */}
            <div className="grid grid-cols-3 my-auto gap-14">
              <label htmlFor="location" className={infoGridStyle}>
                장소
              </label>
              <h1 id="location" className={infoH1GridStyle}>
                {information.address} {information.detailAddr}
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
                {information.constraints.grade ? "전연령" : "청소년 관람 불가"}
              </h1>
              <label htmlFor="location" className={infoGridStyle}>
                입장료
              </label>
              <h1 id="location" className={infoH1GridStyle}>
                {information.fee !== "0" ? (
                  <span>{information.fee} 원</span>
                ) : (
                  <span className="font-bold">입장료 무료</span>
                )}
              </h1>
              {/* <label htmlFor="location" className={infoGridStyle}>
                주의사항
              </label>
              <h1 id="location" className={infoGridStyle}>
                {information.constraints.food && <MdFastfood />}
                {information.constraints.park && <LuParkingCircle />}
                {information.constraints.wifi && <CiWifiOn />}
                {information.constraints.pet && <FaDog />}
                {information.constraints.kids && <FaUser />}
                {information.constraints.camera && <LuCamera />}
              </h1> */}
            </div>
          </div>
          <div className="mt-10 border-b-2 border-[#868686] flex justify-between items-end">
            <nav className="flex pb-2 ml-4">
              <div className={tabStyle} onClick={() => handleTab("이용정보")}>
                이용정보
              </div>
              <div className={tabStyle} onClick={() => handleTab("리뷰")}>
                리뷰
              </div>
              <div className={tabStyle} onClick={() => handleTab("EVENT")}>
                EVENT
              </div>
            </nav>
            <div className="flex gap-4 mr-5 items-end pb-2">
              <div className="flex flex-col">
                <span className="w-full text-center text-[10px] text-red-400">0</span>
                <div className="cursor-pointer"><FaRegHeart className="text-red-500 text-[24px]"/></div>
              </div>
              <div className="cursor-pointer"><FaLink className="text-[24px] text-blue-600" /></div>
              <div className="w-[26px]"><KakaoShareButton data={information} /></div>
            </div>
          </div>
          <div className="mt-4">
            {selectTab === "이용정보" && (
              <ExStep3Info information={information} />
            )}
            {selectTab === "리뷰" && <></>}
            {selectTab === "EVENT" && <></>}
          </div>
        </div>
      </div>
    </div>
  );
}
