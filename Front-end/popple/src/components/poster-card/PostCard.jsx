import PropTypes from "prop-types";
import CateButton from "../common/CateButton";
import { useNavigate } from "react-router-dom";

export default function PostCard({ id, img, title, addr, duration, styles, typeId }) {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    let basePath;

    // 현재 경로에 따라 basePath 결정
    if (location.pathname.includes('/pop-up')) {
      basePath = '/pop-up/detail';
    } else if (location.pathname.includes('/exhibition')) {
      basePath = '/exhibition/detail';
    } else if (typeId !== null) {
      if (typeId === 1) {
        basePath = '/pop-up/detail';
      } else if (typeId === 2) {
        basePath = '/exhibition/detail';
      }
    }

    // 동적으로 URL 생성
    navigate(`${basePath}/${id}`);
  };

  return (
    <div className={`${styles} cursor-pointer`} onClick={() => handleNavigate(id)}>
      <img src={img ? `${img}` : '/waiting_for_Image.png'} className="min-h-[275px] max-w-[200px] rounded-lg shadow-xl" alt="포스터이미지" />
      <div className="relative mt-2 max-w-[200px]">
        <p className="font-bold text-[1rem] my-1 min-h-[50px]">{title}</p>
        <p className="text-[0.8rem] text-[#4e4e4e]">{addr}</p>
        <p className="text-[0.8rem] text-[#8b8888]">{duration}</p>
      </div>
    </div>
  );
};
