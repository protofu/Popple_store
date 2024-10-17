export default function EventCard({ slogun, title, duration, img }) {
  return (
    // 300 * 100
    <div className={`relative flex rounded-[12px] overflow-hidden aspect-[3/1] w-full max-w-[280px] h-auto bg-black`}>
      <img 
        src={img} 
        alt="이벤트 이미지" 
        className="w-2/5 h-full object-cover rounded-[12px] ml-auto" 
        style={{
          maskImage: 'linear-gradient(to left, black, transparent)', // 오른쪽부터 이미지가 선명해짐
          WebkitMaskImage: 'linear-gradient(to left, black, transparent)', // Webkit 호환
          backgroundColor: 'black', // 투명한 부분을 검정색으로 채움
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-2">
        <p className="text-sm">{slogun}</p>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm">{duration}</p>
      </div>
    </div>
  );
};
