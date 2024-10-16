import { Swiper, SwiperSlide } from "swiper/react";
import PostMiniCard from "./PostMiniCard";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/zIndex.css";
import Img1 from "../../assets/img1.png";
import Img2 from "../../assets/img2.png";
import Img3 from "../../assets/img3.png";
import Img4 from "../../assets/img4.png";

export default function PostCarousel() {
  const arr = [
    { id: 1, title: Img1 },
    { id: 2, title: Img2 },
    { id: 3, title: Img3 },
    { id: 4, title: Img4 },
    { id: 5, title: Img1 },
    { id: 6, title: Img2 },
    { id: 7, title: Img3 },
    { id: 8, title: Img4 },
  ];

  return (
    // div flex로 묶고 버튼 왼쪽 오른쪽 두고
    // 네비게이션에 nextEl: ".arrow-left", prevEl:".arrow-right"
    <div className="flex justify-center relative w-full">
      <button className="arrow-left arrow">좌</button>
      <Swiper
        loop
        slidesPerView={5}
        centeredSlides={true}
        spaceBetween={0}
        navigation={{ prevEl: ".arrow-left", nextEl:".arrow-right" }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper w-full"
      >
        {arr.map((data, index) => (
          <SwiperSlide key={data.id} >
          {({ isActive, isPrev, isNext }) => (
            <PostMiniCard 
              isActive={isActive} 
              isPrev={isPrev} 
              isNext={isNext} 
              data={data} 
            />
          )}
        </SwiperSlide>
        ))}
      </Swiper>
      <button className="arrow-right arrow">우</button>
    </div>
  );
}
