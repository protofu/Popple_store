import PropTypes from "prop-types";
import CateButton from "../common/CateButton";
import { useNavigate } from "react-router-dom";

export default function PostCard({ id, img, title, addr, duration, styles }) {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    let basePath;

    // 현재 경로에 따라 basePath 결정
    if (location.pathname.includes('/pop-up')) {
      basePath = '/pop-up/detail';
    } else if (location.pathname.includes('/exhibition')) {
      basePath = '/exhibition/detail';
    }

    // 동적으로 URL 생성
    navigate(`${basePath}/${id}`);
  };

  return (
    <div className={`${styles} cursor-pointer`} onClick={() => handleNavigate(id)}>
      <img src={img} className="min-h-[275px] max-w-[180px]" alt="포스터이미지" />
      <div className="mt-2">
        <CateButton text={"HOT"} />
        <p className="font-bold text-[1.25rem] my-1">{title}</p>
        <p className="text-[1rem] text-[#4e4e4e]">{addr}</p>
        <p className="text-[1rem] text-[#8b8888]">{duration}</p>
      </div>
    </div>
  );
};
