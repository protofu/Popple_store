import { useEffect, useState } from "react";

export default function PolicyPage() {

  const [allCheck, setAllCheck] = useState(false);
  const [popple, setPopple] = useState(false);
  const [location, setLocation] = useState(false);
  const [info, setInfo] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [m1, setM1] = useState(false);
  const [m2, setM2] = useState(false);
  const [m3, setM3] = useState(false);

  const [subPolicy, setSubPolicy] = useState([
    {
      id: 6,
      text: "PUSH알림",
      textSize: "text-xm",
      check:() => setM1(!m1),
      state: m1
    },
    {
      id: 7,
      text: "SMS",
      textSize: "text-xm",
      check:() => setM2(!m2),
      state: m2
    },
    {
      id: 8,
      text: "이메일",
      textSize: "text-xm",
      check:() => setM3(!m3),
      state: m3
    },
  ]);

  

  const handleAllCheck = () => {
    const newCheck = !allCheck;
    setAllCheck(newCheck);
    setPopple(newCheck);
    setLocation(newCheck);
    setInfo(newCheck);
    setMarketing(newCheck);
  };

  const policyField = [
    {
      id: 1,
      text: "전체 동의",
      textSize: "text-2xl",
      check: handleAllCheck,
      state: allCheck,
    },
    {
      id: 2,
      text: "[필수]POPPLE 이용약관",
      textSize: "text-lg",
      check: () => setPopple(!popple),
      state: popple,
    },
    {
      id: 3,
      text: "[선택]위치기반 서비스 이용약관",
      textSize: "text-lg",
      check: () => setLocation(!location),
      state: location,
    },
    {
      id: 4,
      text: "[선택]개인정보 수집이용동의",
      textSize: "text-lg",
      check: () => setInfo(!info),
      state: info,
    },
    {
      id: 5,
      text: "[선택]마케팅 정보 수신 동의",
      textSize: "text-lg",
      check: () => setMarketing(!marketing),
      state: marketing,
    },
  ];

  console.log("팝플", popple)


  return (
    <>
      <div className="flex-col w-2/5 h-full mx-auto justify-center mt-32">
        <div className="font-bold text-2xl">약관 동의</div>
        <form className="mt-10">
          {policyField.map((p) => {
            return (
              <div key={p.id}>
                {p.id === 5 ? (
                  <div>
                    <input
                      type="checkbox"
                      id="5"
                      checked={marketing}
                      onChange={p.check}
                    />
                    <label htmlFor="5" className={`mt-10 ml-3 ${p.text}`}>
                      [선택] 마케팅 정보 수신 동의
                    </label>
                    <div className="ml-5">
                      {subPolicy.map((s) => {
                        return (
                          <div key={s.id}>
                            <input type="checkbox"
                              onClick={p.check}
                              id={p.id}
                              checked={p.state}
                              onChange={p.check}
                            />
                            <label
                              htmlFor={s.id}
                              className={`${s.textSize} mt-10 ml-2 mr-3`}
                            >
                              {s.text}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      onClick={p.check}
                      id={p.id}
                      checked={p.state}
                      onChange={p.check}
                    />
                    <label
                      htmlFor={p.id}
                      className={`font-bold mt-10 ml-3 ${p.textSize}`}
                    >
                      {p.text}
                    </label>
                    <hr className="w-full" />
                  </>
                )}
              </div>
            );
          })}

          <hr className="w-full" />
          <div className="flex justify-center items-center">
              {
                popple === true ? 
                (
                <div>
                  <button className="w-40 bg-popple text-white h-10 border mt-20 rounded-lg">약관 동의</button>
                </div>
                ) :
                (
                <div>
                  <button className="w-40 bg-gray-200 h-10 border mt-20 rounded-lg">약관 동의</button>
                </div>
              )
              }
          </div>
        </form>
      </div>
    </>
  );
}
