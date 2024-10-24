import { useState } from "react";

const ExStep1 = ({information, changeInformation}) => {
    const [week, setWeek] = useState("mon");
    
    const inputStyle = "w-[280px] h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";

    return (
        <>
            <label>팝업 전시명
                <input name="title" className={inputStyle} value={information.title} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>부제
                <input name="subtitle" className={inputStyle} value={information.subtitle} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>입장료
                <input name="fee" className={inputStyle} value={information.fee} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>팝업 전시 기간
                <input type="date" name="startDate" className={inputStyle} value={information.startDate} onChange={(e) => changeInformation(e)}/>
                <input type="date" name="endDate" className={inputStyle} value={information.endDate} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>상세 설명
                <input name="description" className={inputStyle} value={information.description} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>주소
                <input name="roadAddr" className={inputStyle} value={information.roadAddr} onChange={(e) => changeInformation(e)}/>
                <input name="detailAddr" className={inputStyle} value={information.detailAddr} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>홈페이지 링크
                <input name="homepageLink" className={inputStyle} value={information.homepageLink} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>인스타그램 링크
                <input name="instagramLink" className={inputStyle} value={information.instagramLink} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>공지사항
                <input name="notice" className={inputStyle} value={information.notice} onChange={(e) => changeInformation(e)}/>
            </label>

            <button onClick={() => setWeek('mon')}>월</button>
            <button onClick={() => setWeek('tue')}>화</button>
            <button onClick={() => setWeek('wed')}>수</button>
            <button onClick={() => setWeek('thu')}>목</button>
            <button onClick={() => setWeek('fri')}>금</button>
            <button onClick={() => setWeek('sat')}>토</button>
            <button onClick={() => setWeek('sun')}>일</button>
            
            <label>영업 시간
                <input type="time" name={`openTime.${week}.open`} className={inputStyle} value={information.openTime[week].open} onChange={(e) => changeInformation(e)}/>
                <input type="time" name={`openTime.${week}.close`} className={inputStyle} value={information.openTime[week].close} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>휴무일
                <input name={`openTime.${week}.holiday`} type="checkbox" className="ml-10" onChange={(e) => changeInformation(e)}/>
            </label>

            <div>
                {JSON.stringify(information.openTime.mon)}
            </div>
            <div>
                {JSON.stringify(information.openTime.tue)}
            </div>
            <div>
                {JSON.stringify(information.openTime.wed)}
            </div>
            <div>
                {JSON.stringify(information.openTime.thu)}
            </div>
            <div>
                {JSON.stringify(information.openTime.fri)}
            </div>
            <div>
                {JSON.stringify(information.openTime.sat)}
            </div>
            <div>
                {JSON.stringify(information.openTime.sun)}
            </div>
        </>
    );
}
 
export default ExStep1;