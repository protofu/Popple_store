import { ResponsiveBar } from "@nivo/bar";

export default function AgeChart({ chart }) {
  const curYear = new Date().getFullYear();
  let totalCount = 0;

  const barChart = chart.reduce((acc, item) => {
    const birthYear = new Date(item.user.birth).getFullYear();
    const age = curYear - birthYear;
    totalCount += 1;
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
    value: Math.round((value / totalCount) * 100 * 100) / 100,
  }));
  // 눈금 최대치 구하기 위해 맥스값 계산
  const maxValueItem = barChartData.reduce((max, item) => (item.value > max.value ? item : max), barChartData[0]);

  return (
    <div className="w-[400px] h-[200px]">
      <ResponsiveBar
          data={barChartData}
          key={bar => bar.generation}
          indexBy={"ageGroup"}
          margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
          padding={0.3}
          maxValue={Math.floor(maxValueItem.value+10)}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'category10' }}
          colorBy="id"
          id="ageGroup"
          tooltip={ point => {
              return (
                  <div className="bg-white p-2 rounded-lg shadow-md text-black">
                      {point.data.generation} ({point.data.count}명)
                  </div>
              )
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '나이대',
              legendPosition: 'middle',
              legendOffset: 32,
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '방문자 수',
              legendPosition: 'middle',
              legendOffset: -40,
          }}
          enableTotals={true}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
      />
    </div>
  );
}
