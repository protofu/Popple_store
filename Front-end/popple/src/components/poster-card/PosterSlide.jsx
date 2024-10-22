import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import PostCard from "./PostCard";
import PropTypes from "prop-types";

export default function PosterSlide({ items }) {
  console.log(items);
  return (
    // div flex로 묶고 버튼 왼쪽 오른쪽 두고
    // 네비게이션에 nextEl: ".arrow-left", prevEl:".arrow-right"
    <div className="flex justify-center items-center relative overflow-hidden w-full">
      <IoArrowBackCircleOutline className="arrow-left arrow size-[3rem] left-0 top-[40%] transform -translate-y-1/2 z-10 cursor-pointer text-zinc-600" />
      <Swiper
        slidesPerView={6}
        centeredSlides={false}
        spaceBetween={25}
        navigation={{ prevEl: ".arrow-left", nextEl:".arrow-right" }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="w-full h-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <PostCard 
              key={index} 
              img={item.img} 
              title={item.title} 
              addr={item.addr} 
              duration={item.duration}
              styles={"w-full h-auto"}
            />
        </SwiperSlide>
        ))}
      </Swiper>
      <IoArrowForwardCircleOutline className="arrow-right arrow size-[3rem] right-0 transform -translate-y-1/2 z-10 cursor-pointer text-zinc-600" />
    </div>
  );
}

PosterSlide.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    addr: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  })).isRequired,
};
