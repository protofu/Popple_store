import { useEffect, useState } from "react";
import ExhibitionHeader from "../components/exhibition/ExhibitionHeader";
import ExStep1 from "../components/exhibition/ExStep1";
import ExStep2 from "../components/exhibition/ExStep2";
import axios from "axios";
import EventRegister from "./EventRegister";
import { exhibitionAPI } from "../api/services/Exhibition";
import { data } from "autoprefixer";

export default function ExhibitionRegistPage() {
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
      }
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
              [name]: value
          });
      } else if (keys.length === 2) {
          setInformation({
              ...information,
              [keys[0]]: {
                  ...information[keys[0]],
                  [keys[1]]: value
              }
          });
      } else if (keys.length === 3) {
          setInformation({
              ...information,
              [keys[0]]: {
                  ...information[keys[0]],
                  [keys[1]]: {
                      ...information[keys[0]][keys[1]],
                      [keys[2]]: value
                  }
              }
          });
      }
  }

  useEffect(() => {
      console.log(information);
  }, [information]);

  const registerExhibition = async () => {
    try {
      console.log(information);
      // FormData 생성
      const formData = new FormData();
      // ExhibitionRequest 필드에 맞게 데이터 추가
      formData.append("typeId", 2);
      formData.append("exhibitionName", information.exhibitionName);
      formData.append("subTitle", information.subTitle);
      formData.append("detailDescription", information.detailDescription);
      formData.append("address", information.address);
      formData.append("notice", information.notice);
      formData.append("terms", information.terms);
      formData.append("homepageLink", information.homepageLink);
      formData.append("instagramLink", information.instagramLink);
      formData.append("free", information.free);
      formData.append("park", information.constraints.park);
      formData.append("wifi", information.constraints.wifi);
      formData.append("camera", information.constraints.camera);
      formData.append("pet", information.constraints.pet);
      formData.append("kids", information.constraints.kids);
      formData.append("food", information.constraints.food);
      formData.append("fee", information.fee || 0);

      // 요일별 오픈 시간 추가
      formData.append("sunday", `${information.openTime.sunday.open}-${information.openTime.sunday.close}`);
      formData.append("monday", `${information.openTime.monday.open}-${information.openTime.monday.close}`);
      formData.append("tuesday", `${information.openTime.tuesday.open}-${information.openTime.tuesday.close}`);
      formData.append("wednesday", `${information.openTime.wednesday.open}-${information.openTime.wednesday.close}`);
      formData.append("thursday", `${information.openTime.thursday.open}-${information.openTime.thursday.close}`);
      formData.append("friday", `${information.openTime.friday.open}-${information.openTime.friday.close}`);
      formData.append("saturday", `${information.openTime.saturday.open}-${information.openTime.saturday.close}`);

      // 시작일과 종료일
      formData.append("startAt", information.startAt);
      formData.append("endAt", information.endAt);

      // 이미지 파일 추가
      information.image.forEach((img, index) => {
          formData.append(`image`, img);
      });

      // 포스터 파일 추가
      formData.append("poster", information.poster);

      // 서버로 전송
      const res = await axios.post('http://localhost:8080/api/exhibition/resist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
          
      if (res.status === 201) {
        console.log('생성 성공');
        setInformation({});
        setStep((prevStep) => prevStep + 1);
      } else {
          console.error('실패');
      }
    } catch (error) {
        console.error('Error occurred while submitting exhibition data:', error);
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
                  onClick={() => setStep((step) => step + 1)}
                >
                  다음
                </button>
              </div>
            ) :  (
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
                  onClick={registerExhibition}
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
