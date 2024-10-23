import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import AgeChart from "./AgeChart";
import GenderChart from "./GenderChart";
import { useState } from "react";

export default function MiniStatistics({ chart }) {
  // 전체 길이 (사람수)
  let length = 0;
  
  // gender 데이터 변환
  const pieChart = chart.reduce((acc, item) => {
    const genderKey = item.user.gender ? "male" : "female";
    length += 1;
    acc[genderKey] += 1;
    return acc;
  }, { male: 0, female: 0 });
  // 객체화
  const pieChartData = Object.entries(pieChart).map(([key, value]) => ({
    id: key,
    value: value,
  }));
  // 백분율 계산
  const malePer = Math.round((pieChartData.find(item => item.id === "male").value) / length * 100, 2);
  const femalePer = Math.round((pieChartData.find(item => item.id === "female").value) / length * 100, 2);
  
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 border-2 w-full h-[250px]">
      <div className="border-2 border-[#8900E1] border-r-[1px] rounded-tl-lg rounded-bl-lg">
        <h1 className="text-lg font-bold m-2 ml-4">성별</h1> 
        <div className="grid grid-cols-[1fr_3fr] h-[200px]">
          <div className="flex flex-col ml-2 my-auto gap-4">
            <div className="flex flex-row items-center">
              <FaMale className="m-auto text-[#1F77B4] size-16"/>
              <h1 className="text-2xl">{malePer}%</h1>
            </div>
            <div className="flex flex-row items-center my-auto">
              <FaFemale className="m-auto text-[#FF7F0E] size-16"/>
              <h1 className="text-2xl">{femalePer}%</h1>
            </div>
          </div>
          <GenderChart pieChartData={pieChartData} />
        </div>
      </div>
      <div className="border-2 border-[#8900E1] border-l-[1px] rounded-tr-lg rounded-br-lg">
        <AgeChart chart={chart} />
      </div>
    </div>
  );
};
