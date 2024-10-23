import AgeChart from "./AgeChart";
import GenderChart from "./GenderChart";

export default function MiniStatistics({ chart }) {
  return (
    <div className="flex border-2 w-full">
      <GenderChart chart={chart} />
      <AgeChart chart={chart} />
    </div>
  );
};
