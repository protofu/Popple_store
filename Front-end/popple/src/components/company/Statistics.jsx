import { useEffect, useState } from "react";
import { visitAPI } from "../../api/services/Visit";
import AgeChart from "../charts/AgeChart";
import GenderChart from "../charts/GenderChart";
import TimeChart from "../charts/TimeChart";
import WeekChart from "../charts/WeekChart";
import { exhibitionAPI } from "../../api/services/Exhibition";
import { replace } from "react-router-dom";
import moment from "moment";

export default function Statistics({ eventId, onClose, getStatus  }) {
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
  const [exhi, setExhi] = useState({});

  const getExhi = async() => {    
   try {
    const res = await exhibitionAPI.get(eventId)
   
    setExhi(res.data)
   } catch (error) {
    console.error(error)
   }
  }
  console.log(exhi)

  useEffect(() => {
    getExhi();
  }, []);
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
  const today = new Date();
  const startAt = new Date(exhi.startAt)
  const endAt = new Date(exhi.endAt)
  const dDay = moment(startAt).diff(moment(), 'days')+1;


  console.log(Math.ceil(exhi.startAt <= today && today <= exhi.endAt))
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="border-2 rounded-2xl p-3 grid grid-cols-3 ">
        <div className="font-bold">{exhi.exhibitionName}</div>
        <div className="text-center">
          {
          today >= startAt && today <= endAt ? <p className="text-green-600 font-bold">진행중</p> : 
              today < startAt ? <p className="text-red-500 font-bold">오픈 D-Day{dDay}</p> : 
              <p className="text-gray-400 font-bold">종료</p>
              }
        </div>
        <div className="font-bold text-end">
          {new Date(exhi.startAt).toLocaleDateString('ko-KR').replace(/,/g, '.')} ~ 
          {new Date(exhi.endAt).toLocaleDateString('ko-KR').replace(/,/g, '.')}
      </div>
      </div>
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
         <TimeChart timeData={chartData.timeData} humanCount={chartData.humanCount} />
        </div>
        {/* weekChart */}
        <div className="border-2 rounded-2xl  ">
          <WeekChart weekData={chartData.weekData} humanCount={chartData.humanCount} />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="p-1 w-[9%] text-center rounded-lg mb-2 mr-0 border-1 font-bold text-white bg-popple-light shadow-lg cursor-pointer" onClick={onClose}>이전으로</div>
      </div>
    </div>
  );
};
