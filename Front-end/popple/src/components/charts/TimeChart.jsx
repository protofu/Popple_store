import { ResponsiveBar } from "@nivo/bar";
import { useEffect } from "react";

export default function TimeChart({ timeData, humanCount }) {
  const result = [];
  console.log(timeData);

  useEffect(() => {
    timeData.forEach((item) => {
      //item.id 값 변경 : Thirties => 30대, Teens => 10대, Forties => 40대, Twenties => 20대, Fifties_above => 50대~
      let groupName = item.id;
      if (item.id === "TenAM") {
        groupName = "08~10";
      } else if (item.id === "TwelvePM") {
        groupName = "10~12";
      } else if (item.id === "TwoPM") {
        groupName = "12~14";
      } else if (item.id === "FourPM") {
        groupName = "14~16";
      } else if (item.id === "SixPM") {
        groupName = "16~18";
      } else if (item.id === "EightPM") {
        groupName = "18~20";
      } else if (item.id === "TenPM") {
        groupName = "20~22";
      }
      result.push({ timeGroup: groupName, value: humanCount === 0 ? humanCount : Math.round((item.value) / humanCount * 100, 2), count: item.value });
      result.sort((a, b) => a.timeGroup.localeCompare(b.timeGroup));
    }); 
  }, [timeData]);

  const timeGroupColors = {
    "8~10": "#1f77b4",
    "10~12": "#ff7f0e",
    "12~14": "#2ca02c",
    "14~16": "#d62728",
    "16~18": "#9467bd",
    "18~20": "#9467bd",
    "20~22": "#9467bd",
  };

  return (
    <div className="w-full h-[200px] mx-auto">
      <ResponsiveBar
          data={result}
          key={barChartData => barChartData.timeGroup.value}
          indexBy={"timeGroup"}
          margin={{ top: 20, right: 100, bottom: 50, left: 60 }}
          padding={0.3}
          layout="horizontal"
          maxValue={100}
          valueScale={{ type: 'linear', max: 100 }}
          indexScale={{ type: 'band', round: true }}
          colors={(bar) => timeGroupColors[bar.data.timeGroup] || "#000"}
          tooltip={ point => {
              return (
                  <div className="bg-white p-2 rounded-lg shadow-md text-black">
                      {point.data.timeGroup} ({point.data.count}명)
                  </div>
              )
          }}
          enableLabel={false}
          enableGridY={false}
          enableTotals={true}
          enableGridX={true}
          labelSkipHeight={12}
          valueFormat={(v) => v+"%"}
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
};
