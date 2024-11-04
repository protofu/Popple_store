export default function NoList({ text }) {
  return (
    <div className="relative text-center p-6">
      <h2 className="text-xl font-bold text-gray-600 mb-4">
        {text}
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
