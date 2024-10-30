import { useNavigate } from "react-router-dom";
import Complete from "../common/Complete";

export default function ExStepComplete({ exhiId }) {
    return (
        <div className="mt-10 h-full">
            
            <Complete path={`/event-regist?id=${exhiId}`} text={"이벤트 등록"}/>
        </div>
    );
}
