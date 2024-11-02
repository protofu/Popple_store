import { useEffect, useState } from "react";
import ExhibitionHeader from "../components/exhibition/ExhibitionHeader";
import ExStep1 from "../components/exhibition/ExStep1";
import ExStep2 from "../components/exhibition/ExStep2";
import { exhibitionAPI } from "../api/services/Exhibition";
import ExStep3 from "../components/exhibition/ExStep3";
import ExStepComplete from "../components/exhibition/ExStepComplete";
import { poppleAlert } from "../utils/PoppleAlert";

export default function ExhibitionRegistPage() {
  const [step, setStep] = useState(1);
  const [information, setInformation] = useState({
      typeId: 1,
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
      reserve: false,
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
          park: true, // 주차 가능 여부
          wifi: true, // 와이파이 가능 여부
          camera: true, // 촬영 가능 여부
          pet: true, // 반려동물 가능 여부
          kids: true, // 유아동반 가능 여부
          grade: true, // 미성년자 가능 여부
          food: true, // 음식물 반입 가능 여부
      }
  });
  // 생성된 전시/팝업의 아이디 값
  const [exhiId, setExhiId] = useState(null);
  const changeInformation = (e) => {
      const { name, type } = e.target;
      let { value } = e.target;
      const keys = name.split(".");

      if (name === "endAt" || name === "startAt") {
        const startAt = new Date(information.startAt);
        const endAt = new Date(name === "endAt" ? value : information.endAt);

        if (endAt < startAt) {
            poppleAlert.alert("","종료일은 시작일보다 빠를 수 없습니다.");
            return ;
        }
    }
   
      if (name === "fee") {
          if (isNaN(value.replaceAll(",", ""))) {
              poppleAlert.alert("", "숫자만 입력 가능합니다.");
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

  // 팝업/전시 등록 완료 -> 메인으로 갈꺼냐, 이벤트 등록을 할거냐?


  // 팝업/전시 등록 버튼 클릭 시 동작
  const registerExhibition = async () => {
    try {
      // FormData 생성
      const formData = new FormData();
      // ExhibitionRequest 필드에 맞게 데이터 추가
      formData.append("typeId", information.typeId);
      formData.append("exhibitionName", information.exhibitionName);
      formData.append("subTitle", information.subTitle);
      formData.append("detailDescription", information.detailDescription);
      formData.append("address", information.address + " " + information.detailAddress);
      formData.append("notice", information.notice);
      formData.append("terms", information.terms);
      formData.append("homepageLink", information.homepageLink);
      formData.append("instagramLink", "https://www.instagram.com/" + information.instagramLink.substring(1));
      formData.append("free", information.free);
      formData.append("park", information.constraints.park);
      formData.append("wifi", information.constraints.wifi);
      formData.append("camera", information.constraints.camera);
      formData.append("pet", information.constraints.pet);
      formData.append("kids", information.constraints.kids);
      formData.append("food", information.constraints.food);
      formData.append("fee", information.fee || 0);
      formData.append("reserve", information.reserve);

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
      const res = await exhibitionAPI.regist(formData);
          
      if (res.status === 201) {
        setExhiId(res.data.id);
        setInformation({});
        setStep(prev => prev + 1);
        poppleAlert.alert("등록 성공")
      }
    } catch (error) {
      poppleAlert.alert("등록 실패")
      console.error(error)
    }
  };
  console.log(information)
  const goToNext = () => {
    // 만약에 필수값이 모두 입력되었으면
    const { exhibitionName, subTitle, startAt, endAt, poster, image, address } = information
    const requiredValueCheck = exhibitionName && subTitle && startAt && endAt && poster && image && address;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = information.openTime;
    const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
    const requiredDateCheck = days.every(day => (day.open && day.close) || day.holiday === true);
    if (requiredValueCheck && requiredDateCheck) {
      setStep((step) => step + 1);
    } else {
      poppleAlert.alert("", "필수값을 모두 입력해주세요.");
    }
  }

  return (
    <>
      <ExhibitionHeader step={step} />
      {/* 맨 위 박스  */}
      <div className="flex justify-center">
        <div className="flex flex-col gap-5 mt-16 w-5/6 h-full">
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
          {step === 3 && (
            <ExStep3
                information={information}
            />
          )}
          {step === 4 && (
            <ExStepComplete information={information}/>
          )}

          {/* <pre className="bg-gray-100 p-4 rounded-lg">
            {JSON.stringify(information, null, 2)}
          </pre> */}

          {/* 하단 단계별 이전, 다음 버튼 */}
          <div>
            <hr className="w-full mt-10" />
            {step === 1 ? (
              // 1단계 하단
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="border rounded-lg p-3 mt-10"
                  onClick={() => goToNext()}
                >
                  다음
                </button>
            </div>
            ) : step === 2 ? (
              // 2단계 하단
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
                  onClick={ registerExhibition }
                >
                  등록
                </button>
              </div>
            ):(
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
