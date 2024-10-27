import { useEffect, useState } from "react";
import ExhibitionHeader from "../components/exhibition/ExhibitionHeader";
import ExStep1 from "../components/exhibition/ExStep1";
import ExStep2 from "../components/exhibition/ExStep2";
import EventRegister from "./EventRegister";
import { ExhibitionAPI } from "../api/services/Exhibition";
import { data } from "autoprefixer";

export default function ExStepv2() {
  const [step, setStep] = useState(1);
  const [information, setInformation] = useState({
    exhibitionName: "", // 팝업/전시명
    subTitle: "", // 부제
    free: false, // 무료 여부
    fee: "", // 입장료
    startAt: "", // 팝업 전시 기간 (시작일)
    endAt: "", // 팝업 전시 기간 (종료일)
    detailDescription: "", // 상세 설명
    poster: "", // 상세 설명 포스터 이미지
    address: "", // 도로명 주소
    detailAddress: "", // 상세 주소
    homepageLink: "", // 홈페이지 링크
    instagramLink: "", // 인스타그램 링크
    notice: "", // 공지사항
    image: [], // 이미지
    terms: "", // 유효 기간/이용 조건
    openTime: {
      monday: { open: "", close: "", holiday: false },
      tuesday: { open: "", close: "", holiday: false },
      wednesday: { open: "", close: "", holiday: false },
      thursday: { open: "", close: "", holiday: false },
      friday: { open: "", close: "", holiday: false },
      saturday: { open: "", close: "", holiday: false },
      sunday: { open: "", close: "", holiday: false },
    },
    constraints: {
      park: false, // 주차 가능 여부
      wifi: false, // 와이파이 가능 여부
      camera: false, // 촬영 가능 여부
      pet: false, // 반려동물 가능 여부
      kids: false, // 유아동반 가능 여부
      grade: false, // 미성년자 가능 여부
      food: false, // 음식물 반입 가능 여부
    },
  });
 
  const changeInformation = (e) => {
    const { name, type } = e.target;
    let { value } = e.target;
    const keys = name.split(".");
    if (name.includes("open") || name.includes("close")) {
    }
    if (name === "fee") {
      if (isNaN(value.replaceAll(",", ""))) {
        alert("숫자만 입력 가능합니다.");
        return;
      }
      value = Number(value.replaceAll(",", "")).toLocaleString();
    }
    if (type === "checkbox") {
      value = e.target.checked;
    }
    if (keys.length === 1) {
      setInformation({
        ...information,
        [name]: value,
      });
    } else if (keys.length === 2) {
      set
      ({
        ...information,
        [keys[0]]: {
          ...information[keys[0]],
          [keys[1]]: value,
        },
      });
    } else if (keys.length === 3) {
      setInformation({
        ...information,
        [keys[0]]: {
          ...information[keys[0]],
          [keys[1]]: {
            ...information[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        },
      });
    }
  };
 
  useEffect(() => {
    console.log(information);
  }, [information]);

  const registerExhibition = () => {
    console.log(information);
    // information data를 형식에 맞게 formData로 변환해서 요청 보내야됨. (multipart/formData);
    // axios.post('/api/exhibition', information)
    //     .then((res) => {
    //         console.log(res);
    //         if(res.status === 201) {
    //             alert("이벤트 등록이 완료되었습니다.");
    //             setStep((prevStep) => prevStep + 1);
    //         })
    //     .catch((err) => {
    //         console.error(err);
    //     });
  };

  // const handleNavigate = () => {
  //   navigate('/event-regist');
  // }
  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    console.log("데이터", data);

    const formData = new FormData();
    formData.append("userId", data.userId);
    if (data.image || data.poster) {
      formData.append("image", data.image);
      formData.append("poster", data.poster);
    }
    try {
      const res = await ExhibitionAPI.regist(formData);
      if (res.status === 201) {
        alert("등록 성공");
      }
    } catch (error) {
      alert("등록 실패");
      console.log(error.message);
    }
  };
  return (
    <>
      <ExhibitionHeader step={step} />
      {/* 맨 위 박스  */}
      <div>
        <div className="flex flex-col w-5/6 mx-auto gap-5 mt-16">
          {step === 1 && (
            <ExStep1
              information={information}
              changeInformation={changeInformation}
            />
          )}
          {step === 2 && (
            <ExStep2
              information={information}
              changeInformation={changeInformation}
            />
          )}
          {step === 3 && <div>Step 3</div>}
          {step === 4 && (
            <EventRegister
              information={information}
              changeInformation={changeInformation}
            />
          )}

          <pre className="bg-gray-100 p-4 rounded-lg">
            {JSON.stringify(information, null, 2)}
          </pre>

          {/* 하단 단계별 이전, 다음 버튼 */}
          <div>
            <hr className="w-full mt-10" />
            {step === 1 ? (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="border rounded-lg p-3 mt-10"
                  onClick={() => setStep((step) => step + 1)}
                >
                  다음
                </button>
              </div>
            ) : step === 2 ? (
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="border rounded-lg p-3 mt-10"
                  onClick={() => setStep((step) => step - 1)}
                >
                  이전
                </button>
                <button
                  type="submit"
                  className="border rounded-lg p-3 mt-10"
                  onClick={() => setStep((step) => step + 2)}
                >
                  이벤트 등록
                </button>
                <button
                  type="submit"
                  className="border rounded-lg p-3 mt-10"
                  onClick={() => setStep((step) => step + 2)}
                >
                  다음
                </button>
              </div>
            ) : step === 3 ? (
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="border rounded-lg p-3 mt-10"
                  onClick={() => setStep((step) => step - 1)}
                >
                  이전
                </button>
                <button
                  type="submit"
                  className="border rounded-lg p-3 mt-10"
                  onClick={handleSubmit}
                >
                  등록
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="border rounded-lg p-3 mt-10"
                  onClick={() => setStep((step) => step - 2)}
                >
                  이전
                </button>
                <button
                  type="submit"
                  className="border rounded-lg p-3 mt-10"
                  onClick={() => setStep((step) => step - 1)}
                >
                  등록
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}