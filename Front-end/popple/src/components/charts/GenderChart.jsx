import { ResponsivePie, ResponsivePieCanvas } from "@nivo/pie";
import { useEffect } from "react";

export default function GenderChart({ pieChartData }) {


  return (
    <div className="flex items-center mx-auto w-full h-[90%]">
      <ResponsivePie
        data={pieChartData} // 파이 차트에 표시할 데이터
        margin={{ top: 10, right: 0, bottom: 35, left: 0 }} // 차트의 여백 설정
        innerRadius={0.5} // 내부 반경 (0에서 1 사이의 비율), 값이 클수록 중심이 비어있는 원의 비율이 커짐
        padAngle={2} // 파이 조각 간의 간격 설정 (도 단위)
        cornerRadius={3} // 파이 조각의 모서리를 둥글게 만들기 위한 반경
        colors={{ scheme: 'category10' }}
        startAngle={-180}
        activeInnerRadiusOffset={7}
        activeOuterRadiusOffset={8} // 활성화된 파이 조각의 외부 반경 오프셋 (hover 시 확대 효과)
        borderWidth={1} // 파이 조각의 테두리 두께
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }} // 파이 조각의 테두리 색상 설정 (기본 색상보다 어둡게 설정)
        arcLinkLabelsSkipAngle={10} // 각 링크 레이블을 생략할 각도 (10도 이하의 각도는 생략)
        enableArcLinkLabels={false}
        arcLinkLabelsTextColor="#333333" // 링크 레이블의 텍스트 색상
        arcLinkLabelsThickness={2} // 링크 레이블의 두께
        arcLinkLabelsColor={{ from: 'color' }} // 링크 레이블의 색상 설정 (각 조각의 색상 사용)
        arcLabelsSkipAngle={10} // 각 조각의 레이블을 생략할 각도 (10도 이하의 각도는 생략)
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }} // 각 조각 레이블의 텍스트 색상 (각 조각 색상보다 어둡게 설정)
        id="id" // 데이터에서 사용할 고유 식별자 (이름은 주로 데이터 키와 일치해야 함)
        tooltip={point => { // 툴팁 설정
            return (
                <div className="bg-white p-1 rounded-lg shadow-md text-black">
                    {point.datum.label === "male" ? "남성" : "여성"} ({point.datum.value}명)
                </div>
            )
        }}
        legends={[ // 범례 설정
            {
                anchor: 'bottom', // 범례의 위치 (아래쪽)
                direction: 'row', // 범례 항목의 방향 (가로로 나열)
                justify: false, // 항목을 정렬할지 여부
                translateX: 25, // 범례의 X축 위치 조정
                translateY: 30, // 범례의 Y축 위치 조정
                itemsSpacing: -30, // 범례 항목 간의 간격
                itemWidth: 100, // 범례 항목의 너비
                itemHeight: 18, // 범례 항목의 높이
                itemTextColor: '#999', // 범례 항목 텍스트 색상
                itemDirection: 'left-to-right', // 항목의 방향 (왼쪽에서 오른쪽)
                itemOpacity: 1, // 항목의 불투명도
                symbolSize: 18, // 범례 기호의 크기
                symbolShape: 'circle', // 범례 기호의 모양 (여기서는 원형)
                effects: [ // 마우스 오버 효과 설정
                    {
                        on: 'hover', // hover 시 효과 적용
                        style: {
                            itemTextColor: '#000' // hover 시 텍스트 색상 변경
                        }
                    }
                ]
            }
        ]}
      />
    </div>
  );
}