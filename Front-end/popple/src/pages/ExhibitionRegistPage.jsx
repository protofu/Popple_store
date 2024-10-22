import { useState } from "react";

import {
  LuParkingCircle,
  LuParkingCircleOff,
  LuCamera,
  LuCameraOff,
} from "react-icons/lu";
import { MdFastfood, MdNoFood, MdAttachMoney } from "react-icons/md";
import { CiWifiOn, CiWifiOff } from "react-icons/ci";
import PostCode from "../components/common/PostCode";
import { FaDog, FaUserSlash, FaUser, FaArrowDown19, FaArrowUp19 } from "react-icons/fa6";
import { data } from "autoprefixer";
import Markdown from "../components/common/Markdown";

export default function ExhibitionRegistPage() {
  const [address, setAddress] = useState({});

  //공지사항 마크다운
  const [notice, setNotice] = useState("");
  const handleNotice = (value) => {
    setNotice(value);
  };

  //상세설명 마크다운
  const [detailDescription, setDetailDescription] = useState("");
  const handleDescription = (value) => {
    setDetailDescription(value);
  };

  //휴무 지정 체크박스
  const [holiday, setHoliday] = useState(false);
  const handleHoliday = () => {
    setHoliday(!holiday);
  };

  //금지 토글 상태 관리
  const [kids, setKids] = useState(false);
  const handleKids = () => {
    setKids(!kids);
  };


  //제한사항 토글
  const [pet, setPet] = useState(false);
  const handlePet = () => {
    setPet(!pet);
  };

  const [adult, setAdult] = useState(false);
  const handleAdult = () => {
    setAdult(!adult);
  };

  const [fee, setFee] = useState(false);
  const handleFee = () => {
    setFee(!fee);
  };

  const [parking, setParking] = useState(false);
  const handleParking = () => {
    setParking(!parking);
  };

  const [food, setFood] = useState(false);
  const handleFood = () => {
    setFood(!food);
  };

  const [wifi, setWifi] = useState(false);
  const handleWifi = () => {
    setWifi(!wifi);
  };

  const [camera, setCamera] = useState(false);
  const handleCamera = () => {
    setCamera(!camera);
  };

  //청소년 관람 불가 누르면 어린이도 금지되는 버튼
  const adultCheck = () => {
    const newCheck = !adult;
    setAdult(newCheck);
    setKids(newCheck);
  }
  const [twoCheck, setTwoCheck] = useState(false);
  const handleTwoCheck = () => {

    const adult2 = adult && kids; 
    setTwoCheck(adult2);
  }
  
  

  //요일 필드(이미지)
  const [weekField, setWeekField] = useState([
    {
      d: 1,
      label: "일요일",
      alt: "sunday.png",
    },
    {
      d: 2,
      label: "월요일",
      alt: "monday.png",
    },
    {
      d: 3,
      label: "화요일",
      alt: "tuesday.png",
    },
    {
      d: 4,
      label: "수요일",
      alt: "wednesday.png",
    },
    {
      d: 5,
      label: "목요일",
      alt: "thursday.png",
    },
    {
      d: 6,
      label: "금요일",
      alt: "friday.png",
    },
    {
      d: 7,
      label: "토요일",
      alt: "saturday.png",
    },
  ]);

  //달력 누르면 창에 이름 들어감
  const [week, setWeek] = useState("default");
  const handleWeek = (w) => {
    setWeek(w);
  };
  

  return (
    <>
      <p className="text-lg mb-2">팝업/전시 등록</p>
      <hr className="w-full" />
      <div className="mt-2">기본 정보</div>
      {/* 맨 위 박스  */}
      <div className="flex flex-col w-5/6 mx-auto gap-5 mt-16">
        <div>
          <div className="grid grid-cols-2 gap-x-20 h-full">

            {/* 전시명, 부제, 입장료, 전시기간 */}
            <div className="flex flex-col gap-10">
              <div>
                <label className="text-sm">
                  팝업/전시명<span className="text-red-500">*</span>
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="팝업/전시명을 입력해주세요"
                />
              </div>
              <div>
                <label className="text-sm  ">
                  부제<span className="text-red-500">*</span>
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="부제목을 입력해주세요"
                />
              </div>
              <div>
                <div className="flex justify-between w-full">
                  <label className="text-sm w-full">입장료</label>
                  <div className="flex items-center w-full">
                    <input type="checkbox" className="" />
                    <span className="ml-3 text-sm">무료 입장</span>
                  </div>
                </div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="입장료를 입력해주세요"
                />
              </div>
              <div>
                <label className="text-sm">
                  전시기간<span className="text-red-500">*</span>
                </label>
                <div className="">
                  <input
                    type="date"
                    className="bg-gray-50 border rounded-lg inline w-1/3 p-2.5 text-xs"
                    required
                    placeholder="시작일"
                  />
                  <span>~</span>
                  <input
                    type="date"
                    className="bg-gray-50 border rounded-lg inline w-1/3 p-2.5 text-xs"
                    required
                    placeholder="종료일"
                  />
                </div>
              </div>
            </div>
             
            {/* 장소, 홈페이지 링크, 인스타그램 링크 */}
            <div className="flex flex-col justify-between ">
              <div>
                <label className="text-sm block">
                  장소<span className="text-red-500">*</span>
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-2/3 p-2.5 inline "
                  placeholder="도로명주소"
                  value={address.roadAddress}
                  readOnly
                />
                <PostCode
                  className="border p-2 rounded-lg"
                  value="검색"
                  setAddress={setAddress}
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="상세주소"
                />
              </div>
              <div>
                <label className="text-sm">홈페이지 링크</label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="홈페이지 링크(URL)을 입력해주세요"
                />
              </div>
              <div>
                <label className="text-sm">인스타그램 링크</label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="인스타그램 링크(URL)을 입력해주세요"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 공지사항, 상세설명 마크다운 */}
        <div className="flex mt-10">
          <div className="grid grid-cols-2 gap-x-20  w-full ">
            <div>
              <label htmlFor="notice" className="text-sm">
                공지사항
              </label>
              <div>
                <Markdown content={notice} contentChange={handleNotice} />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="text-sm">
                상세설명
              </label>
              <div>
                <Markdown
                  content={detailDescription}
                  contentChange={handleDescription}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 관람시간 정보  */}
        <div className="mt-10">
          관람시간 정보<span className="text-red-500">*</span>
          <div className="mt-5 flex justify-between">
            {weekField.map((w) => {
              return (
                <img
                  src={`/week/${w.alt}`}
                  alt={w.alt}
                  className="w-20 hover:cursor-pointer"
                  onClick={() => {
                    handleWeek(w.label);
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* 시간 설정 div */}
        <div className="flex justify-center">
          <div className="border w-80 h-36 rounded-lg">
            <div className="flex justify-between p-3 text-xs">
              <span>{week}</span>
              <div>
                <input
                  type="checkbox"
                  id="holiday"
                  checked={holiday}
                  onChange={handleHoliday}
                />
                <label htmlFor="holiday">휴무지정</label>
              </div>
            </div>
            <div className="flex justify-between p-3 ">
              <label className="block text-xs text-center" htmlFor="open">
                오픈
              </label>
              <input
                type="time"
                id="open"
                className="w-24 border rounded-lg text-[0.8rem]"
              />
              <label className="block text-xs text-center" htmlFor="close">
                마감
              </label>
              <input
                type="time"
                id="close"
                className="w-24 rounded-lg border text-[0.8rem]"
              />
            </div>
            <div className="flex m-2 justify-end">
              <button
                type="submit"
                className="border text-sm p-1 rounded-lg hover:bg-popple hover:text-white"
              >
                완료
              </button>
            </div>
          </div>
        </div>

        {/* 제한사항 */}
        <div className="mt-10">
          제한사항<span className="text-red-500">*</span>
          <div className="grid grid-cols-4 gap-1 w-3/5">
            <div onClick={handleParking} className="mt-5">
              {parking ? (
                <div>
                  <div className="flex justify-center">
                    <LuParkingCircleOff
                      style={{ color: "red", fontSize: "30px" }}
                    />
                  </div>
                  <div className="flex justify-center">
                    <label className="text-red-500 text-xs font-bold">
                      {" "}
                      주차 금지{" "}
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <LuParkingCircle style={{ fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className=" text-xs font-bold"> 주차 가능 </label>
                  </div>
                </div>
              )}
            </div>
            <div onClick={handleFood} className="mt-5">
              {food ? (
                <div>
                  <div className="flex justify-center">
                    <MdNoFood style={{ color: "red", fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className="text-red-500 text-xs font-bold">
                      음식물 반입 금지
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <MdFastfood style={{ fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className=" text-xs font-bold">
                      {" "}
                      음식물 반입 가능{" "}
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div onClick={handleWifi} className="mt-5">
              {wifi ? (
                <div>
                  <div className="flex justify-center">
                    <CiWifiOff style={{ color: "red", fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className="text-red-500 text-xs font-bold">
                      와이파이 불가
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <CiWifiOn style={{ fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className=" text-xs font-bold">
                      {" "}
                      와이파이 가능{" "}
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div onClick={handleCamera} className="mt-5">
              {camera ? (
                <div>
                  <div className="flex justify-center">
                    <LuCameraOff style={{ color: "red", fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className="text-red-500 text-xs font-bold">
                      촬영 금지
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <LuCamera style={{ fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className=" text-xs font-bold">촬영 가능 </label>
                  </div>
                </div>
              )}
            </div>
            <div onClick={handlePet} className="mt-5">
              {pet ? (
                <div>
                  <div className="flex justify-center">
                    <FaDog style={{ color: "red", fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className="text-red-500 text-xs font-bold">
                      반려동물 금지
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <FaDog style={{ fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className=" text-xs font-bold">반려동물 가능 </label>
                  </div>
                </div>
              )}
            </div>
            <div onClick={handleKids} className="mt-5">
              {kids ? (
                <div>
                  <div className="flex justify-center">
                    <FaUserSlash style={{ color: "red", fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className="text-red-500 text-xs font-bold">
                      노키즈존
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <FaUser style={{ fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className=" text-xs font-bold">
                      어린이 출입 가능
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div onClick={handleAdult} className="mt-5">
              {adult ? (
                <div>
                  <div className="flex justify-center">
                    <FaArrowUp19 style={{ color: "red", fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className="text-red-500 text-xs font-bold">
                      청소년 관람 불가
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <FaArrowDown19 style={{ fontSize: "30px" }} />
                  </div>
                  <div className="flex justify-center">
                    <label className=" text-xs font-bold">
                      전연령 관람 가능
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <hr className="w-full mt-10" />
          <div className="flex justify-end items-center">
            <button type="submit" className="border rounded-lg p-3 mt-10">
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


