export default function NoEventList({ text }) {
  return (
    <div className="relative text-center p-6">
      <h2 className="text-xl font-bold text-gray-600 mb-4">
        현재 진행중인 {text}가 없어요...
      </h2>
      <figure className="inline-block animate-float">
        <img
          src="/icons/404-illust.svg"
          alt="비어있다 이미지"
          className="w-64 h-48 opacity-90"
        />
      </figure>
    </div>
  );
};
