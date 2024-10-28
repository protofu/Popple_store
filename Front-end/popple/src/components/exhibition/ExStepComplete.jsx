import { useNavigate } from "react-router-dom";
import Complete from "../common/Complete";

export default function ExStepComplete({ exhibitionId }) {
    console.log(exhibitionId)
    const fakeExhibitionId = 8;
    const navigate = useNavigate();
    
    return (
        <div className="mt-10 h-full">
            <Complete text={"이벤트 등록"} onClose={navigate("/event-regist")}/>
        </div>
    );
}
