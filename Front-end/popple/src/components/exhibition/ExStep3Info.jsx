import MiniStatistics from "../charts/MiniStatistics";


import {
  FaDog,
  FaUserSlash,
  FaArrowUp19,
} from "react-icons/fa6";
import { MdNoFood } from "react-icons/md";
import { CiWifiOff } from "react-icons/ci";
import {
  LuParkingCircleOff,
  LuCameraOff,
} from "react-icons/lu";
import { TbCurrencyDollarOff } from "react-icons/tb";
import MDEditor from "@uiw/react-md-editor";

const escapeHtml = (text) => {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

export default function ExStep3Info({information}) {

    const h1Style = "font-bold text-[1.25rem]";
    const innerInfo = "m-6";

    const sections = [
        { title: "관람정보", content: information.notice },
        { title: "공지사항", content: information.notice },
        { title: "상세정보", content: information.detailDescription },
        // { title: "상세이미지", content: information.image}
    ];


    return (
      <div className="flex flex-col gap-8 mb-[2rem] mx-12 mt-12 h-full">
      <div className="">
        <h1 className={h1Style}>주의사항!</h1>
        <IconBox information={information}/>
      </div>
      {sections.map((section, index) => (
        section.content !== "" && (
          <div key={index}>
            <h1 className={h1Style}>{section.title}</h1>
            <div className={innerInfo}>{section.content}</div>
          </div>
        )
      ))}
    </div>
    );
};
function IconBox({ information }) {;
    //
    const spanStyle = "w-[95px]";
    const iconStyle = "text-popple w-full flex flex-col items-center";
    const innerIconStyle = "size-[36px] mb-2";
    const innerTextStyle = "text-[12px] text-center";
    return (
      <div className="flex mt-5 gap-3">
        {/* {data.fee === "0" ? <LuParkingCircle /> : <LuParkingCircleOff />} */}
        {!information.food && 
        <span className={spanStyle}>
          <div className={iconStyle}><MdNoFood className={innerIconStyle}/><span className={innerTextStyle}>음식물<br />반입금지</span></div>
        </span>}
        {!information.grade &&  
        <span className={spanStyle}>
          <div className={iconStyle}><FaArrowUp19 className={innerIconStyle}/><span className={innerTextStyle}>청소년 관람 불가</span></div>
        </span>}
        {!information.kids &&  
        <span className={spanStyle}>
          <div className={iconStyle}><FaUserSlash className={innerIconStyle}/><span className={innerTextStyle}>노키즈존</span></div>
        </span>}
        {!information.wifi &&  
        <span className={spanStyle}>
          <div className={iconStyle}><CiWifiOff className={innerIconStyle}/><span className={innerTextStyle}>와이파이 불가</span></div>
        </span>}
        {!information.park &&  
          <span className={spanStyle}>
            <div className={iconStyle}><LuParkingCircleOff className={innerIconStyle}/><span className={innerTextStyle}>주차 불가</span></div>
          </span>}
        {information.pet &&  
        <span className={spanStyle}>
          <div className={iconStyle}><FaDog className={innerIconStyle}/><span className={innerTextStyle}>반려동물<br />동반가능</span></div>
        </span>}
        {!information.camera &&  
        <span className={spanStyle}>
          <div className={iconStyle}><LuCameraOff className={innerIconStyle}/><span className={innerTextStyle}>카메라 가능</span></div>
        </span>}
        {information.fee === "0" &&  
        <span className={spanStyle}>
          <div className={iconStyle}><TbCurrencyDollarOff className={innerIconStyle}/><span className={innerTextStyle}>입장료 무료</span></div>
        </span>}
      </div>
    );
  };