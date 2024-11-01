import { useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

export default function PostMiniCard({isActive, isPrev, isNext, data}) {
  const posterURL = import.meta.env.VITE_EXHIBITION_POSTER;
  const navigate = useNavigate();

  const handleClick = () => {
    let basePath;
    if (location.pathname.includes('/pop-up')) {
      basePath = '/pop-up/detail';
    } else if (location.pathname.includes('/exhibition')) {
      basePath = '/exhibition/detail';
    }

    navigate(`${basePath}/${data.id}`);
  };

  return (
    <div
        className={`flex justify-center transition-all duration-300 ease-in-out transform
        ${
        isActive
            ? "scale-100"
            : isPrev || isNext
            ? "scale-90"
            : "scale-75"
        } cursor-pointer`}
        onClick={handleClick}
    >
      <img
        className="h-auto object-cover max-h-[290px] max-w-[290px] rounded-lg"
        src={`${posterURL}${data.savedImage}`}
        alt={`Slide ${data.exhibitionName}`}
      />
    </div>
  );
}
