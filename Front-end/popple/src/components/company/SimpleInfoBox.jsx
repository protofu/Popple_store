export default function SimpleInfoBox({ info }) {

    // 날짜 포멧 변경 함수
    function dateToString(arr, arr2) {
      const [y,m,d] = arr;
      const [y2, m2, d2] = arr2
      return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')} ~ ${y2}-${String(m2).padStart(2, '0')}-${String(d2).padStart(2, '0')}`;
    }

  function getStatus(start, end) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간을 00:00:00으로 설정
  
    const startAt = new Date(start[0], start[1] - 1, start[2]);
    startAt.setHours(0, 0, 0, 0); // 시작 날짜의 시간을 00:00:00으로 설정
  
    const endAt = new Date(end[0], end[1] - 1, end[2]);
    endAt.setHours(23, 59, 59, 999); // 종료 날짜의 시간을 23:59:59로 설정
  
    if (today < startAt) {
      // 오픈 전 상태
      const diffDays = Math.ceil((startAt - today) / (1000 * 60 * 60 * 24)); // 남은 날짜 계산
      return {
        value: `오픈 D-DAY ${diffDays}`,
        color: "text-red-500 font-bold",
      };
    } else if (today >= startAt && today <= endAt) {
      // 진행 중 상태
      return {
        value: "진행중",
        color: "text-green-600 font-bold",
      };
    } else {
      // 종료된 상태
      return {
        value: "종료",
        color: "text-gray-400 font-bold",
      };
    }
  }

  function StatusDisplay({ startAt, endAt }) {
    const status = getStatus(startAt, endAt);
    return <div className={`${status.color} mx-auto`}>{status.value}</div>;
  }

  return (
    <div className="grid grid-cols-[1fr_0.5fr_1fr] border-2 w-full p-2 rounded-2xl">
      <div className="text-center font-bold">{info.exhibitionName}</div>
      <StatusDisplay startAt={info.startAt} endAt={info.endAt} />
      <div className="text-center">{dateToString(info.startAt, info.endAt)}</div>
    </div>
  );
};
