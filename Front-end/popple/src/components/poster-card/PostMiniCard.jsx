import { useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

export default function PostMiniCard({isActive, isPrev, isNext, data}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${data.id}`)
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
        }`}
        onClick={handleClick}
    >
      <img
        className="h-auto object-cover max-h-[290px] max-w-[290px] rounded-lg"
        src={`http://localhost:8080/poster/${data.savedImage}`}
        alt={`Slide ${data.exhibitionName}`}
      />
    </div>
  );
}
