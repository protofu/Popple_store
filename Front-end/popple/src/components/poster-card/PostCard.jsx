import PropTypes from "prop-types";
import CateButton from "../common/CateButton";

export default function PostCard({ img, title, addr, duration, styles }) {
  return (
    <div className={styles}>
      <img src={img} alt="포스터이미지" />
      <div className="mt-2">
        <CateButton text={"HOT"} />
        <p className="font-bold text-[1.25rem] my-1">{title}</p>
        <p className="text-[1rem] text-[#4e4e4e]">{addr}</p>
        <p className="text-[1rem] text-[#8b8888]">{duration}</p>
      </div>
    </div>
  );
};

// PropTypes 정의
PostCard.propTypes = {
  img: PropTypes.object.isRequired,      // 이미지 URL
  title: PropTypes.object.isRequired,     // 제목
  addr: PropTypes.object.isRequired,      // 주소
  duration: PropTypes.object.isRequired,  // 기간
  styles: PropTypes.object.isRequired,    // 스타일
};