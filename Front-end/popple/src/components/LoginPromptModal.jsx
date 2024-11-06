
export default function LoginPromptModal({ isOpen, onClose, onConfirm }) {
// 로그인 안 한 사용자가 리뷰작성하려할때

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl  text-center font-bold mb-4">로그인이 필요합니다</h2>
        <h2 className="mb-6 text-center">로그인 페이지로 이동하시겠습니까?</h2>
        <div className="flex h-auto gap-4 justify-center">
          
          <button
            onClick={onClose}
            className="bg-[#8900E1] text-white px-4 py-2 rounded"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#8900E1] text-white px-4 py-2 rounded"
          >
            로그인 페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}