import { useState } from "react";
import { helpAPI } from "../api/services/Help";
import { useNavigate } from "react-router-dom";

export default function HelpCreate() {
  const navigate = useNavigate();
  const textStyle = "text-[28px] ml-3 font-bold mt-5";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateClick = async () => {
    if (!title || !description) {
      setError("제목과 내용을 입력해 주세요.");
      return;
    }

    const userId = localStorage.getItem("userId");

    try {
      await helpAPI.createHelp({ title, description, userId });
      navigate("/help");
    } catch (err) {
      setError("문의 생성 오류 발생");
    }
  };

  return (
    <div>
      <h1 className={textStyle}>문의하기</h1>
      <hr className="mt-2 mb-0 border-gray-500" />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex my-10 pb-10 border-b border-gray-200 w-full justify-center">
        <label
          htmlFor="title"
          className="block text-[18px] mr-10 mt-3 font-medium text-gray-900 dark:text-white"
        >
          제목
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" w-[80%] h-[50px] border border-[#ccc] rounded-[8px] 
                                focus:border-[#8900E1] focus:border-2 focus:outline-none px-2"
          placeholder="제목을 입력하세요."
        />
      </div>
      <div className="flex my-10 pb-6 border-b border-gray-500 w-full justify-center">
        <label
          htmlFor="description"
          className="block text-[18px] mr-10 mt-3font-medium text-gray-900 dark:text-white"
        >
          내용
          <span className="text-red-500">*</span>
        </label>
				<textarea
					id="description"
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-[80%] h-[300px] border border-[#ccc] rounded-[8px] 
																	focus:border-[#8900E1] focus:border-2 focus:outline-none px-2 py-3 mb-4"
					placeholder="내용을 입력하세요."
				/>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleCreateClick}
          className="text-white px-4 py-2 bg-[#8900E1] rounded-lg p-3 mt-5"
        >
          문의 접수
        </button>
      </div>
    </div>
  );
}
