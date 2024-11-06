import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/zIndex.css";
import { TiDelete } from "react-icons/ti";
export default function FileCarousel({ preview2, deleteImg }) {

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
          <button type="button" onClick={(e)=> {
            e.stopPropagation();
            deleteImg(index);
          }}>
            <TiDelete/>
            <img src={data} />
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
