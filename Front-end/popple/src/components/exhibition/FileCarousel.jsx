import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/zIndex.css";

export default function FileCarousel({ preview2 }) {
  console.log(preview2)

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={5}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="fileSwiper mySwiper"
    >
      {preview2.map((data, index) => (
        <SwiperSlide key={index}>
          <img src={data} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
