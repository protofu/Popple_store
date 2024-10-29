import { useEffect, useState } from "react";
import Vibrant from "node-vibrant";
import PropTypes from "prop-types";
import EventCard from "../EventCard";
import { eventAPI } from "../../api/services/Event";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

export default function EventCardV2({ slogun, title, duration, img }) {
  const [palette, setPalette] = useState([]);
  const [textColor, setTextColor] = useState();
  const navigate = useNavigate();
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
    return brightness > 128 ? "#ffffff" : "#000000"; // 어두운 텍스트는 검정색, 밝은 텍스트는 흰색
  }

  // 헥사코드에서 RGB로 변환
  // function hexToRgb(hex) {
  //   // 헥사코드가 #로 시작하는 경우를 처리
  //   if (hex.startsWith('#')) {
  //     hex = hex.slice(1);
  //   }

  //   // 헥사코드가 6자리인 경우에만 처리
  //   if (hex.length === 6) {
  //     const r = parseInt(hex.slice(0, 2), 16);
  //     const g = parseInt(hex.slice(2, 4), 16);
  //     const b = parseInt(hex.slice(4, 6), 16);
  //     return [r, g, b];
  //   }

  //   throw new Error('Invalid hex color format');
  // }

  // 보색을 반환하는 함수
  // function getComplementaryColor(hex) {
  //   const [r, g, b] = hexToRgb(hex);

  //   // 보색 계산
  //   const compR = 255 - r;
  //   const compG = 255 - g;
  //   const compB = 255 - b;

  //   // 헥사코드로 반환
  //   return rgbToHex(compR, compG, compB);
  // }

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
    const textc = getTextColor(hexPalette["LightVibrant"]);
    setPalette(hexPalette["LightVibrant"]);
    setTextColor(textc);
    // DarkMuted"#5c6454"
    // DarkVibrant"#76660f"
    // LightMuted"#dcd2ba"
    // LightVibrant"#ec929c"
    // Muted"#64aa7b"
    // Vibrant"#e4c728"
  }

  useEffect(() => {
    submit(img);
  }, [img]);

  const handleDelete = async (d) => {
    try {
      const res = await eventAPI.delete(d);
      console.log("res.data", d);
      alert("삭제 완료");
    } catch (error) {
      console.error(error);
      alert("삭제 불가");
    }
  };

  return (
    <button
      className={`relative flex rounded-[12px] overflow-hidden aspect-[320/100] w-full max-w-[345px] h-auto bg-black`}
      style={{ backgroundColor: palette }}
    >
      <img
        src={img}
        alt="이벤트 이미지"
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
        <button className="border p-1" type="button" onClick={handleDelete}>
          지우기
        </button>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm">{duration}</p>
      </div>
    </button>
  );
}

// PropTypes 정의
EventCardV2.propTypes = {
  slogun: PropTypes.string.isRequired, // 슬로건
  title: PropTypes.string.isRequired, // 제목
  duration: PropTypes.string.isRequired, // 기간
  img: PropTypes.string.isRequired, // 이미지 URL
};
