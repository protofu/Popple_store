import { useEffect, useState } from "react";
import { companyAuthAPI } from "../../api/services/CompanyAuth";
import axios from "axios";

const ExStep2 = ({information, changeInformation}) => {
    // input 태그 스타일 지정
    const inputStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg inline-block p-2.5 mb-10";

    const [companyInfo, setCompanyInfo] = useState({});

    // 로그인한 기업 회원으로부터 정보 가져오기
    const getCompanyInfo = async(data) => {
        try {
            const res = await companyAuthAPI.getInfo(data);
            if (res.status === 200) {
                const {name,buisinessNumber, tel,address } = res.data;
                setCompanyInfo({ 
                    name: name,
                    businessNumber : buisinessNumber,
                    contact : tel,
                    companyAddress : address
                });
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        getCompanyInfo();       
    }, []);

    return (
        <>
            {
                companyInfo &&
                <div className="grid grid-cols-2 gap-x-32 w-full h-full">
                    <div className="flex flex-col">
                        <label>주최/기획</label>
                        <input name="name" className={inputStyle} value={companyInfo.name} readOnly />
                    </div>
                    <div className="flex flex-col">
                        <label>사업자 등록번호</label>
                        <input name="businessNumber" className={inputStyle} value={companyInfo.businessNumber} readOnly />
                    </div>
                    <div className="flex flex-col">
                        <label>기업 전화번호</label>
                        <input name="contact" className={inputStyle} value={companyInfo.contact} readOnly/>
                    </div>
                    <div className="flex flex-col">
                        <label>기업 주소</label>
                        <input name="companyAddress" className={inputStyle} value={companyInfo.companyAddress} readOnly />
                    </div>
                    <div className="flex flex-col">
                        <label>유효 기간/이용 조건</label>
                        <input name="terms" className={inputStyle} value={information.terms} onChange={(e) => changeInformation(e)} />
                    </div>
                </div>
            }
        </>
    );
}
 
export default ExStep2;