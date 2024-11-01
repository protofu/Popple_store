import { useEffect, useState } from "react";
import { exhibitionAPI } from "../../api/services/Exhibition";
import { MdFastfood, MdNoFood } from "react-icons/md";
import { FaArrowDown19, FaArrowUp19, FaDog, FaUser, FaUserSlash } from "react-icons/fa6";
import { CiWifiOff, CiWifiOn } from "react-icons/ci";
import { LuCamera, LuCameraOff, LuFilePlus, LuParkingCircle, LuParkingCircleOff } from "react-icons/lu";
import TypeDropdown from "./TypeDropdown";
import Markdown from "../common/Markdown";
import PostCode from "../common/PostCode";
import FileCarousel from "./FileCarousel";
export default function ExhibitionUpdatePage() {
  const exId = 2572;
  const fileMax=10;
  // param으로 넘겨서
  // const queryParams = new URLSearchParams(location.search);
  // // key값이 id 인 것의 value값을 가져옴
  // const exId = queryParams.get("id");
  //드래그앤 드랍 상태 관리
  const [isActive, setIsActive] = useState(false);
  const [uploadPossible, setUploadPossible] = useState(true);
  //드래그앤드랍 이벤트 핸들러
  const handleDragStart = () => setIsActive(true);
  const handleDragEnd = () => setIsActive(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsActive(false);
    const files = Array.from(e.dataTransfer.files);
    onUpload2(files);
  };
  const handleDragOver = (e) => {
    if (!uploadPossible) return false;
    e.preventDefault();
    setIsActive(true);
  };
  //상세 이미지 상태 관리
  const [preview2, setPreview2] = useState([]);
  const onUpload2 = (files) => {
    if (preview2.length >= fileMax) {
      setUploadPossible(false);
      return;
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
    setInfo((prev) => ({ ...prev, eventImage: files }));
  };


  const [exhiData, setExhiData] = useState({});
  const inputStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg inline-block p-2.5 mb-10";
  const handleGet = async () => {
    try {
      const res = await exhibitionAPI.get(exId);
      if (res.status === 200) {
        const {
          typeId,
          exhibitionName,
          subTitle,
          free,
          fee,
          startAt,
          endAt,
          detailDescription,
          poster,
          address,
          detailAddress,
          homepageLink,
          instagramLink,
          notice,
          reserve,
          image,
          terms,
        } = res.data;
        setExhiData({
          typeId: typeId,
          exhibitionName: exhibitionName,
          subTitle: subTitle,
          free: free,
          fee: fee,
          startAt: startAt,
          endAt: endAt,
          detailDescription: detailDescription,
          poster: poster,
          address: address,
          detailAddress: detailAddress,
          homepageLink: homepageLink,
          instagramLink: instagramLink,
          notice: notice,
          reserve: reserve,
          image: image,
          terms: terms,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    if (Object.keys(exhiData).length > 0) {
      setInfo((prev) => ({
        ...prev,
        ...exhiData, // 가져온 데이터를 info에 반영
      }));
    }
  }, [exhiData]);

  const [info, setInfo] = useState({
    typeId:exhiData.typeId,
    exhibitionName: "",
    subTitle: "",
    free: "",
    fee: false,
    startAt: "",
    endAt: "",
    detailDescription: "",
    poster: "",
    address: "",
    detailAddress: "",
    homepageLink: "",
    instagramLink: "",
    notice: "",
    reserve: false,
    image: [],
    terms: "",
  });
  const changeInformation = (e) => {
    const { name, type } = e.target;
    let { value } = e.target;
    const keys = name.split(".");

    if (name === "endAt" || name === "startAt") {
      const startAt = new Date(info.startAt);
      const endAt = new Date(name === "endAt" ? value : info.endAt);

      if (endAt < startAt) {
        alert("종료일은 시작일보다 빠를 수 없습니다.");
        return;
      }
    }
    if (keys.length === 1) {
      setInfo({
        ...info,
        [name]: value,
      });
    } else if (keys.length === 2) {
      setInfo({
        ...info,
        [keys[0]]: {
          ...info[keys[0]],
          [keys[1]]: value,
        },
      });
    } else if (keys.length === 3) {
      setInfo({
        ...info,
        [keys[0]]: {
          ...info[keys[0]],
          [keys[1]]: {
            ...info[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        },
      });
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-5 mt-16 w-5/6 h-full">
          <div>
            <div className="grid grid-cols-2 gap-x-32 w-full h-full">
              <div className="flex flex-col justify-between">
                
                <label>
                  {info.typeId == 1 ? "팝업" : "전시"}명
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="exhibitionName"
                  className={inputStyle}
                  value={exhiData.exhibitionName}
                  onChange={(e) => changeInformation(e)}
                />

                <label>
                  부제 <span className="text-red-500">*</span>
                </label>
                <input
                  name="subTitle"
                  className={inputStyle}
                  value={exhiData.subTitle}
                  onChange={(e) => changeInformation(e)}
                />

                <label>
                  입장료
                  <span className="float-right">
                    <input
                      type="checkbox"
                      name="free"
                      onChange={(e) => changeInformation(e)}
                      checked={info.free}
                    />
                    <label>무료</label>
                  </span>
                </label>
                <input
                  name="fee"
                  className={inputStyle}
                  value={exhiData.free ? 0 : info.fee}
                  onChange={(e) => changeInformation(e)}
                  disabled={info.free}
                />

                <label>상세 설명</label>
                <div className={inputStyle}>
                  <Markdown
                    content={info.detailDescription}
                    // contentChange={(e) =>
                    //   handleMarkDown("detailDescription", e)
                    // }
                  />
                </div>

                <label>
                  메인 포스터 <span className="text-red-500">*</span>
                </label>
                <label
                  className={`${inputStyle} py-5 flex justify-center cursor-pointer h-48`}
                >
                  <input
                    className="hidden"
                    name="poster"
                    type="file"
                    onChange={onPosterUpload}
                    accept="image/*"
                  />
                  {posterPreview ? (
                    <img
                      className="w-[250px] h-auto"
                      src={posterPreview}
                      alt="메인 포스터"
                    />
                  ) : (
                    <LuFilePlus className="w-full h-full" />
                  )}
                </label>
              </div>

              <div className="flex flex-col justify-between">
                <label>
                  장소 <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    name="address"
                    className={`${inputStyle} w-full !mb-0`}
                    value={exhiData.address}
                    readOnly
                  />
                  <PostCode
                    className="border p-2 rounded-lg inline-block w-1/6 ml-2"
                    value="검색"
                    setAddress={setAddress}
                  />
                </div>
                <input
                  name="detailAddr"
                  placeholder="상세주소"
                  className={inputStyle}
                  value={exhiData.detailAddr}
                  onChange={(e) => changeInformation(e)}
                />
                <label>
                  {info.typeId == 1 ? "팝업" : "전시"} 기간{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex justify-between">
                  <input
                    placeholder="시작일"
                    type="date"
                    name="startAt"
                    className={`${inputStyle} w-1/2`}
                    value={exhiData.startAt}
                    onChange={(e) => changeInformation(e)}
                    min={`${today}`}
                  />
                  <span className="mx-5">~</span>
                  <input
                    placeholder="종료일"
                    type="date"
                    name="endAt"
                    className={`${inputStyle} w-1/2`}
                    value={exhiData.endAt}
                    onChange={(e) => changeInformation(e)}
                    min={`${today}`}
                  />
                </div>

                <label>홈페이지 링크</label>
                <input
                  name="homepageLink"
                  className={inputStyle}
                  value={exhiData.homepageLink || "https://"}
                  onChange={(e) => changeInformation(e)}
                />

                <label>인스타그램 계정</label>
                <input
                  name="instagramLink"
                  className={inputStyle}
                  value={exhiData.instagramLink || "@"}
                  onChange={(e) => changeInformation(e)}
                />

                <label>공지사항</label>
                <div className={inputStyle}>
                  <Markdown
                    content={info.notice}
                    contentChange={(e) => handleMarkDown("notice", e)}
                  />
                </div>

                <label>
                  이미지 <span className="text-red-500">*</span>
                  <span className="text-xs float-right">
                    {imagePreviewArr.length}/{fileMax}
                  </span>
                </label>

                <div
                  className={`${inputStyle} preview ${
                    isActive ? "active" : " "
                  } flex justify-center cursor-pointer h-48`}
                  onDragEnter={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragLeave={handleDragEnd}
                  onClick={() => document.getElementById("detailImage").click()}
                >
                  <input
                    type="file"
                    id="detailImage"
                    className="hidden"
                    multiple
                    onChange={onImageArrUpload}
                    accept="image/*"
                  />
                  {imagePreviewArr.length > 0 ? (
                    <FileCarousel
                      preview2={imagePreviewArr}
                      deleteImg={deleteImg}
                    />
                  ) : (
                    <div className="flex flex-col rounded-lg justify-center text-center items-center">
                      <p className="font-medium text-lg my-5 mb-2.5">
                        클릭 혹은 파일을 이곳에 드랍
                      </p>
                      <p className="m-0 text-sm">파일 당 최대 3MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 관람시간 요일 선택 */}
              {/* <div className={`col-span-2`}>
                <label>
                  관람시간 정보 <span className="text-red-500">*</span>
                </label>
                <div className={`${inputStyle} flex justify-between`}>
                  {daysOfWeek.map((day) => (
                    <div
                      key={day.name}
                      className={`border-2 border-popple-light ${
                        week === day.name
                          ? "border-opacity-50"
                          : "border-opacity-20"
                      } rounded-lg`}
                    >
                      <img
                        src={`/week/${day.name}.png`}
                        alt={`${day.name}.png`}
                        className="w-20 hover:cursor-pointer"
                        onClick={() => setWeek(day.name)}
                      />
                    </div>
                  ))}
                </div>
              </div> */}

              {/* 관람시간 지정 인풋 */}
              {/* <div
                className={`${inputStyle} my-auto p-5 gap-5 flex flex-col justify-around`}
              >
                <button
                  type="button"
                  className="border p-2"
                  onClick={handleAllDay}
                >
                  일괄처리
                </button>
                <div className="flex justify-between">
                  <span
                    className={`${
                      week === "sunday"
                        ? "text-red-400"
                        : week === "saturday"
                        ? "text-blue-400"
                        : "text-black"
                    }`}
                  >
                    {week.toUpperCase()}
                  </span>
                  <div>
                    <input
                      name={`openTime.${week}.holiday`}
                      type="checkbox"
                      className="ml-10"
                      onChange={(e) => changeInformation(e)}
                      checked={information.openTime[week].holiday}
                    />
                    <label>휴무지정</label>
                  </div>
                </div>
                <div className="flex justify-evenly">
                  <label>오픈</label>
                  <input
                    type="time"
                    name={`openTime.${week}.open`}
                    className={`${inputStyle}`}
                    value={information.openTime[week].open}
                    onChange={(e) => changeInformation(e)}
                    disabled={information.openTime[week].holiday}
                  />
                  <label>마감</label>
                  <input
                    type="time"
                    name={`openTime.${week}.close`}
                    className={`${inputStyle}`}
                    value={information.openTime[week].close}
                    onChange={(e) => changeInformation(e)}
                    disabled={information.openTime[week].holiday}
                  />
                </div>
              </div> */}

              {/* 관람시간 확인 테이블 */}
              {/* <div>
                <table className="w-full text-center text-xs text-gray-500 dark:text-gray-400">
                  <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col">요일</th>
                      <th scope="col">시작 시간</th>
                      <th scope="col">종료 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(information.openTime).map((key) => {
                      return (
                        <tr
                          key={key}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <span
                              className={`${
                                key === "sunday"
                                  ? "text-red-400"
                                  : key === "saturday"
                                  ? "text-blue-400"
                                  : "text-black"
                              }`}
                            >
                              {key.toUpperCase()}
                            </span>
                          </th>
                          {information.openTime[key].holiday ? (
                            <td colSpan={2} className="bg-red-200">
                              휴무
                            </td>
                          ) : (
                            <>
                              <td>{information.openTime[key].open}</td>
                              <td>{information.openTime[key].close}</td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
             */}
            </div>
            {/* 
              
              <div>
                <input
                  name="reserve"
                  type="checkbox"
                  className="ml-10"
                  onChange={(e) => changeInformation(e)}
                  checked={information.reserve}
                />
                <label>예약 여부</label>
              </div>
             */}
          </div>
        </div>
      </div>
    </>
  );
}

