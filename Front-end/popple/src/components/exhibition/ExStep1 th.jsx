import { useEffect, useState } from "react";
import {
  LuFilePlus,
  LuParkingCircle,
  LuParkingCircleOff,
  LuCamera,
  LuCameraOff,
} from "react-icons/lu";
import { MdFastfood, MdNoFood } from "react-icons/md";
import { CiWifiOn, CiWifiOff } from "react-icons/ci";
import PostCode from "../common/PostCode";
import {
  FaDog,
  FaUserSlash,
  FaUser,
  FaArrowDown19,
  FaArrowUp19,
} from "react-icons/fa6";

import Markdown from "../common/Markdown";
import FileCarousel from "./FileCarousel";

const ExStep1 = ({ information, changeInformation }) => {
  const [week, setWeek] = useState("mon");
  const fileMax = 10;

  //드래그앤 드랍 상태 관리
  const [isActive, setIsActive] = useState(false);
  const [uploadPossible, setUploadPossible] = useState(true);

  const handleDragStart = () => setIsActive(true);

  const handleDragEnd = () => setIsActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsActive(false);
    const files = Array.from(e.dataTransfer.files);
    console.log("올라갈 파일:", files);
    onUpload2(files);
  };
  const handleDragOver = (e) => {
    if (!uploadPossible) return false;
    e.preventDefault();
    setIsActive(true);
  };

  //연습 데이터
  const [data, setData] = useState({
    companyId: 1,
    image: "",
  });

  //파일 이미지 삭제
  function deleteImg(index) {
    const deletePreview2 = [...preview2];
    deletePreview2.splice(index, 1);
    setPreview2(deletePreview2);
  }
  //연데
  const [data, setData] = useState({
    companyId: 1,
    image: "",
  });
  //포스터 이미지 상태 관리
  const [preview, setPreview] = useState(null);

  const onUpload = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file); // 파일 확인
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("File content:", reader.result); // 결과 확인
      setPreview(reader.result); // 파일의 컨텐츠를 preview에 저장
      setData((prevData) => ({
        ...prevData,
        image:file,
      }))
    };
  };
  //상세 이미지 상태 관리
  const [preview2, setPreview2] = useState([]);
  const onUpload2 = (files) => {
    // 파일이 2개 이상이면 업로드 안함
    if (preview2.length >= fileMax) {
      console.log("나 업로드 안할래");
      setUploadPossible(false);
      return false;
    }
    const preview = files.map((f) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    });
    Promise.all(preview).then((newPreviews) => {
      setPreview2((prevPreviews) => {
        const fileCount = prevPreviews.length + newPreviews.length; // 저장할 파일 총개수
        if (fileCount > fileMax) {
          newPreviews = newPreviews.splice(0, fileCount - fileMax);
        }
        return [...prevPreviews, ...newPreviews];
      });
    });
    console.log("업로드 완료! 파일 개수", preview2.length);
  };

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

  //전시기간 날짜 선택 관리
  const today = new Date().toISOString().split("T")[0];

  const inputStyle =
    "w-full h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 block focus:outline-none px-2";
  const smallStyle =
    "w-2/5 h-[50px] border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2";
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-x-20 h-full">
          {/* 전시명, 부제, 입장료, 전시기간 */}
          <div className="flex flex-col gap-10">
            <div>
              <label className="text-xs">
                팝업 전시명<span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                required
                placeholder="팝업/전시명을 입력해주세요."
                className={inputStyle}
                value={information.title}
                onChange={(e) => changeInformation(e)}
              />
            </div>
            <div>
              <label className="text-xs">
                부제<span className="text-red-500">*</span>
              </label>
              <input
                name="subtitle"
                placeholder="부제를 입력해주세요."
                className={inputStyle}
                required
                value={information.subtitle}
                onChange={(e) => changeInformation(e)}
              />
            </div>
            <div>
              <label className="text-xs">
                입장료<span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  name="fee"
                  required
                  placeholder="입장료를 입력해주세요."
                  className={smallStyle}
                  value={information.fee}
                  onChange={(e) => changeInformation(e)}
                />
                원
              </div>
            </div>
            <div>
              <label className="text-xs">
                팝업 전시 기간<span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="date"
                  name="startDate"
                  required
                  placeholder="시작일"
                  className={smallStyle}
                  min={`${today}`}
                  value={information.startDate}
                  onChange={(e) => changeInformation(e)}
                />
                <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
                <input
                  type="date"
                  name="endDate"
                  required
                  placeholder="종료일"
                  min={`${today}`}
                  className={smallStyle}
                  value={information.endDate}
                  onChange={(e) => changeInformation(e)}
                />
              </div>
            </div>
          </div>
          {/* 장소, 홈페이지 링크, 인스타그램 링크 */}
          <div className="flex flex-col justify-between">
            <div>
              <label className="text-xs">
                주소<span className="text-red-500">*</span>
              </label>
              <input
                name="roadAddr"
                placeholder="도로명 주소"
                className={inputStyle}
                required
                value={information.roadAddr}
                onChange={(e) => changeInformation(e)}
              />
              <input
                name="detailAddr"
                className={inputStyle}
                placeholder="상세주소를 입력해주세요."
                value={information.detailAddr}
                onChange={(e) => changeInformation(e)}
              />
            </div>
            <div>
              <label className="text-xs">홈페이지 링크</label>
              <input
                name="homepageLink"
                className={inputStyle}
                value={information.homepageLink}
                onChange={(e) => changeInformation(e)}
              />
            </div>
            <div>
              <label className="text-xs">인스타그램 링크</label>
              <input
                name="instagramLink"
                className={inputStyle}
                value={information.instagramLink}
                onChange={(e) => changeInformation(e)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 상세설명, 공지사항 */}
      <div className="flex mt-10">
        <div className="grid grid-cols-2 gap-x-20 w-full ">
          <div>
            <label className="text-xs" htmlFor="description">
              상세 설명
            </label>
            <div>
              <Markdown
                content={detailDescription}
                contentChange={handleDescription}
              />
            </div>
          </div>
          {/* <input
              name="description"
              className={inputStyle}
              value={information.description}
              onChange={(e) => changeInformation(e)}
            /> */}
          <div>
            <label className="text-xs" htmlFor="notice">
              공지사항
            </label>
            <div>
              <Markdown content={notice} contentChange={handleNotice} />
            </div>
            {/* <input
            name="notice"
            className={inputStyle}
            value={information.notice}
            onChange={(e) => changeInformation(e)}

          /> */}
          </div>
        </div>
      </div>
      {/* 포스터, 상세이미지 */}
      <div className="flex mt-10">
        <div className="grid grid-cols-2 gap-x-20  w-full ">
          <div>
            <label htmlFor="poster" className="text-sm">
              포스터
            </label>
            <label className=" p-5 h-fit w-fit  bg-white rounded-lg border flex flex-col justify-center items-center cursor-pointer">
              <input
                id="poster"
                name="poster"
                className="hidden w-fit h-fit"
                type="file"
                onChange={onUpload}
                accept="image/*"
              />
              {preview ? (
                <img className="w-5/6 h-5/6" src={preview} alt="포스터" />
              ) : (
                <LuFilePlus className="text-xl sm:text-4xl md:text-5xl lg:text-9xl" />
              )}
            </label>
          </div>
          <div>
            <label htmlFor="detailImage" className="text-sm">
              상세 이미지
            </label>
            <div className="h-full">
              <label
                className={`preview ${
                  isActive ? "active" : " "
                } w-full h-full m-auto bg-white rounded-md border-dashed border p-3 flex justify-center cursor-pointer`}
                onDragEnter={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragEnd}
              >
                <input
                  type="file"
                  id="detailImage"
                  className="hidden"
                  multiple
                  onChange={onUpload2}
                  accept="image/*"
                />
                {preview2.length > 0 ? (
                  <FileCarousel preview2={preview2} deleteImg={deleteImg} />
                ) : (
                  <div className="flex flex-col rounded-lg justify-center text-center items-center">
                    <p className="font-medium text-lg my-5 mb-2.5">
                      클릭 혹은 파일을 이곳에 드랍
                    </p>
                    <p className="m-0 text-sm">파일당 최대 3MB</p>
                  </div>
                )}
              </label>
              <div className="text-xs">
                {preview2.length}/{fileMax}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        관람시간 정보<span className="text-red-500">*</span>
        <div className="mt-5 flex justify-between">
          <button onClick={() => setWeek("mon")}>
            <img className="w-20" src="/public/week/monday.png" />
          </button>
          <button onClick={() => setWeek("tue")}>
            <img className="w-20" src="/public/week/tuesday.png" />
          </button>
          <button onClick={() => setWeek("wed")}>
            <img className="w-20" src="/public/week/wednesday.png" />
          </button>
          <button onClick={() => setWeek("thu")}>
            <img className="w-20" src="/public/week/thursday.png" />
          </button>
          <button onClick={() => setWeek("fri")}>
            <img className="w-20" src="/public/week/friday.png" />
          </button>
          <button onClick={() => setWeek("sat")}>
            <img className="w-20" src="/public/week/saturday.png" />
          </button>
          <button onClick={() => setWeek("sun")}>
            <img className="w-20" src="/public/week/sunday.png" />
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="border w-80 h-36 rounded-lg">
          <div className="flex justify-between p-3 text-xs">
            <span>{week}</span>
            <div>
              <label>
                <input
                  name={`openTime.${week}.holiday`}
                  type="checkbox"
                  className="ml-10"
                  onChange={(e) => changeInformation(e)}
                />
                휴무일
              </label>
            </div>
          </div>
          <div className="flex justify-between p-3 ">
            <label className="block text-xs text-center">
              오픈
              <input
                type="time"
                name={`openTime.${week}.open`}
                className="w-24 border rounded-lg text-[0.8rem]"
                required
                value={information.openTime[week].open}
                onChange={(e) => changeInformation(e)}
              />
            </label>
            <label className="block text-xs text-center">
              마감
              <input
                type="time"
                name={`openTime.${week}.close`}
                required
                className="w-24 border rounded-lg text-[0.8rem]"
                value={information.openTime[week].close}
                onChange={(e) => changeInformation(e)}
              />
            </label>
          </div>
          <div className="flex m-2 justify-end">
            <button
              type="submit"
              className="border text-sm p-2 rounded-lg hover:bg-popple hover:text-white"
            >
              완료
            </button>
          </div>
        </div>
      </div>
      

      <div>{JSON.stringify(information.openTime.mon)}</div>
      <div>{JSON.stringify(information.openTime.tue)}</div>
      <div>{JSON.stringify(information.openTime.wed)}</div>
      <div>{JSON.stringify(information.openTime.thu)}</div>
      <div>{JSON.stringify(information.openTime.fri)}</div>
      <div>{JSON.stringify(information.openTime.sat)}</div>
      <div>{JSON.stringify(information.openTime.sun)}</div>
    </>
  );
};

export default ExStep1;
