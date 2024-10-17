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

          <div className="flex flex-col gap-5">
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
    </>
  );
}
