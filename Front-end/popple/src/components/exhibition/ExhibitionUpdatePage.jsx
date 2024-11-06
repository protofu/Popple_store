import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { LuFilePlus } from "react-icons/lu";
import { exhibitionAPI } from "../../api/services/Exhibition";
import { poppleAlert } from "../../utils/PoppleAlert";
import Markdown from "../common/Markdown";
import PostCode from "../common/PostCode";
import FileCarousel from "./FileCarousel";
import { useNavigate } from "react-router-dom";

export default function ExhibitionUpdatePage() {
  const navigate = useNavigate();
  // param으로 넘겨서
  const handleBackClick = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };
  const queryParams = new URLSearchParams(location.search);
  // key값이 id 인 것의 value값을 가져옴
  const exId = queryParams.get("id");

  const [exhiData, setExhiData] = useState({});

  //인풋스타일
  const inputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg inline-block p-2.5 mb-10";

  //날짜 지정
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  )
    .toISOString()
    .split("T")[0];

  const [address, setAddress] = useState({});

  useEffect(() => {
    // 주소 선택 시 정보 변경
    if (address.roadAddress) {
      changeInformation({
        target: {
          name: "address",
          value: address.roadAddress,
        },
      });
    }
  }, [address]);

  // 마크다운 입력 핸들러
  const handleMarkDown = (name, value) => {
    changeInformation({
      target: {
        name,
        value,
      },
    });
  };

  // 이미지 다중 업로드 관련 상태

  const [uploadPossible, setUploadPossible] = useState(true); // 업로드 가능 여부
  const [isActive, setIsActive] = useState(false); // 파일 드래그앤드랍 상태
  const fileMax = 5; // 최대 업로드 가능 파일 수

  // 드래그앤드랍 이벤트 핸들러
  const handleDragStart = () => setIsActive(true);
  const handleDragEnd = () => setIsActive(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsActive(false);
    const files = Array.from(e.dataTransfer.files);
    onImageArrUpload(files);
  };
  const handleDragOver = (e) => {
    if (!uploadPossible) return false;
    e.preventDefault();
    setIsActive(true);
  };

  //상세 이미지 상태 관리
  const [preview2, setPreview2] = useState([]);
  const onImageArrUpload = (files) => {
    if (preview2.length >= fileMax) {
      setUploadPossible(false);
      return;
    }
    const previewPromises = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    });
  
    Promise.all(previewPromises).then((newPreviews) => {
      setPreview2((prev) => {
        const updatedPreviews = [...prev, ...newPreviews];
        if (updatedPreviews.length > fileMax) {
          poppleAlert.alert("", `파일은 최대 ${fileMax}개까지 업로드 가능합니다.`);
          updatedPreviews.splice(fileMax);
        }
        return updatedPreviews;
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

  function deleteImg2(index) {
    const deletePreview2 = [...info.descriptionImage]
    deletePreview2.splice(index, 1);
    // info.descriptionImage 를 deletePreview2로 변경
    setInfo((prev) => ({
      ...prev,
      descriptionImage: deletePreview2
    }));
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
    setInfo((prev) => ({ ...prev, savedImage: file }));
  };
  //팝업/전시 정보 가져오고
  const handleGet = async () => {
    try {
      const res = await exhibitionAPI.get(exId);
      res.data.startAt = moment(
        new Date(
          res.data.startAt[0],
          res.data.startAt[1] - 1,
          res.data.startAt[2]
        )
      ).format("YYYY-MM-DD");
      res.data.endAt = moment(
        new Date(res.data.endAt[0], res.data.endAt[1] - 1, res.data.endAt[2])
      ).format("YYYY-MM-DD");
      //가져온 걸 exhidata에 넣어주자
      setExhiData(res.data);
    } catch (error) {}
  };

  //가져온 팝업/전시 정보 뿌리기
  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    if (Object.keys(exhiData).length > 0) {
      exhiData.descriptionImage = exhiData.descriptionImage.map(imageUrl => {
        return `http://localhost:8080/image/${imageUrl}`;
      });
      setInfo((prev) => ({
        ...prev,
        ...exhiData, // 가져온 데이터를 info에 반영
      }));
    }
  }, [exhiData]);

  const [info, setInfo] = useState({
    typeId: exhiData.typeId,
    exhibitionName: "",
    subTitle: "",
    free: "",
    fee: "",
    startAt: "",
    endAt: "",
    detailDescription: "",
    savedImage: "",
    address: "",
    detailAddress: "",
    homepageLink: "",
    instagramLink: "",
    notice: "",
    reserve: exhiData.reserve,
    descriptionImage: [],
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
  const renderPoster = () => {
    if (preview) {
      {
        /* 포스터 이미지 업로드하면 변경되는 부분 */
      }
      return <img className="w-[250px] h-auto" src={preview} alt="포스터" />;
    } else if (info.savedImage) {
      {
        /* 수정할 때 나오는 부분 */
      }
      return (
        <img
          className="w-[250px] h-auto"
          src={`http://localhost:8080/poster/${info.savedImage}`}
          alt="포스터"
        />
      );
    } else {
      {
        /* 등록할 때 */
      }
      return <LuFilePlus className="w-[250px] h-auto" />;
    }
  };

  const renderImage = () => {
    if (preview2.length > 0) {
      {
        /* 이미지 업로드하면 변경되는 부분 */
      }
      return <FileCarousel preview2={preview2} deleteImg={deleteImg} />;
    } else if (info.descriptionImage.length > 0) {
      {
        /* 초기 */
        return <FileCarousel preview2={info.descriptionImage} deleteImg={deleteImg2} />;
      }
    } else {
      {
        /* 없을 때 */
      }
      return (
        <div className="flex flex-col rounded-lg justify-center text-center items-center">
          <p className="font-medium text-lg my-5 mb-2.5">
            클릭 혹은 파일을 이곳에 드랍
          </p>
          <p className="m-0 text-sm">파일당 최대 3MB</p>
        </div>
      );
    }
  };

  // 예약 드롭다운
  const [reserveStatus, setReserveStatus] = useState(false);

  const handleReserveChange = (e) => {
    const selectedValue = e.target.value;
    setReserveStatus(selectedValue);
    changeInformation({
      target: {
        name: "reserve",
        value: selectedValue === "true", // true/false로 변환
      },
    });
  };

  const updateExhibition = async () => {
    try {
      // FormData 생성
      const formData = new FormData();
      // ExhibitionRequest 필드에 맞게 데이터 추가
      formData.append("exhiId", info.id)
      formData.append("typeId", info.typeId);
      formData.append("exhibitionName", info.exhibitionName);
      formData.append("subTitle", info.subTitle);
      formData.append("detailDescription", info.detailDescription);
      formData.append("address", info.address);
      formData.append("detailAddress", info.detailAddress);
      formData.append("notice", info.notice);
      formData.append("terms", info.terms);
      formData.append("homepageLink", info.homepageLink);
      formData.append(
        "instagramLink",
        "https://www.instagram.com/" + info.instagramLink.substring(1)
      );
      formData.append("free", info.free);
      formData.append("fee", info.fee || 0);
      formData.append("reserve", info.reserve);

      // 시작일과 종료일
      formData.append("startAt", info.startAt);
      formData.append("endAt", info.endAt);

      // 이미지 파일 추가
      info.descriptionImage.forEach((img, index) => {
        formData.append(`image`, img);
      });

      // 포스터 파일 추가
      if (info.savedImage) {
        formData.append("poster", info.savedImage);
      }

      // 서버로 전송
      const res = await exhibitionAPI.update(formData);
      if (res.status === 200) {
        poppleAlert.alert("", "수정 성공");
        navigate("/my-page")
      }
    } catch (error) {
      poppleAlert.alert("", "수정 실패");
      console.error(error);
    }
  };

  const fileInputRef = useRef(null);
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-5 mt-16 w-5/6 h-full">
          <div>
            <div className="grid grid-cols-2 gap-x-32 w-full h-full">
              <div className="flex flex-col justify-between">
                <label>
                  {info.typeId == 1 ? "팝업" : "전시"}명{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="exhibitionName"
                  className={inputStyle}
                  value={info.exhibitionName}
                  onChange={(e) => changeInformation(e)}
                />

                <label>
                  부제 <span className="text-red-500">*</span>
                </label>
                <input
                  name="subTitle"
                  className={inputStyle}
                  value={info.subTitle}
                  onChange={(e) => changeInformation(e)}
                />

                {/* <label>
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
                  value={info.free ? 0 : info.fee}
                  onChange={(e) => changeInformation(e)}
                  disabled={info.free}
                /> */}

                <div>
                  <label>예약 여부</label>{" "}
                  <span className="text-red-500">*</span>
                </div>
                <select
                  value={reserveStatus}
                  onChange={handleReserveChange}
                  className={`${inputStyle} w-full mb-10`}
                >
                  <option value="true">가능</option>
                  <option value="false">불가능</option>
                </select>

                <label>상세 설명</label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 mb-10 h-[400px]">
                  <Markdown
                    content={info.detailDescription}
                    contentChange={(e) =>
                      handleMarkDown("detailDescription", e)
                    }
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
                    onChange={onUpload}
                    accept="image/*"
                  />
                  {renderPoster()}
                </label>
              </div>

              {/* 그리드 2 */}
              <div className="flex flex-col justify-between">
                <label>
                  장소 <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    name="address"
                    className={`${inputStyle} w-full !mb-0`}
                    value={info.address}
                    readOnly
                  />
                  <PostCode
                    className="border p-2 rounded-lg inline-block w-1/6 ml-2"
                    value="검색"
                    setAddress={setAddress}
                  />
                </div>
                <input
                  name="detailAddress"
                  placeholder="상세주소"
                  className={inputStyle}
                  value={info.detailAddress || "" }
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
                    value={info.startAt}
                    onChange={(e) => changeInformation(e)}
                    min={`${today}`}
                  />
                  <span className="mx-5">~</span>
                  <input
                    placeholder="종료일"
                    type="date"
                    name="endAt"
                    className={`${inputStyle} w-1/2`}
                    value={info.endAt}
                    onChange={(e) => changeInformation(e)}
                    min={`${today}`}
                  />
                </div>

                <label>홈페이지 링크</label>
                <input
                  name="homepageLink"
                  className={inputStyle}
                  value={info.homepageLink || "https://"}
                  onChange={(e) => changeInformation(e)}
                />

                <label>인스타그램 계정</label>
                <input
                  name="instagramLink"
                  className={inputStyle}
                  value={info.instagramLink || "@"}
                  onChange={(e) => changeInformation(e)}
                />

                <label>공지사항</label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 mb-10 h-[400px]">
                  <Markdown
                    content={info.notice}
                    contentChange={(e) => handleMarkDown("notice", e)}
                  />
                </div>

                <label>
                  이미지 <span className="text-red-500">*</span>
                  <span className="text-xs float-right">
                    {preview2.length}/{fileMax}
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
                    ref={fileInputRef}
                    id="detailImage"
                    className="hidden"
                    multiple
                    onChange={(e) => onImageArrUpload(Array.from(e.target.files))}
                    accept="image/*"
                  />
                  {renderImage()}
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full mt-10" />

          <div className="flex justify-between">
            <div className="">
              <div div className="border rounded-lg p-3 mt-10 hover:bg-popple hover:text-white" onClick={handleBackClick}>이전</div>
            </div>
            <div className="">
            <button
              type="submit"
              className="border rounded-lg p-3 mt-10 hover:bg-popple hover:text-white "
              onClick={updateExhibition}
            >
              수정
            </button>
          </div>
          </div>
          

        </div>
      </div>
    </>
  );
}
