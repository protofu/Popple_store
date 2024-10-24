import { useState } from "react";
import { LuFilePlus } from "react-icons/lu";
import FileCarousel from "../components/exhibition/FileCarousel";

export default function EventRegister() {
  const fileMax = 5;
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
    console.log("Selected file:", file); // 파일 확인
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("File content:", reader.result); // 결과 확인
      setPreview(reader.result); // 파일의 컨텐츠를 preview에 저장
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

  const [title, setTitle] = useState([
    {
      id: 1,
      name: "이벤트명",
    },
    {
      id: 2,
      name: "요약설명",
    },
    {
      id: 3,
      name: "상세설명",
    },
  ]);

  return (
    <>
      <p className="text-lg mb-2 mt-10 ">팝업/전시 등록</p>
      <hr className="w-full" />
      <div className="mt-2">이벤트 정보</div>

      <div className="flex flex-col w-5/6 mx-auto gap-5 mt-16">
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          {title.map((t) => {
            return (
              <>
                <div>
                  <label className="text-sm" htmlFor="1">
                    {t.name}
                    <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5" />
                </div>
              </>
            );
          })}
          <div className="flex ">
            <div className="flex flex-col mt-1">
              <label className="text-sm" htmlFor="start">
                이벤트 시작일<span className="text-red-500">*</span>
              </label>
              <input
                id="start"
                type="date"
                className="bg-gray-50 border rounded-lg p-2.5 text-xs"
                required
                placeholder="시작일"
              />
            </div>
            <span className="ml-7 mr-7 mt-7">~</span>
            <div className="flex flex-col mt-1">
              <label className="text-sm" htmlFor="end">
                이벤트 종료일<span className="text-red-500">*</span>
              </label>
              <input
                id="end"
                type="date"
                className="bg-gray-50 border rounded-lg inline p-2.5 text-xs"
                required
                placeholder="종료일"
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
        <hr className="w-full mt-10" />
        <div className="flex justify-end">
          <button
            type="submit"
            className="border rounded-lg p-3 mt-5"
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
}
