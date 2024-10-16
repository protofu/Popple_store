import { SwiperSlide } from "swiper/react";

export default function PostMiniCard({isActive, isPrev, isNext, data}) {
  return (
    <div
        className={`transition-all duration-300 ease-in-out transform
        ${
        isActive
            ? "scale-100"
            : isPrev || isNext
            ? "scale-90"
            : "scale-75"
        }`}
    >
        <img
        className="h-auto object-cover"
        src={data.title}
        alt={`Slide ${data.id}`}
        />
    </div>
  );
}
