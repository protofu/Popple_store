import { useNavigate } from "react-router-dom";
import Complete from "../common/Complete";

export default function ExStepComplete({ information }) {
    return (
        <div className="mt-10 h-full">
            
            <Complete path={`/event-regist?id=${information.exhiId}`} title={"등록 완료"} text={"이벤트 등록"} description={`${information.typeId === 1?"팝업이":"전시가"} 정상적으로 등록되었습니다.`} caution={`이벤트 등록을 하지 않으실 경우 마이페이지 - 나의 팝업 목록에서 등록이 가능합니다.`} />
        </div>
    );
}
