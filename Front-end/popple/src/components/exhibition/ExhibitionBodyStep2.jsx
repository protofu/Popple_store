import { useState } from "react";

export default function ExhibitionBodyStep2({ allOfPopUpData, setAllOfPopUpData }) {
  const [title, setTitle] = useState([
    {
      id: 1,
      name: "주최/기획",
    },
    {
      id: 2,
      name: "주소",
    },
    {
      id: 3,
      name: "사업자 등록번호",
    },
    {
      id: 4,
      name: "이용조건(안 할 수도)",
    },
    {
      id: 5,
      name: "연락처",
    },
  ]);
  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        {title.map((t) => {
          return (
            <>
              <div>
                <label className="text-sm" htmlFor="1">
                  {t.name}
                  <span className="text-red-500">*</span>
                </label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-5/6 p-2.5" />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
