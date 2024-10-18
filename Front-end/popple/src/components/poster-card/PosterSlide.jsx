import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PostCard from "./PostCard";
import PropTypes from "prop-types";

export default function PosterSlide({ items }) {
  console.log(items);
  return (
    // div flex로 묶고 버튼 왼쪽 오른쪽 두고
    // 네비게이션에 nextEl: ".arrow-left", prevEl:".arrow-right"
    <div className="flex justify-center relative overflow-hidden w-full">
      <button className="arrow-left arrow">좌</button>
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
      <button className="arrow-right arrow">우</button>
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
