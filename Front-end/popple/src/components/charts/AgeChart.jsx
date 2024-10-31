import { ResponsiveBar } from "@nivo/bar";

export default function AgeChart({ ageData, humanCount }) {
  const result = [];

  for (const [key, count] of Object.entries(ageData)) {
    let ageGroup;

    // key에 따라 변환
    switch (key) {
      case "Teens":
        ageGroup = "10대";
        break;
      case "Twenties":
        ageGroup = "20대";
        break;
      case "Thirties":
        ageGroup = "30대";
        break;
      case "Forties":
        ageGroup = "40대";
        break;
      case "Fifties_above":
        ageGroup = "50대 이상";
        break;
      default:
        ageGroup = key; // 기본값 설정
    }

    // 백분율 계산
    const value = humanCount > 0 ? ((count / humanCount) * 100).toFixed(2) : 0;

    // 결과에 추가
    result.push({
      key: ageGroup,
      count,
      value: parseFloat(value) // string이 아닌 숫자로 변환
    });
  }

  return result;
};


  const ageGroupColors = {
    "10대": "#1f77b4",
    "20대": "#ff7f0e",
    "30대": "#2ca02c",
    "40대": "#d62728",
    "50대~": "#9467bd",
  };
  console.log(barChartData);
  
  return (
    <div className="w-full h-[200px] mx-auto">
      <ResponsiveBar
          data={barChartData}
          key={barChartData => barChartData.ageGroup}
          indexBy={"ageGroup"}
          margin={{ top: 20, right: 100, bottom: 50, left: 0 }}
          padding={0.3}
          maxValue={Math.floor(maxValueItem.value+10)}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={(bar) => ageGroupColors[bar.data.ageGroup] || "#000"}
          tooltip={ point => {
              return (
                  <div className="bg-white p-2 rounded-lg shadow-md text-black">
                      {point.data.ageGroup} ({point.data.count}명)
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
                dataFrom: 'indexes',
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
