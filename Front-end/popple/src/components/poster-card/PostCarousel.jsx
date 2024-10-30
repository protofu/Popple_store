import { Swiper, SwiperSlide } from "swiper/react";
import PostMiniCard from "./PostMiniCard";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./styles/zIndex.css";

export default function PostCarousel({ items }) {
  return (
    // div flex로 묶고 버튼 왼쪽 오른쪽 두고
    // 네비게이션에 nextEl: ".arrow-left", prevEl:".arrow-right"
    <div className="flex justify-center relative w-full">
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
        autoplay={{ // 자동 재생
          delay: 3000, // 지연 시간 (한 슬라이더에 머물르는 시간)
          disableOnInteraction: false, // 마우스 제어 이후 자동 재생을 막을지 말지
        }}
        speed={500}
        modules={[Pagination, Autoplay]}
        className="postCarouselSwiper mySwiper w-full"
      >
        {items.map((data) => (
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
    </div>
  );
}
