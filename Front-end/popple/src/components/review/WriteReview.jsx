import { useState } from 'react';
import CustomSubmitButton from '../common/CustomSubmitButton';
import { LuFilePlus } from 'react-icons/lu';
import { reviewAPI } from '../../api/services/Review';

export default function WriteReviewModal({ isOpen, onClose }) {
  if (!isOpen) return null; // 모달이 닫혀있으면 렌더링하지 않음
  
  const [data, setData] = useState({
    content: "",
    exhibitionId: 1,
    image: "",
  });
  

  //리뷰 이미지 상태 관리
  const [preview, setPreview] = useState(null);
  
  const onUpload = (e) => {
      const file = e.target.files[0];
      console.log('Selected file:', file); // 파일 확인
      if (!file) return;

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log('File content:', reader.result); // 결과 확인
          setPreview(reader.result); // 파일의 컨텐츠를 preview에 저장
          setData((prevData) => ({
            ...prevData,
            image: file, // 파일 객체를 이미지 필드에 저장
          }));
      };
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    console.log(data);

    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('exhibitionId', data.exhibitionId);
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const res = await reviewAPI.writeReview(formData);
      console.log(res.status);
      
      if (res.status === 201) {
        alert("리뷰가 작성되었습니다.");
        onClose();
      }
    } catch (error) {
      alert("리뷰 작성 중 오류가 발생했습니다.");
      console.error("오류 발생:" + error);
    }
  };



  const inputStyle = "border border-[#ccc] rounded-[8px] focus:border-[#8900E1] focus:border-2 focus:outline-none px-2 w-full h-[80%] my-auto mt-7";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-5 w-[50%] h-[40%]">
        <h2 className="text-2xl mb-4 text-center">리뷰 작성</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-[1fr_3fr] gap-10 my-5 mx-5">
            {/* 사진 넣는 섹션 */}
            <div>
              <label htmlFor="poster" className="text-sm font-bold m-1">
                리뷰 사진
              </label>
              <label className="p-5 h-fit w-fit bg-white rounded-lg border flex flex-col justify-center items-center cursor-pointer">
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
            {/* 리뷰 작성 섹션 */}
            <textarea 
              className={inputStyle}
              style={{ resize: 'none' }} 
              value={data.content} // 상태 관리
              onChange={(e) => setData({ ...data, content: e.target.value })} // 텍스트 입력 관리
            />
          </div>
          <div className='flex justify-center'>
            <CustomSubmitButton 
              text={"취소"} 
              style={"w-[13%] h-auto text-xl mr-3"}
              onClick={onClose}
            />
            <CustomSubmitButton 
              text={"작성완료"} 
              style={"w-[13%] h-auto text-xl ml-3"}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
