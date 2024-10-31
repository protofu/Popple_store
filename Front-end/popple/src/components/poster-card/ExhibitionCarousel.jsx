import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ExhibitionCard from "./ExhibitionCard";
import { exhibitionAPI } from "../../api/services/Exhibition";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ExhibitionCarousel() {
  const navigate = useNavigate();
  const posterURL = import.meta.env.VITE_EXHIBITION_POSTER;

  const [mostVisitExhibitions, setMostVisitExhibitions] = useState([]);
  const getExhibitionByVisitCount = async () => {
    const res = await exhibitionAPI.getlist(2);
    const visitCountRes = res.data.sort((a, b) => b.visitCount - a.visitCount);
    setMostVisitExhibitions(visitCountRes);
  };

  useEffect(() => {
    getExhibitionByVisitCount();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/exhibition/detail/${id}`);
  };

  return (
    // div flex로 묶고 버튼 왼쪽 오른쪽 두고
    // 네비게이션에 nextEl: ".arrow-left", prevEl:".arrow-right"
    <div className="flex justify-cente items-center relative overflow-hidden w-full">
      {mostVisitExhibitions?.length > 3 &&
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
          {mostVisitExhibitions.slice(0, 5).map((item, index) => (
            <SwiperSlide key={item.id} onClick={() => handleNavigate(item.id)} className="cursor-pointer">
              <ExhibitionCard img={`${posterURL}${item.savedImage}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      }
    </div>
  );
}