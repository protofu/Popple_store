// import { useParams } from "react-router-dom";
import detailExam from "../../assets/detail-exam.png";
import ExStep1 from "./ExStep1"
// import momentTZ from "moment-timezone";
import "react-calendar/dist/Calendar.css";
import "../../pages/styles/calendar.css";
import { useEffect, useState } from "react";

import ExStep3Info from "./ExStep3Info";

import {
    FaDog,
    FaUserSlash,
    FaUser,
    FaArrowDown19,
    FaArrowUp19,
} from "react-icons/fa6";
import { MdFastfood, MdNoFood } from "react-icons/md";
import { CiWifiOn, CiWifiOff } from "react-icons/ci";
import {
    LuFilePlus,
    LuParkingCircle,
    LuParkingCircleOff,
    LuCamera,
    LuCameraOff,
} from "react-icons/lu";
export default function ExStep3({ information }) {

    const [selectTab, setSelectTab] = useState("이용정보");

    console.log("데이ㅏㅌ", information)

    const handleTab = (tab) => {
        setSelectTab(tab);
    }

    if (!information) {
        return <div>로딩중..</div>;
    }

    const infoGridStyle = "col-span-1 w-full font-bold text-xl";
    const infoH1GridStyle = "col-span-2 text-[14px] my-auto";
    const infoH1GridStyle2 = "flex gap-1 text-[24px] my-auto text-popple";
    const tabStyle = "cursor-pointer mr-4 text-center w-[80px]";

    return (
        <div className="mt-10 h-full">
            <h1 className="text-2xl m-10">{information.exhibitionName}</h1>
            <div className="grid grid-cols-7 w-full mt-6">
                {/* 정보 */}
                <div className="col-span-5">
                    {/* 타이틀 아래 div들 */}
                    <div className="grid grid-cols-2">
                        {/* 포스터 */}
                        <div className="">
                            <img src={information.poster} alt="포스터 이미지" className="w-[70%] mx-auto" />
                        </div>

                        {/* 간략 내용 */}
                        <div className="grid grid-cols-3 my-auto gap-14">
                            <label htmlFor="location" className={infoGridStyle}>장소</label>
                            <h1 id="location" className={infoH1GridStyle} >{information.address} {information.detailAddr}</h1>
                            <label htmlFor="location" className={infoGridStyle}>기간</label>
                            <h1 id="location" className={infoH1GridStyle}>{information.startAt}-{information.endAt}</h1>
                            <label htmlFor="location" className={infoGridStyle}>관람연령</label>
                            <h1 id="location" className={infoH1GridStyle}>{information.constraints.grade ? "전연령" : "19세 이상"}</h1>
                            <label htmlFor="location" className={infoGridStyle}>입장료</label>
                            <h1 id="location" className={infoH1GridStyle}>{information.fee ? information.fee + "원" : "무료"}</h1>
                            <label htmlFor="location" className={infoGridStyle}>주의사항</label>
                            <h1 id="location" className={infoH1GridStyle2}>
                                {information.constraints.food && <MdFastfood />}
                                {information.constraints.park && <LuParkingCircle />}
                                {information.constraints.wifi && <CiWifiOn />}
                                {information.constraints.pet && <FaDog />}
                                {information.constraints.kids && <FaUser />}
                                {information.constraints.camera && <LuCamera />}
                            </h1>
                        </div>
                    </div>
                    <div className="mt-8 border-b-2 border-[#868686]">
                        <nav className="flex pb-2 ml-4">

                            <div className={tabStyle} onClick={() => handleTab("이용정보")}>이용정보</div>
                            <div className={tabStyle} onClick={() => handleTab("리뷰")}>리뷰</div>
                            <div className={tabStyle} onClick={() => handleTab("EVENT")}>EVENT</div>
                        </nav>
                    </div>
                    <div className="mt-4">
                        {selectTab === "이용정보" && <ExStep3Info information={information}/>}
                        {selectTab === "리뷰" && <ReviewInDetail />}
                        {selectTab === "EVENT" && <span>3</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
