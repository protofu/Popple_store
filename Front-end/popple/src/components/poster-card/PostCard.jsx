import CateButton from "../common/CateButton";

export default function PostCard({ img, title, addr, duration  }) {
  return (
    <div>
      <img src={img} alt="포스터이미지" />
      <div className="mt-2">
        <CateButton text={"HOT"} />
        <p className="font-bold text-[1.25rem] my-1">{title}</p>
        <p className="text-[1rem] text-[#4e4e4e]">{addr}</p>
        <p className="text-[1rem] text-[#8b8888]">{duration}</p>
      </div>
    </div>
  );
};
