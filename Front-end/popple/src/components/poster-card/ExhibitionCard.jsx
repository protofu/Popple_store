import PropTypes from "prop-types";

export default function ExhibitionCard({ img }) {
  return (
    <div className="relative w-full h-[500px]">
      {/* 배경 이미지와 투명도 설정 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${img})` }}
      />
      {/* 실제 이미지 */}
      <img src={img} alt="이미지" className="relative h-full object-contain mx-auto z-10" />
    </div>  
  );
};

ExhibitionCard.propTypes = {
  img: PropTypes.string.isRequired,
};
