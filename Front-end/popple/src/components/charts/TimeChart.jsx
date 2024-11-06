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
    "18~20": "#8c564b",
    "20~22": "#e377c2",
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
                      {point.data.timeGroup}시 ({point.data.count}명)
                  </div>
              )
          }}
          enableLabel={false}
          enableGridY={false}
          enableTotals={true}
          enableGridX={true}
          labelSkipHeight={12}          
          valueFormat={(v) => v+"%"}
      />
    </div>
  );
};
