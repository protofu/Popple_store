import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import AgeChart from "./AgeChart";
import GenderChart from "./GenderChart";
import { useEffect, useState } from "react";
import { visitAPI } from "../../api/services/Visit";
import { useParams } from "react-router-dom";

export default function MiniStatistics({ chart }) {
  // 전체 길이 (사람수)
  const [humanCount, setHumanCount] = useState(0);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);

  // 포맷하는 함수
  const formatData = (data) => {
    return Object.entries(data).map(([id, value]) => ({
      id,
      value
    }));
  };

  useEffect(() => {
    const getGenderData = async () => {
      setLoading(true);
      try {
        const genderResponse = await visitAPI.genderStatistic(id);
        const ageResponse = await visitAPI.ageStatistic(id);
        console.log(ageResponse.data.stats);

        setHumanCount(genderResponse.data.stats.female + genderResponse.data.stats.male);
        setGenderData(formatData(genderResponse.data.stats));
        setAgeData(formatData(ageResponse.data.stats))
        console.log(formatData(ageResponse.data.stats));     
      } catch (error) {
        console.error("Error fetching gender data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    getGenderData(); // 함수를 호출합니다.
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }
  // console.log(genderData.find(item => item.id === "male").value / );

  // 백분율 계산
  const malePer = Math.round((genderData.find(item => item.id === "male").value) / humanCount * 100, 2);
  const femalePer = Math.round((genderData.find(item => item.id === "female").value) / humanCount * 100, 2);
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 w-full h-[250px]">
      <div className="border-2 border-[#8900E17D] border-r-[1px] rounded-tl-lg rounded-bl-lg">
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
          <GenderChart pieChartData={genderData} />
        </div>
      </div>
      <div className="border-2 border-[#8900E17D] border-l-[1px] rounded-tr-lg rounded-br-lg">
        <h1 className="text-lg font-bold m-2 ml-4">연령</h1> 
        <AgeChart chart={ageData} humanCount={humanCount} />
      </div>
      {/* <button className="text-white bg-popple hover:bg-popple-dark hover:text-popple-light text-lg hover:shadow-lg shadow-">버튼</button> */}
    </div>
  );
};
