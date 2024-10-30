import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import PostCard from "./PostCard";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function dateToString(arr) {
  const [y,m,d] = arr;
  return y+"."+m+"."+d;
}

export default function PosterSlide({ items }) {
  const [size, setSize] = useState(window.innerWidth);
  const [slidesPerView, setSlidesPerView] = useState(6);
  useEffect(() => {
    window.addEventListener('resize', () => setSize(window.innerWidth));
    return () => window.removeEventListener('resize', () => setSize(window.innerWidth));
  }, []);
  
  useEffect(() => {
    if (size >= 1650) {
      setSlidesPerView(6)
    } else if (size >= 1400) {
      setSlidesPerView(5)
    } else if (size >= 850) {
      setSlidesPerView(4)
    } else if (size >= 660) {
      setSlidesPerView(3)
    } else {
      setSlidesPerView(2)
    }
  }, [size]);
  return (
    // div flex로 묶고 버튼 왼쪽 오른쪽 두고
    // 네비게이션에 nextEl: ".arrow-left", prevEl:".arrow-right"
    <div className="flex flex-wrap w-full items-center">
      <IoArrowBackCircleOutline className="arrow-left arrow size-10 cursor-pointer text-zinc-600" />
      <div className="flex justify-center items-center w-[calc(100%-100px)]">
        { items?.length > 0 &&
          <Swiper
            loop
            slidesPerView={slidesPerView}
            spaceBetween={5}
            centeredSlides={false}
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
                  img={item.savedImage} 
                  title={item.exhibitionName} 
                  addr={item.address} 
                  duration={dateToString(item.startAt) + " - " + dateToString(item.endAt)}
                  styles={"w-full h-auto"}
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

