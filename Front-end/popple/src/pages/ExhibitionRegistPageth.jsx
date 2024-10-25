import { useEffect, useState } from "react";
import ExhibitionHeader from "../components/exhibition/ExhibitionHeader";
import ExStep1 from "../components/exhibition/ExStep1";
import ExStep2 from "../components/exhibition/ExStep2";
import { useNavigate } from "react-router-dom";
import EventRegister from "./EventRegister";
import { ExhibitionAPI } from "../api/services/Exhibition";

export default function ExhibitionRegistPageth() {
  const [step, setStep] = useState(1);
  

  
  //등록 api
  const handleSubmit = async (data) => {
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

  const [information, setInformation] = useState({
    title: "", // 팝업/전시명
    subtitle: "", // 부제
    fee: "", // 입장료
    startDate: "", // 팝업 전시 기간 (시작일)
    endDate: "", // 팝업 전시 기간 (종료일)
    description: "", // 상세 설명
    descriptionImg: "", // 상세 설명 포스터 이미지
    roadAddr: "", // 도로명 주소
    detailAddr: "", // 상세 주소
    homepageLink: "", // 홈페이지 링크
    instagramLink: "", // 인스타그램 링크
    notice: "", // 공지사항
    images: [], // 이미지
    openTime: {
      mon: { open: "", close: "", holiday: false },
      tue: { open: "", close: "", holiday: false },
      wed: { open: "", close: "", holiday: false },
      thu: { open: "", close: "", holiday: false },
      fri: { open: "", close: "", holiday: false },
      sat: { open: "", close: "", holiday: false },
      sun: { open: "", close: "", holiday: false },
    },
    constraints: {
      parking: false, // 주차 가능 여부
      wifi: false, // 와이파이 가능 여부
      camera: false, // 촬영 가능 여부
      pet: false, // 반려동물 가능 여부
      kids: false, // 유아동반 가능 여부
      adult: false, // 미성년자 가능 여부
      food: false, // 음식물 반입 가능 여부
    },
    company: {
      name: "", // 기업명
      businessNumber: "", // 사업자 등록번호
      contact: "", // 기업 전화번호
      address: "", // 기업 주소
      condition: "", // 유효 기간/이용 조건
    },
  });

  const changeInformation = (e) => {
    const { name, type } = e.target;
    let { value } = e.target;
    const keys = name.split(".");
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
      setInformation({
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

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/event-regist");
  };
  return (
    <>
      <ExhibitionHeader step={step} />
      {/* 맨 위 박스  */}
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
                onClick={handleNavigate}
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
    </>
  );
}
