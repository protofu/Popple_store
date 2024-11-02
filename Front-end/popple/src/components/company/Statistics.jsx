import { useEffect, useState } from "react";
import { visitAPI } from "../../api/services/Visit";
import AgeChart from "../charts/AgeChart";
import GenderChart from "../charts/GenderChart";

export default function Statistics({ eventId, onClose  }) {
  const [chartData, setChartData] = useState({ 
    ageData:[],
    genderData:[],
    timeData:[],
    weekData:[],
    humanCount:-1 
  });

  // 넘겨줄 형식을 맞추기 위한 함수
  function transformData(data) {
    return Object.entries(data).map(([id, value]) => ({
      id,
      value,
    }));
  }
  // value값을 다 더하는 (사람수 구하는) 함수
  function sumValues(data) {
    return Object.values(data).reduce(function(total, value) {
      return total + value;
    }, 0);
  }


  // 데이터를 불러올 함수
  const getChartDatas = async () => {
    const ageRes = await visitAPI.ageStatistic(eventId);
    const genderRes = await visitAPI.genderStatistic(eventId);
    const timeRes = await visitAPI.timeStatistic(eventId);
    const weekRes = await visitAPI.weekStatistic(eventId);
    // chart데이터들과 humanCount 설정
    setChartData({
      ageData: transformData(ageRes.data.stats), // 나이 데이터
      genderData: transformData(genderRes.data.stats),
      timeData: transformData(timeRes.data.stats),
      weekData: transformData(weekRes.data.stats),
      humanCount: sumValues(ageRes.data.stats) // 사람 수
    });
  }
  
  useEffect(() => {
    getChartDatas();
  }, [eventId])
  
  // 데이터가 준비되기 전에는 로딩 중 메시지를 표시
  if (
    chartData.ageData.length === 0 ||
    chartData.genderData.length === 0 ||
    chartData.timeData.length === 0 ||
    chartData.weekData.length === 0 ||
    chartData.humanCount === -1
  ) {
    return <div>로딩중</div>;
  }
  
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between mx-3">
        <p className="text-[24px] inline-block">방문통계</p>
        <span>누적 방문자, 총 <span className="font-bold text-[24px] text-popple-light">{chartData.humanCount}</span>명</span>
      </div>
      <div className="flex flex-col gap-2">
        {/* ageChart */}
        <div className="border-2 rounded-2xl  ">
          <AgeChart ageData={chartData.ageData} humanCount={chartData.humanCount} />
        </div>
        {/* genderChart */}
        <div className="border-2 h-[200px] rounded-2xl  ">
          <GenderChart pieChartData={chartData.genderData} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* timeChart */}
        <div className="border-2 rounded-2xl  ">
          시간별 차트가 들어올 자리
        </div>
        {/* weekChart */}
        <div className="border-2 rounded-2xl  ">
          요일별 차트가 들어올 자리
        </div>
      </div>
      <div className="flex justify-end">
        <div className="p-1 w-[9%] text-center rounded-lg mb-2 mr-0 border-1 font-bold text-white bg-popple-light shadow-lg cursor-pointer" onClick={onClose}>이전으로</div>
      </div>
    </div>
  );
};
