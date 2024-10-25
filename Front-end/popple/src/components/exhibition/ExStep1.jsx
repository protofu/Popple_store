import { useEffect, useState } from "react";
import { FaDog, FaUserSlash, FaUser, FaArrowDown19, FaArrowUp19 } from "react-icons/fa6";
import { MdFastfood, MdNoFood } from "react-icons/md";
import { CiWifiOn, CiWifiOff } from "react-icons/ci";
import {
    LuFilePlus,
    LuParkingCircle,
    LuParkingCircleOff,
    LuCamera,
    LuCameraOff,
  } from "react-icons/lu";
import Markdown from "../common/Markdown";
import PostCode from "../common/PostCode";
import FileCarousel from "./FileCarousel";

const ExStep1 = ({information, changeInformation}) => {
    // input 태그 스타일 지정
    const inputStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg inline-block p-2.5 mb-10";

    // 주소 검색 결과 state
    const [address, setAddress] = useState({});

    useEffect(() => {
        console.log(address);
        // 주소 선택 시 정보 변경
        if (address.roadAddress) {
            changeInformation({
                target: {
                    name: "address",
                    value: address.roadAddress
                }
            });
        }
    }, [address]);

    // 마크다운 입력 핸들러
    const handleMarkDown = (name, value) => {
        changeInformation({
            target: {
                name, value
            }
        });
    }

    // 상세설명 포스터 업로드
    const [posterPreview, setPosterPreview] = useState(null);

    const onPosterUpload = (e) => {
        const file = e.target.files[0];
        console.log('Selected file:', file); // 파일 확인
        if (!file) return;
  
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPosterPreview(reader.result); // 파일의 컨텐츠를 preview에 저장
        };
        changeInformation({
            target: {
                name: "poster",
                value: file
            }
        });
    };

    // 이미지 다중 업로드 관련 상태
    const [imagePreviewArr, setImagePreviewArr] = useState([]); // 이미지 미리보기 배열
    const [uploadPossible, setUploadPossible] = useState(true); // 업로드 가능 여부
    const [isActive, setIsActive] = useState(false); // 파일 드래그앤드랍 상태
    const fileMax = 10; // 최대 업로드 가능 파일 수

    // 드래그앤드랍 이벤트 핸들러
    const handleDragStart = () => setIsActive(true)
    const handleDragEnd = () => setIsActive(false)
    const handleDrop = (e) => {
        e.preventDefault();
        setIsActive(false);
        const files = Array.from(e.dataTransfer.files);
        console.log("올라갈 파일:", files)
        onImageArrUpload(files);
    };
    const handleDragOver = (e) => {
        if (!uploadPossible) return false;
        e.preventDefault();
        setIsActive(true);
    };  

    // 파일 업로드 함수
    const onImageArrUpload = (files) => {
        // 파일이 fileMax보다 많으면 이상이면 업로드 안함
        if (imagePreviewArr.length >= fileMax) {
            console.log(`파일은 최대 ${fileMax}개까지 업로드 가능합니다.`);
            setUploadPossible(false);
            return;
        }

        // 새로운 파일을 추가할 수 있는 개수를 계산
        const remainingSlots = fileMax - imagePreviewArr.length;
        const validFiles = files.slice(0, remainingSlots);

        // FileReader를 사용해 미리보기 이미지 생성
        const previewPromises = validFiles.map((f) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(f);
                reader.onload = () => resolve(reader.result);
            });
        });

        // 미리보기 이미지 추가
        Promise.all(previewPromises).then((newPreviews) => {
            setImagePreviewArr((prevPreviews) => {
                return [...prevPreviews, ...newPreviews];
            });
        });

        // 이미지 파일 자체를 상태에 저장
        changeInformation({
            target: {
                name: "image",
                value: validFiles
            }
        });
    };

    // 이미지 삭제
    const deleteImg = (index) => {
        setImagePreviewArr((prevPreviews) => {
            const newPreviews = [...prevPreviews];
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    }

    // 컴포넌트 마운트 시 포스터, 이미지 초기화
    useEffect(() => {
        if (information.poster) {
            const file = information.poster;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPosterPreview(reader.result); // 파일의 컨텐츠를 preview에 저장
            };
        }
        if(information.image.length > 0) {
            const previewPromises = information.image.map((f) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(f);
                    reader.onload = () => resolve(reader.result);
                }
            )});
            Promise.all(previewPromises).then((newPreviews) => {
                setImagePreviewArr(newPreviews);
            }
        )};
    }, []);

    // 요일 선택 state
    const [week, setWeek] = useState("monday");

    const daysOfWeek = [
        { name: "monday" },
        { name: "tuesday" },
        { name: "wednesday" },
        { name: "thursday" },
        { name: "friday" },
        { name: "saturday" },
        { name: "sunday" }
    ];

    return (
        <>
        <div className="grid grid-cols-2 gap-x-10 w-full h-full">
            <div className="flex flex-col justify-between">
                <label>팝업 전시명</label>
                <input name="exhibitionName" className={inputStyle} value={information.exhibitionName} onChange={(e) => changeInformation(e)}/>
                
                <label>부제</label>
                <input name="subTitle" className={inputStyle} value={information.subTitle} onChange={(e) => changeInformation(e)}/>
                
                <label>
                    입장료
                    <span className="float-right">
                        <input type="checkbox" name="free" onChange={(e) => changeInformation(e)} checked={information.free} />
                        <label>무료</label>
                    </span>
                </label>
                <input name="fee" className={inputStyle} value={information.free ? 0 : information.fee} onChange={(e) => changeInformation(e)} disabled={information.free} />

                <label>팝업 전시 기간</label>
                <div className="flex justify-between">
                    <input type="date" name="startAt" className={`${inputStyle} w-1/2`} value={information.startAt} onChange={(e) => changeInformation(e)}/>
                    <span className="mx-5">~</span>
                    <input type="date" name="endAt" className={`${inputStyle} w-1/2`} value={information.endAt} onChange={(e) => changeInformation(e)}/>
                </div>

                <label>상세 설명</label>
                <div className={inputStyle}>
                    <Markdown content={information.detailDescription} contentChange={(e) => handleMarkDown("detailDescription", e)} />
                </div>

                <label>상세설명 포스터</label>
                <label className={`${inputStyle} py-5 flex justify-center cursor-pointer h-48`}>
                    <input
                        className="hidden"
                        name="poster"
                        type="file"
                        onChange={onPosterUpload}
                        accept="image/*"
                    />
                    {posterPreview ? (
                        <img className="w-5/6 h-5/6" src={posterPreview} alt="포스터" />
                    ) : (
                        <LuFilePlus className="text-xl sm:text-4xl md:text-5xl lg:text-9xl inline-block" />
                    )}
                </label>
            </div>
            
            <div className="flex flex-col justify-between">
                <label>장소</label>
                <div className="flex">
                    <input name="address" className={`${inputStyle} w-full !mb-0`} value={information.address} readOnly />
                    <PostCode
                        className="border p-2 rounded-lg inline-block w-1/6 ml-2"
                        value="검색"
                        setAddress={setAddress}
                    />
                </div>
                <input name="detailAddr" className={inputStyle} value={information.detailAddr} onChange={(e) => changeInformation(e)}/>

                <label>홈페이지 링크</label>
                <input name="homepageLink" className={inputStyle} value={information.homepageLink} onChange={(e) => changeInformation(e)}/>
                
                <label>인스타그램 링크</label>
                <input name="instagramLink" className={inputStyle} value={information.instagramLink} onChange={(e) => changeInformation(e)}/>
                
                <label>공지사항</label>
                <div className={inputStyle}>
                    <Markdown content={information.notice} contentChange={(e) => handleMarkDown("notice", e)} />
                </div>

                <label>
                    이미지
                    <span className="text-xs float-right">
                        {imagePreviewArr.length}/{fileMax}
                    </span>
                </label>

                <div
                    className={`${inputStyle} preview ${isActive ? "active" : " "} flex justify-center cursor-pointer h-48`}
                    onDragEnter={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragEnd}
                >
                    <input type="file" id="detailImage" className="hidden" multiple onChange={onImageArrUpload} accept="image/*" />
                        {imagePreviewArr.length > 0 ? (
                            <FileCarousel preview2={imagePreviewArr} deleteImg={deleteImg} />
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
            <div className={`col-span-2`}>
                <label>관람시간 정보</label>
                <div className={`${inputStyle} flex justify-between`}>
                    {daysOfWeek.map((day) => (
                        <div key={day.name} className={`border-2 border-popple-light ${week === day.name ? "border-opacity-50" : "border-opacity-20"} rounded-lg`}>
                            <img
                                src={`/week/${day.name}.png`}
                                alt={`${day.name}.png`}
                                className="w-20 hover:cursor-pointer"
                                onClick={() => setWeek(day.name)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 관람시간 지정 인풋 */}
            <div className={`${inputStyle} my-auto p-5 gap-5 flex flex-col justify-around`}>
                <div className="flex justify-between">
                    <span className={`${week === 'sunday' ? 'text-red-400' : week === 'saturday' ? 'text-blue-400' : 'text-black'}`}>{week.toUpperCase()}</span>
                    <div>
                        <input name={`openTime.${week}.holiday`} type="checkbox" className='ml-10' onChange={(e) => changeInformation(e)} checked={information.openTime[week].holiday}/>
                        <label>휴무지정</label>
                    </div>
                </div>
                <div className="flex justify-evenly">
                    <label>오픈</label>
                    <input type="time" name={`openTime.${week}.open`} className={`${inputStyle}`} value={information.openTime[week].open} onChange={(e) => changeInformation(e)} disabled={information.openTime[week].holiday} />
                    <label>마감</label>
                    <input type="time" name={`openTime.${week}.close`} className={`${inputStyle}`} value={information.openTime[week].close} onChange={(e) => changeInformation(e)} disabled={information.openTime[week].holiday} />
                </div>
            </div>

            {/* 관람시간 확인 테이블 */}
            <div>
                <table className="w-full text-center text-xs text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col">
                                요일
                            </th>
                            <th scope="col">
                                시작 시간
                            </th>
                            <th scope="col">
                                종료 시간
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(information.openTime).map((key) => {
                            return (
                                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <span className={`${key === 'sunday' ? 'text-red-400' : key === 'saturday' ? 'text-blue-400' : 'text-black'}`}>{key.toUpperCase()}</span>
                                    </th>
                                    {
                                        information.openTime[key].holiday ? 
                                        <td colSpan={2} className="bg-red-200">
                                            휴무
                                        </td>
                                        :
                                        <>
                                        <td>
                                            {information.openTime[key].startAt}
                                        </td>
                                        <td>
                                            {information.openTime[key].endAt}
                                        </td>
                                        </>
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="cursor-pointer grid grid-cols-4 gap-7 mt-10">
                {Object.keys(information.constraints).map((key, idx) => {
                    return (
                        <ToggleConstraint key={key} name={key} constraints={information.constraints} changeInformation={changeInformation} />
                    );
                })}
            </div>
        </div>
        </>
    );
}

const ToggleConstraint = ({name, constraints, changeInformation}) => {
    const handleToggle = () => {
        changeInformation({
            target: {
                name: `constraints.${name}`,
                value: !constraints[name]
            }
        });
    };
    const isOkay = constraints[name];
    const textStyle = isOkay ? "text-popple" : "text-gray-500";
    const renderIcon = () => {
        switch (name) {
            case "park":
                return {
                    icon: isOkay ? <LuParkingCircle /> : <LuParkingCircleOff />,
                    text: isOkay ? "주차 가능" : "주차 불가"
                }
            case "camera":
                return {
                    icon: isOkay ? <LuCamera /> : <LuCameraOff />,
                    text: isOkay ? "촬영 가능" : "촬영 불가"
                }
            case "wifi":
                return {
                    icon: isOkay ? <CiWifiOn /> : <CiWifiOff />,
                    text: isOkay ? "와이파이 가능" : "와이파이 불가"
                }
            case "pet":
                return {
                    icon: isOkay ? <FaDog /> : <FaUserSlash />,
                    text: isOkay ? "반려동물 출입 가능" : "반려동물 출입 불가"
                }
            case "kids":
                return {
                    icon: isOkay ? <FaUser /> : <FaUserSlash />,
                    text: isOkay ? "어린이 출입 가능" : "노키즈존"
                }
            case "grade":
                return {
                    icon: isOkay ? <FaArrowDown19 /> : <FaArrowUp19 />,
                    text: isOkay ? "전 연령 관람 가능" : "청소년 관람 불가"
                }
            case "food":
                return {
                    icon: isOkay ? <MdFastfood /> : <MdNoFood />,
                    text: isOkay ? "음식물 반입 가능" : "음식물 반입 금지"
                }
        }
    }
    return (
        <div className="flex flex-col items-center" onClick={handleToggle}>
            <div className={`${textStyle} text-4xl`}>{renderIcon().icon}</div>
            <span className={`${textStyle} text-xs`}>{renderIcon().text}</span>
        </div>
    );
}
export default ExStep1;