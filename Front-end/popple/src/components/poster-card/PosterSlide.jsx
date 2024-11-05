import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";

function dateToString(arr) {
  const [y,m,d] = arr;
  return y+"."+m+"."+d;
}

export default function PosterSlide({ items }) {
  const posterURL = import.meta.env.VITE_EXHIBITION_POSTER;
  return (
    // div flex로 묶고 버튼 왼쪽 오른쪽 두고
    // 네비게이션에 nextEl: ".arrow-left", prevEl:".arrow-right"
    <div className="flex flex-wrap w-full items-center">
      <IoArrowBackCircleOutline className="arrow-left arrow size-10 cursor-pointer text-zinc-600" />
      <div className="flex justify-center items-center w-[calc(100%-100px)]">
        { 
          <Swiper
            loop={true} // 무한 슬라이드
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
            }}
            navigation={{ prevEl: ".arrow-left", nextEl:".arrow-right" }}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            modules={[Navigation, Pagination]}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <PostCard 
                  key={item.id}
                  id={item.id}
                  img={`${posterURL}${item.savedImage}`} 
                  title={item.exhibitionName} 
                  addr={item.address} 
                  styles={"aspect-[2/3] w-[15rem] h-auto"}
                  duration={dateToString(item.startAt) + " - " + dateToString(item.endAt)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        }
      </div>
      <IoArrowForwardCircleOutline className="arrow-right arrow size-10 cursor-pointer text-zinc-600" />
    </div>
  );
}

