import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';

export default function WeekChart({ weekData, humanCount }) {
  // 차트에 표시할 데이터를 저장하는 state
  const [result, setResult] = useState([]);
  // y축 최대값을 위한 상태
  const [maxY, setMaxY] = useState('auto');

  useEffect(() => {
    // 요일 순서를 지정
    const dayOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  
    // weekData를 요일 순서에 따라 정렬 후, x와 y 값을 변환해 새로운 배열 생성
    const formattedData = weekData
      .sort((a, b) => dayOrder.indexOf(a.id) - dayOrder.indexOf(b.id)) // 요일 순서로 정렬
      .map((item) => {
        let groupName;
        switch (item.id) {
          case "mon": groupName = "월"; break;
          case "tue": groupName = "화"; break;
          case "wed": groupName = "수"; break;
          case "thu": groupName = "목"; break;
          case "fri": groupName = "금"; break;
          case "sat": groupName = "토"; break;
          case "sun": groupName = "일"; break;
          default: groupName = item.id;
        }
        return {
          x: groupName, // 컬럼
          y: item.value, // 사람 수
          count: humanCount === 0 ? 0 : Math.round((item.value / humanCount) * 100, 2) // 비율
        };
      });
  
    const maxYValue = Math.max(...formattedData.map(d => d.y)) + 10;
    setMaxY(maxYValue);
    setResult([{ id: "Weekly Data", data: formattedData }]);
  }, [weekData, humanCount]);

  return (
    <div className="h-[300px]">
      <ResponsiveLine
        data={result} // 차트에 표시할 데이터
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }} // 차트의 여백 설정
        xScale={{ type: 'point' }} // x 축을 point 타입으로 설정
        yScale={{
          type: 'linear', // y 축을 선형 스케일로 설정
          min: 0, // y 축 최소값
          max: maxY, // y 축 최대값 자동 설정
          stacked: false, // 데이터 누적 설정 해제
          reverse: false // y 축 반전 해제
        }}
        axisTop={null} // 상단 축 숨김
        axisRight={null} // 오른쪽 축 숨김
        axisBottom={{
          tickSize: 5, // x 축 눈금 크기
          tickPadding: 5, // x 축 눈금과 텍스트 간격
          tickRotation: 0, // x 축 눈금 텍스트 회전
          legend: 'Day', // x 축 설명 텍스트
          legendOffset: 36, // 설명 텍스트 위치 조정
          legendPosition: 'middle' // 설명 텍스트 위치
        }}
        axisLeft={{
          tickSize: 2, // y 축 눈금 크기
          tickPadding: 5, // y 축 눈금과 텍스트 간격
          tickRotation: 0, // y 축 눈금 텍스트 회전
          legend: '사람 수', // y 축 설명 텍스트
          legendOffset: -40, // 설명 텍스트 위치 조정
          legendPosition: 'middle' // 설명 텍스트 위치
        }}
        pointSize={10} // 데이터 포인트 크기
        pointColor={{ theme: 'background' }} // 데이터 포인트 색상
        pointBorderWidth={2} // 데이터 포인트 테두리 너비
        pointBorderColor={{ from: 'serieColor' }} // 데이터 포인트 테두리 색상
        pointLabel="y" // 데이터 포인트 라벨로 y 값 표시
        pointLabelYOffset={-12} // 포인트 라벨 y 축 오프셋
        enableCrosshair={true} // 크로스헤어 활성화
        useMesh={true} // 메쉬 활성화 (마우스 이동 시 데이터 포인트 쉽게 탐색)
        colors={['#FB9A99']}
      />
    </div>
  );
}
