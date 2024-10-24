import { useState } from "react";

const ExStep2 = ({ information, changeInformation }) => {
  const inputStyle =
    "w-full h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 block focus:outline-none px-2";
  const smallStyle =
    "w-2/5 h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  return (
    <>
      <div className="grid grid-cols-2 gap-x-20 gap-y-10">
        <label className="text-sm">
          주최/기획<span className="text-red-500">*</span>
          <input
            name="company.name"
            className={inputStyle}
            readOnly
            value={information.company.name}
            onChange={(e) => changeInformation(e)}
          />
        </label>
        <label className="text-sm">
          사업자 등록번호<span className="text-red-500">*</span>
          <input
            name="company.businessNumber"
            className={inputStyle}
            readOnly
            value={information.company.businessNumber}
            onChange={(e) => changeInformation(e)}
          />
        </label>
        <label className="text-sm">
          기업 전화번호<span className="text-red-500">*</span>
          <input
            name="company.contact"
            className={inputStyle}
            readOnly
            value={information.company.contact}
            onChange={(e) => changeInformation(e)}
          />
        </label>
        <label className="text-sm">
          기업 주소<span className="text-red-500">*</span>
          <input
            name="company.address"
            className={inputStyle}
            readOnly
            value={information.company.address}
            onChange={(e) => changeInformation(e)}
          />
        </label>
        <label className="text-sm">
          유효 기간/이용 조건
          <input
            name="company.condition"
            className={inputStyle}
            readOnly
            value={information.company.condition}
            onChange={(e) => changeInformation(e)}
          />
        </label>
      </div>
    </>
  );
};

export default ExStep2;
