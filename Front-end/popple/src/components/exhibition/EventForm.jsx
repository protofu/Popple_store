import { useState } from "react";
import FileCarousel from "./FileCarousel";
import { useNavigate } from "react-router-dom";
import Markdown from "../common/Markdown";
import { LuFilePlus } from "react-icons/lu";
import { poppleAlert } from "../../utils/PoppleAlert";

const EventForm = ({ title, info, setInfo, handleSubmit }) => {
  const fileMax = 5;

  const navigate = useNavigate();

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

  //파일 이미지 삭제
  function deleteImg(index) {
    const deletePreview2 = [...preview2];
    deletePreview2.splice(index, 1);
    setPreview2(deletePreview2);
  }

  //포스터 이미지 상태 관리
  const [preview, setPreview] = useState(null);

  const onUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result); // 파일의 컨텐츠를 preview에 저장
    };
    setInfo((prev) => ({ ...prev, eventPoster: file }));
  };

  //날짜 지정 (오늘날짜)
  const today = new Date().toISOString().split("T")[0];

  // 마크다운 입력 핸들러
  const handleMarkDown = (name, value) => {
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

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
    } else if (keys.length === g) {
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

  const renderPoster = () => {
    if (preview) {
      {/* 포스터 이미지 업로드하면 변경되는 부분 */}
      return <img className="w-[250px] h-auto" src={preview} alt="포스터" />
    } else if (info.eventPoster) {
      {/* 수정할 때 나오는 부분 */}
      return <img className="w-[250px] h-auto" src={`http://localhost:8080/event_poster_image/${info.eventPoster}`} alt="포스터" />
    } else {
      {/* 등록할 때 */}
      return <LuFilePlus className="w-[250px] h-auto" />
    }
  }
  console.log(info)
  
  const goToNext = (event) => {
    // 만약에 필수값이 모두 입력되었으면
    const {  eventName, startAt, endAt, description, eventPoster, summary} = info
    const requiredValueCheck = eventName && description && startAt && endAt && eventPoster  && summary;
    if (requiredValueCheck) {
      handleSubmit(event)
    } else {
      poppleAlert.alert("", "필수값을 모두 입력해주세요.");
    }
  }
  return (
    <>
      <p className="text-lg mb-2 mt-10 ">{title}</p>
      <hr className="w-full" />
      <div className="mt-2">이벤트 정보</div>

      <div className="flex flex-col w-5/6 mx-auto gap-5 mt-16">
        <div className="grid grid-cols-2 gap-x-32 gap-y-10">
          <div className="flex flex-col gap-16">
            <div>
              <label className="text-sm" htmlFor="1">
                이벤트명 <span className="text-red-500">*</span>
              </label>
              <input
                name="eventName"
                value={info.eventName}
                onChange={changeInformation}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              />
            </div>
            <div>
              <label className="text-sm" htmlFor="1">
                요약설명 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="summary"
                onChange={changeInformation}
                value={info.summary}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              />
            </div>
            <div className="flex ">
              <div className="flex flex-col mt-1">
                <label className="text-sm" htmlFor="start">
                  이벤트 시작일<span className="text-red-500">*</span>
                </label>
                <input
                  name="startAt"
                  type="date"
                  onChange={changeInformation}
                  value={info.startAt}
                  className="bg-gray-50 border rounded-lg p-2.5 text-xs"
                  required
                  placeholder="시작일"
                  min={`${today}`}
                />
              </div>
              <span className="ml-7 mr-7 mt-7">~</span>
              <div className="flex flex-col mt-1">
                <label className="text-sm" htmlFor="end">
                  이벤트 종료일<span className="text-red-500">*</span>
                </label>
                <input
                  name="endAt"
                  onChange={changeInformation}
                  value={info.endAt}
                  type="date"
                  className="bg-gray-50 border rounded-lg inline p-2.5 text-xs"
                  required
                  placeholder="종료일"
                  min={`${today}`}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm" htmlFor="1">
              상세 설명 <span className="text-red-500">*</span>
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 mb-10 h-[400px]">
              <Markdown
                content={info.description}
                contentChange={(e) => handleMarkDown("description", e)}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-10 my-10">
          <div>
            <label htmlFor="eventPoster" className="text-sm">
              포스터 <span className="text-red-500">*</span>
            </label>
            <label className=" p-5 h-fit w-fit  bg-white rounded-lg border flex flex-col justify-center items-center cursor-pointer">
              <input
                name="eventPoster"
                className="hidden w-fit h-fit"
                type="file"
                onChange={onUpload}
                accept="image/*"
              />
              {renderPoster()}
            </label>
          </div>
          <div>
            <label htmlFor="eventImage" className="text-sm">
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
                  name="eventImage"
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
        <div>
          <hr className="w-full mt-10" />
          <div className="flex justify-between">
            <button
              className="border p-3 mt-10 rounded-lg hover:bg-popple hover:text-white"
              onClick={() => navigate("/event")}
            >
              취소
            </button>
            <button
              type="submit"
              className="border p-3 mt-10 rounded-lg hover:bg-popple hover:text-white"
              onClick={goToNext}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default EventForm;