import { useState } from "react";
import { LuFilePlus } from "react-icons/lu";
import FileCarousel from "../../components/exhibition/FileCarousel";
import { eventAPI } from "../../api/services/Event";
import { useNavigate } from "react-router-dom";
export default function EventUpdate() {
  const fileMax = 5;
  // param으로 넘겨서
  const queryParams = new URLSearchParams(location.search);
  // key값이 id 인 것의 value값을 가져옴
  const evId = queryParams.get("id");
  console.log("가져온 이벤트 id", evId)

  const [eventData, setEventData] = useState({});

  //이벤트 정보 가져오자
  const handleGet = async() => {
    try {
      const res = await eventAPI.getEvent(evId);
      console.log("가져온 데이터", res.data)
      setEventData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(eventData)

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
      console.log("나 업로드 안할래");
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
    setInfo(prev => ({ ...prev, eventImage: files }))
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
    setInfo(prev => ({ ...prev, eventPoster: file }))
  };


  //입력 정보
  const [info, setInfo] = useState({
    eventImage: [],
    eventPoster: "",
    summary: "",
    exId: evId,
    description: "",
    eventName: "",
    startAt: "",
    endAt: "",
  });
  const navigate = useNavigate();
  //수정 핸들러
  const handleSubmit = async (event) => {

    try {

      event.preventDefault(); // 기본 폼 제출 방지
      console.log("인포",info);

      const formData = new FormData();

      // 포스터 파일 추가
      if (info.eventPoster) {
        formData.append("eventPoster", info.eventPoster);
      }
      // 이미지 파일 추가
      if (info.eventImage) {
        info.eventImage.forEach((img, index) => {
          formData.append(`eventImage`, img);
        });
      }
      formData.append("exId", info.exId);
      formData.append("startAt", info.startAt);
      formData.append("endAt", info.endAt);
      formData.append("description", info.description);
      formData.append("summary", info.summary);
      formData.append("eventName", info.eventName);

      const res = await eventAPI.update(formData);
      console.log(formData)
      console.log(res.status);
      if (res.status === 200 || res.status === 204) {
        alert("이벤트가 수정되었습니다.");
        navigate('/')
      }
    } catch (error) {
      alert("이벤트 등록에 실패하였습니다.");
      console.error("오류 발생:" + error);
    }
  };

  // 마크다운 입력 핸들러
  const handleMarkDown = (name, value) => {
    setInfo(prev => ({ ...prev, [name]: value }));
  };

   //날짜 지정 (오늘날짜)
   const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <p className="text-lg mb-2 mt-10 ">팝업/전시 등록</p>
      <hr className="w-full" />
      <div className="mt-2">이벤트 정보</div>

      <div className="flex flex-col w-5/6 mx-auto gap-5 mt-16">
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          <label className="text-sm" htmlFor="1">
            이벤트명 <span className="text-red-500">*</span>
          </label>
          <input
            id="eventName"
            value={info.eventName}
            onChange={(e) => setInfo({ ...info, eventName: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
          />
          <label className="text-sm" htmlFor="1">
            요약설명 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="summary"
            onChange={(e) => setInfo({ ...info, summary: e.target.value })}
            value={info.summary}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
          />
          <label className="text-sm" htmlFor="1">
            상세설명 <span className="text-red-500">*</span>
          </label>
          <input
            id="description"
           
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
            value={info.description}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
          />
          {/* <div>
            <Markdown
              content={info.description}
              contentChange={(e) => handleMarkDown("description", e)}
            />
          </div> */}
          <div className="flex ">
            <div className="flex flex-col mt-1">
              <label className="text-sm" htmlFor="start">
                이벤트 시작일<span className="text-red-500">*</span>
              </label>
              <input
                id="startAt"
                type="date"
                value={info.startAt}
                onChange={(e) => setInfo({ ...info, startAt: e.target.value })}
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
                id="endAt"
                onChange={(e) => setInfo({ ...info, endAt: e.target.value })}
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
        <div className="grid grid-cols-2 gap-x-20 gap-y-10 my-10">
          <div>
            <label htmlFor="poster" className="text-sm">
              포스터
            </label>
            <label className=" p-5 h-fit w-fit  bg-white rounded-lg border flex flex-col justify-center items-center cursor-pointer">
              <input
                id="poster"
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
                className={`preview ${isActive ? "active" : " "
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
          <button type="submit" className="border p-3" onClick={handleSubmit}>
            등록
          </button>
          <button onClick={handleGet}>가져오나 설마</button>
        </div>
      </div>
    </>
     
  );
}
