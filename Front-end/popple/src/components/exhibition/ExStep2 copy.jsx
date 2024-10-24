import { useState } from "react";

const ExStep2 = ({information, changeInformation}) => {
    const inputStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg inline-block p-2.5 ml-10";

    return (
        <>
            <label>주최/기획
                <input name="company.name" className={inputStyle} value={information.company.name} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>사업자 등록번호
                <input name="company.businessNumber" className={inputStyle} value={information.company.businessNumber} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>기업 전화번호
                <input name="company.contact" className={inputStyle} value={information.company.contact} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>기업 주소
                <input name="company.address" className={inputStyle} value={information.company.address} onChange={(e) => changeInformation(e)}/>
            </label>
            <label>유효 기간/이용 조건
                <input name="company.condition" className={inputStyle} value={information.company.condition} onChange={(e) => changeInformation(e)}/>
            </label>
        </>
    );
}
 
export default ExStep2;