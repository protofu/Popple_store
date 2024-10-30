import MiniStatistics from "../charts/MiniStatistics";


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
import MDEditor from "@uiw/react-md-editor";


export default function UseInfo({ data, chart }) {
  console.log(data);
  const h1Style = "font-bold text-[1.25rem]";
  const innerInfo = "m-6";

  const sections = [
    { title: "관람정보", content: data.notice },
    { title: "공지사항", content: data.notice },
    { title: "상세정보", content: <MDEditor.Markdown source={data.detailDescription} /> },
    { title: "방문통계", content: <MiniStatistics chart={chart} /> },
  ];
  // 방문 통계
  // 남여 비율은 백엔드에서 계산하여 % 값만 front로 던져줌

  // 나이대별 비율도 100% 기준 10대부터 %값으로 주어짐

  return (
    <div className="flex flex-col gap-8 mb-[2rem] mx-12 mt-12 h-full">
      <div className="m-6">
        <h1 className={h1Style}>주의사항!</h1>
        <IconBox data={data}/>
      </div>
      {sections.map((section, index) => (
        <div key={index}>
          <h1 className={h1Style}>{section.title}</h1>
          <div className={innerInfo}>{section.content}</div>
        </div>
      ))}
    </div>
  );
};

function IconBox({ data }) {;
  //
  const spanStyle = "w-[95px]";
  const iconStyle = "text-popple w-full flex flex-col items-center";
  const innerIconStyle = "size-[36px] mb-2";
  const innerTextStyle = "text-[12px] text-center";
  return (
    <div className="flex mt-5 gap-3">
      {/* {data.fee === "0" ? <LuParkingCircle /> : <LuParkingCircleOff />} */}
      {!data.food && 
      <span className={spanStyle}>
        <div className={iconStyle}><MdNoFood className={innerIconStyle}/><span className={innerTextStyle}>음식물<br />반입금지</span></div>
      </span>}
      {!data.grade &&  
      <span className={spanStyle}>
        <div className={iconStyle}><FaArrowUp19 className={innerIconStyle}/><span className={innerTextStyle}>청소년 관람 불가</span></div>
      </span>}
      {!data.kids &&  
      <span className={spanStyle}>
        <div className={iconStyle}><FaUserSlash className={innerIconStyle}/><span className={innerTextStyle}>노키즈존</span></div>
      </span>}
      {!data.wifi &&  
      <span className={spanStyle}>
        <div className={iconStyle}><CiWifiOff className={innerIconStyle}/><span className={innerTextStyle}>와이파이 불가</span></div>
      </span>}
      {!data.park &&  
        <span className={spanStyle}>
          <div className={iconStyle}><LuParkingCircleOff className={innerIconStyle}/><span className={innerTextStyle}>주차 불가</span></div>
        </span>}
      {data.pet &&  
      <span className={spanStyle}>
        <div className={iconStyle}><FaDog className={innerIconStyle}/><span className={innerTextStyle}>반려동물<br />동반가능</span></div>
      </span>}
      {!data.camera &&  
      <span className={spanStyle}>
        <div className={iconStyle}><LuCameraOff className={innerIconStyle}/><span className={innerTextStyle}>카메라 가능</span></div>
      </span>}
      {data.fee === '0' &&  
      <span className={spanStyle}>
        <div className={iconStyle}><LuCameraOff className={innerIconStyle}/><span className={innerTextStyle}>입장료 무료</span></div>
      </span>}
    </div>
  );
};

