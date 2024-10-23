import { ResponsiveBar } from "@nivo/bar";

export default function AgeChart({ chart }) {
  const curYear = new Date().getFullYear();

  const barChart = chart.reduce((acc, item) => {
    const birthYear = new Date(item.user.birth).getFullYear();
    const age = curYear - birthYear;

    // Determine age group
    let ageKey;
    if (age < 10) {
      ageKey = "10대";
    } else if (age < 20) {
      ageKey = "10대";
    } else if (age < 30) {
      ageKey = "20대";
    } else if (age < 40) {
      ageKey = "30대";
    } else if (age < 50) {
      ageKey = "40대";
    } else {
      ageKey = "50대~";
    }

    // Initialize count
    if (!acc[ageKey]) {
      acc[ageKey] = 0;
    }

    // Increment count
    acc[ageKey] += 1;
    return acc;
  }, {});

  // Convert to array for Nivo
  const barChartData = Object.entries(barChart).map(([key, value]) => ({
    ageGroup: key,
    count: value,
  }));

  const totalCount = barChartData.reduce((acc, item) => acc + item.count, 0);

  console.log(barChartData);

  return (
    <div className="w-[400px] h-[200px]">
      <ResponsiveBar
        data={barChartData}
        keys={['count']}
        indexBy="ageGroup"
        margin={{ top: 50, right: 30, bottom: 50, left: 30 }}
        padding={0.2}
        barThickness={10} // 막대 너비 조정
        axisLeft={{
          tickValues: [], // 눈금 제거
          // 추가적인 설정이 필요하면 여기에 추가
        }}
        gridYValues={[]} // Y축 그리드 라인 제거
        label={(d) => {
          const percentage = ((d.value / totalCount) * 100).toFixed(1); // 백분율 계산
          return `${percentage}%`; // 퍼센트로 표시
        }}
        labelTextColor="#fff"
        labelTextSize={10}
        // labelSkipHeight={20} // 레이블의 최소 높이 설정
        colors="#8900E1" // 막대 색상 설정
        labelPosition="top" // 레이블을 막대의 상단에 위치
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e => `${e.id}: ${e.formattedValue} in age group: ${e.indexValue}`}
      />
    </div>
  );
}
