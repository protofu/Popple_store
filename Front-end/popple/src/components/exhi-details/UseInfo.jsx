import MiniStatistics from "../charts/MiniStatistics";

export default function UseInfo({ data, chart }) {
  const h1Style = "font-bold text-[1.25rem]";
  const innerInfo = "m-6";

  const sections = [
    { title: "관람정보", content: data.notice },
    { title: "공지사항", content: data.notice },
    { title: "상세정보", content: data.notice },
    { title: "방문통계", content: <MiniStatistics chart={chart} /> },
  ];
  // 방문 통계
  // 남여 비율은 백엔드에서 계산하여 % 값만 front로 던져줌

  // 나이대별 비율도 100% 기준 10대부터 %값으로 주어짐

  return (
    <div className="flex flex-col gap-8 mb-[2rem] mx-12 mt-12 h-full">
      {sections.map((section, index) => (
        <div key={index}>
          <h1 className={h1Style}>{section.title}</h1>
          <div className={innerInfo}>{section.content}</div>
        </div>
      ))}
    </div>
  );
};
