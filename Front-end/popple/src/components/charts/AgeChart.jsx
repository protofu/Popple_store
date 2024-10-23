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

  // key 값만 담긴 배열
  const keyArray = Object.keys(barChart);
  console.log(keyArray);
  // Convert to array for Nivo
  const barChartData = Object.entries(barChart).map(([key, value]) => ({
    ageGroup: key,
    count: value,
    value: Math.round((value / totalCount) * 100 * 100) / 100,
  }));
  // 눈금 최대치 구하기 위해 맥스값 계산
  const maxValueItem = barChartData.reduce((max, item) => (item.value > max.value ? item : max), barChartData[0]);
  console.log(barChartData);
  
  return (
    <div className="w-full h-[200px] mx-auto">
      <ResponsiveBar
          data={barChartData}
          key={barChartData => barChartData.ageGroup}
          keys={['value']}
          indexBy={"ageGroup"}
          margin={{ top: 20, right: 100, bottom: 50, left: 0 }}
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
          axisLeft={null}
          enableTotals={true}
          enableLabel={false}
          enableGridY={false}
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
          legends={[
            {
                dataFrom: 'keys',
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
      />
    </div>
  );
}
