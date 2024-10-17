import company from "../assets/company.png"

export default function ExhibitionRegist() {
  return (
    <>
      <p className="text-lg mb-2">팝업/전시 등록</p>
      <hr className="w-full" />
      <div className="mt-2">기본 정보</div>
      <div className="container mx-auto w-5/6">
        <div className="grid grid-cols-2 gap-x-20 mt-10 h-full">
          <div className="flex flex-col gap-5">
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
              <label className="text-sm mt-10 ">
                부제<span className="text-red-500">*</span>
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="부제목을 입력해주세요"
              />
            </div>
            <div>
              <label className="text-sm mt-10">입장료</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="입장료를 입력해주세요"
              />
            </div>
            <div>
              <label className="text-sm mt-5">
                전시기간<span className="text-red-500">*</span>
              </label>
              <div className="">
                <input
                  type="date"
                  className="bg-gray-50 border rounded-lg inline w-1/3 p-2.5"
                />
                <span>~</span>
                <input
                  type="date"
                  className="bg-gray-50 border rounded-lg inline w-1/3 p-2.5"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <label className="text-sm">
                장소<span className="text-red-500">*</span>
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="도로명주소"
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
      <div className="container mx-auto w-5/6 mt-10">
        관람시간 정보<span className="text-red-500">*</span>
      <div className="mt-5 flex justify-between">
        <button><img src={company} alt="일요일"></img></button>
        <img src={company} alt="월요일"></img>
        <img src={company} alt="화요일"></img>
        <img src={company} alt="수요일"></img>
        <img src={company} alt="목요일"></img>
        <img src={company} alt="금요일"></img>
        <img src={company} alt="토요일"></img>
      </div>
      </div>
      <div className="mt-5 w-5/6 container mx-auto">
        <div className="border w-80 h-36 rounded-lg flex-col">
          <div className="flex w-full justify-between p-3">
            <div className="text-sm">default</div>
            <div className="text-xs">
              <input type="checkbox"/>
              <span>휴무지정</span>
            </div>
          </div>
          <div className="flex justify-between p-3 ">
              <label className="block text-xs text-center" htmlFor="open">오픈</label>
              <input type="time" id="open" className="w-24 border rounded-lg"/>
              <label className="block text-xs text-center" htmlFor="close">마감</label>
              <input type="time" id="close" className="w-24 rounded-lg border"/>
          </div>
          <div className="flex m-2 justify-end">
            <button type="submit" className="border text-sm p-1 rounded-lg hover:bg-popple hover:text-white">완료</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto w-5/6 mt-10">
        제약사항<span className="text-red-500">*</span>
      </div>
      <div className="container mx-auto w-5/6">
        <hr className="w-full mt-10"/>
        <div className="flex justify-end items-center">
          <button type="submit" className="border rounded-lg p-3 mt-10" >
            다음
          </button>
        </div>
      </div>
      
    </>
  );
}
