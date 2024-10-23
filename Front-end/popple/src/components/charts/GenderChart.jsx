import { ResponsivePieCanvas } from "@nivo/pie";

export default function GenderChart({ chart }) {
  const pieChart = chart.reduce((acc, item) => {
    const genderKey = item.user.gender ? "male" : "female";
    acc[genderKey] += 1;
    return acc;
  }, { male: 0, female: 0 });

  const pieChartData = Object.entries(pieChart).map(([key, value]) => ({
    id: key,
    value: value,
  }));

  return (
    <div className="w-full h-[200px]">
      <ResponsivePieCanvas
        data={pieChartData}
        margin={{ top: 40, bottom: 40 }}
        innerRadius={0.5} // 중앙 원 반지름 사이즈
        padAngle={0.7}  // 나뉘는 부분 갭
        cornerRadius={3}  // 코너 라운딩
        // colors={{ scheme: 'paired' }} // 테마
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            // translateX: 140,
            translateY: 30,
            // itemsSpacing: 2,
            itemWidth: 60,
            itemHeight: 14,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 14,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  );
}