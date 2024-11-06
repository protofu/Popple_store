import { useEffect, useState } from "react";
import Vibrant from "node-vibrant";
import PropTypes from "prop-types";
import EventCard from "../EventCard";
import { eventAPI } from "../../api/services/Event";
import { useNavigate } from "react-router-dom";
import { useLoginUserStore } from "../../stores/LoginUserState";
import { MdOutlineCancel } from "react-icons/md";
import { poppleAlert } from "../../utils/PoppleAlert";

export default function EventCardV2({
  dispatch,
  evId,
  slogun,
  title,
  duration,
  eventImages,
  eventPoster,
  usernickname,
  description,
}) {
  const [palette, setPalette] = useState([]);
  const [textColor, setTextColor] = useState();

  function corsProxy(url) {
    return `${url}`;
  }

  function rgbToHex(r, g, b) {
    const toHex = (value) => {
      const hex = Math.round(value).toString(16); // 소수점을 반올림하고 16진수로 변환
      return hex.length === 1 ? "0" + hex : hex; // 한 자리일 경우 0을 붙임
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`; // R, G, B 값을 결합
  }

  function hexToRgb(hex) {
    // HEX 색상에서 RGB로 변환
    let r = 0,
      g = 0,
      b = 0;

    // 3자리 HEX 또는 6자리 HEX 확인
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return [r, g, b];
  }
  // 특정 색상에 대한 어울리는 텍스트 색상을 반환하는 함수
  function getTextColor(backgroundColor) {
    // HEX 배경색을 RGB로 분해
    const [r, g, b] = hexToRgb(backgroundColor);

    // 밝기 계산
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;

    // 밝기가 128보다 크면 어두운 색상, 그렇지 않으면 밝은 색상을 반환
    return brightness < 128 ? "#ffffff" : "#000000"; // 어두운 텍스트는 검정색, 밝은 텍스트는 흰색
  }

  async function submit(imgUrl) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = corsProxy(imgUrl);
    const paletteData = await Vibrant.from(image).getPalette();
    const hexPalette = {};

    for (const [key, value] of Object.entries(paletteData)) {
      const [r, g, b] = value.rgb;
      hexPalette[key] = rgbToHex(r, g, b);
    }
    const textc = getTextColor(hexPalette["DarkMuted"]);
    setPalette(hexPalette["DarkMuted"]);
    setTextColor(textc);
    // DarkMuted"#5c6454"
    // DarkVibrant"#76660f"
    // LightMuted"#dcd2ba"
    // LightVibrant"#ec929c"
    // Muted"#64aa7b"
    // Vibrant"#e4c728"
  }

  useEffect(() => {
    submit(eventPoster);
  }, [eventPoster]);

  const [isModalOpen, setModalOpen] = useState(false);

  const eventDetail = {
    evId,
    slogun,
    title,
    duration,
    eventPoster,
    eventImages,
    usernickname,
    description,
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div
        className={`relative flex rounded-[12px] overflow-hidden aspect-[320/87] w-[345px] h-auto max-w-[345px] bg-black  hover:cursor-pointer transition-transform transform hover:scale-105`}
        style={{ backgroundColor: palette }}
        onClick={handleModalOpen}
      >
        <img
          src={eventPoster}
          alt="이벤트 포스터"
          className="w-2/5 h-full object-cover rounded-[12px] ml-auto"
          style={{
            maskImage: "linear-gradient(to left, black, transparent)", // 오른쪽부터 이미지가 선명해짐
            WebkitMaskImage: "linear-gradient(to left, black, transparent)", // Webkit 호환
            backgroundColor: "black", // 투명한 부분을 검정색으로 채움
          }}
        />
        <div
          className="absolute inset-0 flex flex-col justify-center items-start px-2"
          style={{ color: textColor }}
        >
          <p className="text-sm">{slogun}</p>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm">{duration}</p>
        </div>
      </div>
      {isModalOpen && (
        <EventDetailModal
          onClose={handleModalClose}
          eventDetail={eventDetail}
          dispatch={dispatch}
          open={handleModalOpen}
        />
      )}
      
    </div>
  );
}

// PropTypes 정의
EventCardV2.propTypes = {
  slogun: PropTypes.string.isRequired, // 슬로건
  title: PropTypes.string.isRequired, // 제목
  duration: PropTypes.string.isRequired, // 기간
  eventPoster: PropTypes.string.isRequired, // 이미지 URL
};

function EventDetailModal({ onClose, eventDetail, dispatch, open, }) {
  const { loginUserNickname } = useLoginUserStore();
  const navigate = useNavigate();

  //이벤트 삭제 핸들러
  const handleDelete = async () => {
    try {
      const res = await eventAPI.delete(eventDetail.evId);
      poppleAlert.alert("","삭제 완료");
      dispatch({ type: "deleteEvent", value: eventDetail.evId });
    } catch (error) {
      poppleAlert.alert("","삭제 불가");
    }
  };

  const handleNavi = () => {
    navigate(`/event-update?id=${eventDetail.evId}`);
  };
  console.log(eventDetail.eventImages)
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-auto "
      onClick={onClose}
    >
      <div className="flex flex-col justify-evenly items-center bg-white rounded-lg p-5 w-[40%] h-auto " onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-3 w-full text-2xl font-bold border-b-2 pb-2 mb-2 ">
          <div className="inline"></div>
          <span className="text-center">{eventDetail.title}</span>
          <span className="mt-auto text-right text-sm">
            {eventDetail.duration}
          </span>
        </div>
        {eventDetail.eventImages &&
          eventDetail.eventImages.map(imgSrc => (
            <div className="">
              <img src={imgSrc} className="object-cover" />
            </div>
          ))
        }
        <div className="mt-8">
          {eventDetail.description}
        </div>
        

        <div className="w-full mt-20">
          {loginUserNickname === eventDetail.usernickname && (
            <div className="flex justify-around">
              <button className="border rounded-lg p-2" onClick={handleNavi}>
                수정
              </button>
              <span></span>
              <button
                className="border rounded-lg p-2"
                onClick={() => handleDelete()}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
