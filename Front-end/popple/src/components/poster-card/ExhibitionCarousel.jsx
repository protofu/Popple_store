import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import Exhi1 from "../../assets/exhi/exhi1.png";
import Exhi2 from "../../assets/exhi/exhi2.png";
import ExhibitionCard from "./ExhibitionCard";

export default function ExhibitionCarousel() {
  const items = [
    { id: 1, img: Exhi1},
    { id: 2, img: Exhi2},
    { id: 3, img: Exhi1},
    { id: 4, img: Exhi2},
  ]

  return (
    // div flex로 묶고 버튼 왼쪽 오른쪽 두고
    // 네비게이션에 nextEl: ".arrow-left", prevEl:".arrow-right"
    <div className="flex justify-cente items-center relative overflow-hidden w-full">
      <Swiper
        loop
        slidesPerView={1}
        centeredSlides={false}
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
        className="w-full h-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <ExhibitionCard img={item.img} />
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

ExhibitionCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    addr: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  })).isRequired,
};
