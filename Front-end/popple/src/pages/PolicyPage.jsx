import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PolicyPage() {
  const [allCheck, setAllCheck] = useState(false);
  const [popple, setPopple] = useState(false);
  const [location, setLocation] = useState(false);
  const [info, setInfo] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [m1, setM1] = useState(false);
  const [m2, setM2] = useState(false);
  const [m3, setM3] = useState(false);

  const navigate = useNavigate(); 

  const handleAgree = () => {
    setLocation(true);
    setInfo(true);
    setMarketing(true);
    setPopple(true);
    setM1(true);
    setM2(true);
    setM3(true);
  };

  const handleAllCheck = () => {
    const newCheck = !allCheck;
    setAllCheck(newCheck);
    setPopple(newCheck);
    setLocation(newCheck);
    setInfo(newCheck);
    setMarketing(newCheck);
  };

  // 각 개별 체크박스의 상태를 관리하는 함수
  const handleIndividualCheck = (setter, currentState) => {
    const newState = !currentState;
    setter(newState);

    // 전체 동의 상태 업데이트
    const allChecked =
      popple && location && info && marketing && newState && m1 && m2 && m3;
    setAllCheck(allChecked);
  };

  // 예시: 개별 체크박스에 대한 핸들러
  const handlePoppleCheck = () => handleIndividualCheck(setPopple, popple);
  const handleLocationCheck = () =>
    handleIndividualCheck(setLocation, location);
  const handleInfoCheck = () => handleIndividualCheck(setInfo, info);
  const handleMarketingCheck = () =>
    handleIndividualCheck(setMarketing, marketing);


  useEffect(() => {
    const allChecked = popple && location && info && marketing;
    console.log("전체 체크",allChecked)
    if (allCheck === true) {
      setAllCheck(allChecked);
    } else {
      setAllCheck(allChecked);
    }
  }, [popple, location, info, marketing]);


  const policyField = [
    {
      id: 1,
      text: "전체 동의",
      textSize: "text-2xl",
      check: handleAllCheck,
      state: allCheck,
      agree: handleAgree,
    },
    {
      id: 2,
      text: "[필수]POPPLE 이용약관",
      textSize: "text-lg",
      check: () => handlePoppleCheck(!popple),
      state: popple,
    },
    {
      id: 3,
      text: "[선택]위치기반 서비스 이용약관",
      textSize: "text-lg",
      check: () => handleLocationCheck(!location),
      state: location,
    },
    {
      id: 4,
      text: "[선택]개인정보 수집이용동의",
      textSize: "text-lg",
      check: () => handleInfoCheck(!info),
      state: info,
    },
    {
      id: 5,
      text: "[선택]마케팅 정보 수신 동의",
      textSize: "text-lg",
      check: () => handleMarketingCheck(!marketing),
      state: marketing,
    },
  ];

  const subPolicy = [
    {
      id: 6,
      text: "PUSH알림",
      textSize: "text-xm",
      check: () => setM1(!m1),
      state: m1,
    },
    {
      id: 7,
      text: "SMS",
      textSize: "text-xm",
      check: () => setM2(!m2),
      state: m2,
    },
    {
      id: 8,
      text: "이메일",
      textSize: "text-xm",
      check: () => setM3(!m3),
      state: m3,
    },
  ];

 

  return (
    <>
      <div className="flex-col w-2/5 h-full mx-auto justify-center mt-32">
        <div className="font-bold text-2xl">약관 동의</div>
        <form className="mt-10">
          {policyField.map((p) => {
            return (
              <div key={p.id}>
                {p.id === 5 ? (
                  <div className="mb-3">
                    <input
                      type="checkbox"
                      id="5"
                      checked={marketing}
                      onChange={p.check}
                    />
                    <label htmlFor="5" className={`font-bold mt-10 ml-3 ${p.textSize}`}>
                      {p.text}
                    </label>
                    <div className="ml-5 mt-1">
                      {subPolicy.map((s) => {
                        return (
                          <div key={s.id}>
                            <input
                              type="checkbox"
                              id={p.id}
                              checked={p.state}
                              onChange={p.check}
                            />
                            <label
                              htmlFor={s.id}
                              className={`${s.textSize} mt-10 ml-2 mr-3 `}
                            >
                              {s.text}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 mb-3">
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
                    <hr className="w-full mt-3" />
                  </div>
                )}
              </div>
            );
          })}

          <hr className="w-full" />
          <div className="flex justify-center items-center">
            {popple === true ? (
              <div>
                <button className="w-40 bg-popple text-white h-10 border mt-20 rounded-lg" onClick={()=>navigate('/sign-up')} >
                  약관 동의
                </button>
              </div>
            ) : (
              <div>
                <div className="flex w-40 bg-gray-200 h-10 border mt-20 rounded-lg justify-center items-center">
                  약관 동의
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
